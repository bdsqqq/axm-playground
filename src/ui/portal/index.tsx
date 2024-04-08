import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { cn, newId } from '../util';
import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';

type InPortal = {
  id: string;
  name: string;
  intendedOut: string;
};
type OutPortal = {
  id: string;
  name: string;
  element: HTMLElement | null;
};
interface ApertureState {
  inPortals: ReadonlyArray<InPortal>;
  outPortals: ReadonlyArray<OutPortal>;

  addInPortal: (portal: InPortal) => void;
  removeInPortal: (id: string) => void;

  addOutPortal: (portal: OutPortal) => void;
  removeOutPortal: (id: string) => void;
}
const ApertureStore = createStore<ApertureState>((set) => ({
  inPortals: [],
  outPortals: [],

  addInPortal: (portal) =>
    set((state) => ({ inPortals: [...state.inPortals, portal] })),
  removeInPortal: (id) =>
    set((state) => ({ inPortals: state.inPortals.filter((p) => p.id !== id) })),

  addOutPortal: (portal) =>
    set((state) => ({ outPortals: [...state.outPortals, portal] })),
  removeOutPortal: (id) =>
    set((state) => ({
      outPortals: state.outPortals.filter((p) => p.id !== id),
    })),
}));

const useRegisterInPortal = ({
  name,
  intendedOut,
}: {
  name: string;
  intendedOut: string;
}) => {
  const { addInPortal, removeInPortal } = useStore(ApertureStore);
  const id = React.useMemo(() => newId('portal'), []);
  const portal = useMemo(
    () => ({ id, name, intendedOut }),
    [id, name, intendedOut]
  );

  React.useEffect(() => {
    addInPortal(portal);

    return () => {
      removeInPortal(portal.id);
    };
  }, [portal, addInPortal, removeInPortal]);
};

export const useRegisterOutPortal = ({
  name,
  element,
}: {
  name: string;
  element: HTMLElement | null;
}) => {
  const { addOutPortal, removeOutPortal } = useStore(ApertureStore);
  const id = React.useMemo(() => newId('portal'), []);
  const portal = useMemo(() => ({ id, name, element }), [id, name, element]);

  React.useEffect(() => {
    addOutPortal(portal);

    return () => {
      removeOutPortal(portal.id);
    };
  }, [portal, addOutPortal, removeOutPortal]);
};

/**
 * Keeps track of the name and type of rendered portals.
 */
export function Aperture() {
  const { inPortals, outPortals } = useStore(ApertureStore);

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <div>
        <h2>Portals</h2>
        <div className="flex gap-2">
          <div>
            <h3>out</h3>
            <ul>
              {outPortals.map((p) => {
                const linked = inPortals.find((i) => i.intendedOut === p.name);

                return (
                  <li
                    className={cn(linked ? 'text-[green]' : 'text-[orange]')}
                    key={p.id}
                  >
                    {p.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3>in</h3>
            <ul>
              {inPortals.map((p) => {
                const linked = outPortals.find((o) => o.name === p.intendedOut);

                return (
                  <li
                    className={cn(linked ? 'text-[green]' : 'text-[orange]')}
                    key={p.id}
                  >
                    {p.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Children passed to this component will be behave as if they were mounted here (they are),
 * but will be rendered as children of the matching `OutPortal` in the DOM.
 */
export function InPortal({
  children,
  name,
  outPortalName,
}: {
  children: React.ReactNode;
  name: string;
  outPortalName: string;
}) {
  useRegisterInPortal({ name, intendedOut: outPortalName });
  const { outPortals } = useStore(ApertureStore);
  const [outPortalNode, setOutPortalNode] = React.useState<HTMLElement | null>(
    null
  );

  const tryToFindOutPortal = React.useCallback(() => {
    const element =
      outPortals.find((p) => p.name === outPortalName)?.element || null;

    setOutPortalNode(element);
  }, [outPortalName, outPortals]);

  React.useLayoutEffect(() => {
    tryToFindOutPortal();
  }, [tryToFindOutPortal]);

  return <>{outPortalNode ? createPortal(children, outPortalNode) : null}</>;
}

interface OutPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}
/**
 * Renders a DOM node that can be targeted by an `InPortal`.
 */
export function OutPortal({ name, className, ...rest }: OutPortalProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const debugStyles = 'border border-dashed border-[--orange]';

  useRegisterOutPortal({ name, element: ref.current });

  return (
    <div
      ref={ref}
      className={cn(debugStyles, className)}
      id={`id-${name}`}
      {...rest}
    />
  );
}

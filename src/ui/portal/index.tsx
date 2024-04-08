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

const useRegisterOutPortal = ({ name }: { name: string }) => {
  const { addOutPortal, removeOutPortal } = useStore(ApertureStore);
  const id = React.useMemo(() => newId('portal'), []);
  const portal = useMemo(() => ({ id, name }), [id, name]);

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

  const [outPortalNode, setOutPortalNode] = React.useState<HTMLElement | null>(
    null
  );

  const attempts = React.useRef(0);
  const totalAtempts = 5;

  const tryToFindOutPortal = React.useCallback(() => {
    const element = document.getElementById(outPortalName);
    setOutPortalNode(element);
    if (element)
      return () => {
        attempts.current = 0;
        clearTimeout(timeout);
      };

    if (attempts.current >= totalAtempts) return;

    attempts.current += 1;
    const timeout = setTimeout(() => {
      tryToFindOutPortal();
    }, 100 * attempts.current);
    console.log(
      `could not find outPortal with name ${outPortalName}, attempt: ${attempts.current}`
    );
    if (attempts.current === totalAtempts)
      console.error(`outPortal ${outPortalName} not found`);

    return () => {
      attempts.current = 0;
      clearTimeout(timeout);
    };
  }, [outPortalName]);

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
  useRegisterOutPortal({ name });
  const debugStyles = 'border border-dashed border-[--orange]';

  return <div className={cn(debugStyles, className)} id={name} {...rest} />;
}

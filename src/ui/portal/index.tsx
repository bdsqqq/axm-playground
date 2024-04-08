import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { cn, newId } from '../util';
import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';

type Portal = {
  id: string;
  name: string;
  type: 'in' | 'out';
  intendedOut?: string | undefined;
};
interface ApertureState {
  portals: ReadonlyArray<Portal>;

  addPortal: (portal: Portal) => void;
  removePortal: (id: string) => void;
}
const ApertureStore = createStore<ApertureState>((set) => ({
  portals: [],

  addPortal: (portal: Portal) =>
    set((state) => ({
      portals: [...state.portals, { ...portal }],
    })),

  removePortal: (id) =>
    set((state) => ({
      portals: state.portals.filter((p) => p.id !== id),
    })),
}));

const useRegisterPortal = ({
  name,
  type,
  intendedOut,
}: {
  name: string;
  type: 'in' | 'out';
  intendedOut?: string;
}) => {
  const { addPortal, removePortal } = useStore(ApertureStore);
  const id = React.useMemo(() => newId('portal'), []);
  const portal = useMemo(
    () => ({ id, name, type, intendedOut }),
    [id, name, type, intendedOut]
  );

  React.useEffect(() => {
    addPortal(portal);

    return () => {
      removePortal(portal.id);
    };
  }, [portal, addPortal, removePortal]);
};

/**
 * Keeps track of the name and type of rendered portals.
 */
export function Aperture() {
  const { portals } = useStore(ApertureStore);

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <div>
        <h2>Portals</h2>
        <div className="flex gap-2">
          <div>
            <h3>out</h3>
            <ul>
              {portals
                .filter((p) => p.type === 'out')
                .map((p) => {
                  const linked = portals.find((i) => i.intendedOut === p.name);

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
              {portals
                .filter((p) => p.type === 'in')
                .map((p) => {
                  const linked = portals.find((o) => o.name === p.intendedOut);

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
 * but will be rendered as children of the DOM node of the `OutPortal` that matches the `outPortalName`.
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
  useRegisterPortal({
    name,
    type: 'in',
    intendedOut: outPortalName,
  });

  const [outPortalNode, setOutPortalNode] = React.useState<HTMLElement | null>(
    null
  );

  const attempts = React.useRef(0);
  const totalAtempts = 5;

  const tryToFindOutPortal = React.useCallback(() => {
    const element = document.getElementById(outPortalName);
    if (element) {
      setOutPortalNode(element);
      return;
    }
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
  useRegisterPortal({ name, type: 'out' });
  const debugStyles = 'border border-dashed border-[--orange]';

  return <div className={cn(debugStyles, className)} id={name} {...rest} />;
}

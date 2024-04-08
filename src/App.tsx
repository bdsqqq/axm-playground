import React, { useMemo } from 'react';
import { ButtonShowcase, LatencyShowcase } from './ui/button/showcase';
import { Dialoguer } from './ui/dialog/Dialog';
import { Button, ButtonGroup } from './ui/button/button';
import { createPortal } from 'react-dom';
import { cn, newId } from './ui/util';
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';

function FarAwaySlots_PretendNavBar() {
  const gap = 'gap-4';

  return (
    <nav
      className={cn(
        'flex w-full justify-between   border border-gray-05 bg-gray-02 p-2',
        gap
      )}
    >
      <div className={cn('flex', gap)}>
        <Button size="sm" variant={'tertiary'}>
          Datasets
        </Button>
        <Button size="sm" variant={'tertiary'}>
          Query
        </Button>
      </div>
      <div className={cn('flex', gap)}>
        <OutPortal
          className={cn(
            'min-w-8 border border-dashed border-[--orange]',
            'flex',
            gap
          )}
          name="out-nav"
        >
          <Button size="sm" variant={'secondary'}>
            action from nav
          </Button>
        </OutPortal>
      </div>
    </nav>
  );
}

function FarAwaySlots_PretendMain() {
  const [tab, setTab] = React.useState(0);

  const tabsAmmount = 3;

  return (
    <>
      <InPortal name={`action-from-main`} outPortalName="out-nav">
        <Button size="sm" variant={'secondary'}>
          action from main
        </Button>
      </InPortal>
      <div className="flex flex-col bg-gray-02">
        <ButtonGroup>
          {Array.from({ length: tabsAmmount }).map((_, i) => (
            <Button
              size="sm"
              key={i}
              variant={'tertiary'}
              onClick={() => {
                setTab(i);
              }}
            >
              Tab {i + 1}
            </Button>
          ))}
        </ButtonGroup>

        {tab === 0 ? <FarAwaySlots_PretendTab id="1" /> : null}
        {tab === 1 ? <FarAwaySlots_PretendTab id="2" /> : null}
        {tab === 2 ? <FarAwaySlots_PretendTab id="3" /> : null}
      </div>
    </>
  );
}

function FarAwaySlots_PretendTab({ id }: { id: string }) {
  const [subTab, setSubTab] = React.useState(0);

  const subTabsAmmount = 3;

  return (
    <>
      <InPortal name={`tab-${id}`} outPortalName="out-nav">
        <Button
          size="sm"
          variant={'secondary'}
        >{`action from tab ${id}`}</Button>
      </InPortal>
      <div className="bg-gray-03">
        <ButtonGroup>
          {Array.from({ length: subTabsAmmount }).map((_, i) => (
            <Button
              size="sm"
              key={i}
              variant={'tertiary'}
              onClick={() => {
                setSubTab(i);
              }}
            >
              SubTab {i + 1}
            </Button>
          ))}
        </ButtonGroup>
        <div className="flex flex-col p-2">
          <span>tab: {id}</span>

          {subTab === 0 ? <FarAwaySlots_PretendSubTab id="1" /> : null}
          {subTab === 1 ? <FarAwaySlots_PretendSubTab id="2" /> : null}
          {subTab === 2 ? <FarAwaySlots_PretendSubTab id="3" /> : null}
        </div>
      </div>
    </>
  );
}

function InPortal({
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
function OutPortal({ name, className, ...rest }: OutPortalProps) {
  useRegisterPortal({ name, type: 'out' });
  const debugStyles = 'border border-dashed border-[--orange]';

  return <div className={cn(debugStyles, className)} id={name} {...rest} />;
}

function FarAwaySlots_PretendSubTab({ id }: { id: string }) {
  return (
    <>
      <InPortal name={`subtab-${id}`} outPortalName="out-nav">
        <Button
          size="sm"
          variant={'secondary'}
        >{`action from subtab ${id}`}</Button>
      </InPortal>

      <div className="">
        <span>subtab: {id}</span>
      </div>
    </>
  );
}

const PortalShowcase_FarAwaySlots = () => {
  return (
    <div
      className="w-full"
      style={
        { '--orange': '#ff9a00', '--blue': '#27a7d8' } as React.CSSProperties
      }
    >
      <FarAwaySlots_PretendNavBar />
      <FarAwaySlots_PretendMain />
    </div>
  );
};

function PortalShowcase_Multiplexer_content() {
  const [count, setCount] = React.useState(0);
  const increment = React.useCallback(() => setCount((c) => c + 1), []);

  const [portalDestination, setPortalDestination] =
    React.useState('intentionallyEmpty');

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={increment}>+1</Button>
        {
          <Button
            variant={'secondary'}
            onClick={() => setPortalDestination('out-1')}
          >
            Move to #1
          </Button>
        }
        {
          <Button
            variant={'secondary'}
            onClick={() => setPortalDestination('out-2')}
          >
            Move to #2
          </Button>
        }
      </div>
      <div className="border border-dashed border-[--blue] p-2">
        <span className="leading-none">in-a: {count}</span>
        <InPortal
          name={`multiplexer-content`}
          outPortalName={portalDestination}
        >
          <div>out-a: {count}</div>
        </InPortal>
      </div>
    </>
  );
}

function PortalShowcase_MultiPlexer_out() {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      <OutPortal name="out-1" className="grid h-24 place-items-center" />
      <OutPortal name="out-2" className="grid h-24 place-items-center" />
    </div>
  );
}

function PortalShowcase_Multiplexer() {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-4"
      style={
        { '--orange': '#ff9a00', '--blue': '#27a7d8' } as React.CSSProperties
      }
    >
      <PortalShowcase_Multiplexer_content />
      <PortalShowcase_MultiPlexer_out />
    </div>
  );
}

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
function Aperture() {
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

function App() {
  return (
    <div className="grid min-h-screen place-items-center gap-8 p-12">
      <PortalShowcase_Multiplexer />
      <hr className="w-full border-gray-06" />
      <PortalShowcase_FarAwaySlots />
      <hr className="w-full border-gray-06" />
      <LatencyShowcase />
      <hr className="w-full border-gray-06" />
      <ButtonShowcase />
      <Dialoguer />
      <Aperture />
    </div>
  );
}

export default App;

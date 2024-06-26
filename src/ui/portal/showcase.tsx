import React from 'react';
import { InPortal, OutPortal, useRegisterOutPortal } from '.';
import { Button, ButtonGroup } from '../button/button';
import { cn } from '../util';

const PRETEND_NAVBAR_PORTAL_NAME = 'out-nav';
const InPortalPretendNavbar = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <InPortal
      name={name}
      outPortalName={PRETEND_NAVBAR_PORTAL_NAME}
      children={children}
    />
  );
};

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
          name={PRETEND_NAVBAR_PORTAL_NAME}
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
      <InPortalPretendNavbar name={`action-from-main`}>
        <Button size="sm" variant={'secondary'}>
          action from main
        </Button>
      </InPortalPretendNavbar>
      <div className="flex flex-col bg-gray-02">
        <ButtonGroup>
          {Array.from({ length: tabsAmmount }).map((_, i) => (
            <Button
              size="sm"
              key={`tab-${i}`}
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
      <InPortalPretendNavbar name={`tab-${id}`}>
        <Button
          size="sm"
          variant={'secondary'}
        >{`action from tab ${id}`}</Button>
      </InPortalPretendNavbar>
      <div className="bg-gray-03">
        <ButtonGroup>
          {Array.from({ length: subTabsAmmount }).map((_, i) => (
            <Button
              size="sm"
              key={`subtab-${i}`}
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

function FarAwaySlots_PretendSubTab({ id }: { id: string }) {
  return (
    <>
      <InPortalPretendNavbar name={`subtab-${id}`}>
        <Button
          size="sm"
          variant={'secondary'}
        >{`action from subtab ${id}`}</Button>
      </InPortalPretendNavbar>

      <div className="">
        <span>subtab: {id}</span>
      </div>
    </>
  );
}

export const PortalShowcase_FarAwaySlots = () => {
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
        <Button
          variant={'secondary'}
          onClick={() => setPortalDestination('out-1')}
        >
          Move to #1
        </Button>
        <Button
          variant={'secondary'}
          onClick={() => setPortalDestination('out-2')}
        >
          Move to #2
        </Button>
        <Button
          variant={'secondary'}
          onClick={() => setPortalDestination('intentionallyEmpty')}
        >
          Move to nowhere
        </Button>

        <div className="grid place-items-center border border-dashed border-[--blue] px-2 py-1">
          <span className="leading-none">in-a: {count}</span>
          <InPortal
            name={`multiplexer-content`}
            outPortalName={portalDestination}
          >
            <div>out-a: {count}</div>
          </InPortal>
        </div>
      </div>
    </>
  );
}

function PortalShowcase_MultiPlexer_out() {
  const outputRef = React.useRef<HTMLFormElement>(null);
  useRegisterOutPortal({ name: 'out-1', element: outputRef.current });

  return (
    <div className="grid w-full grid-cols-2 gap-2">
      <form
        ref={outputRef}
        className="grid h-24 place-items-center border border-dashed border-[red]"
      />
      <OutPortal name="out-2" className="grid h-24 place-items-center" />
    </div>
  );
}

export function PortalShowcase_Multiplexer() {
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

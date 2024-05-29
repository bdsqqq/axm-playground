import { PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const TARGET_WINDOWS = ['incrementer'] as const;
type TargetWindow = (typeof TARGET_WINDOWS)[number];

export const NewWindow = ({
  children,
  target,
}: PropsWithChildren<{ target?: TargetWindow }>) => {
  const containerRef = useRef<HTMLDivElement>(document.createElement('div'));
  // btw igor, you can use this ref to get all sorts of info about the window.
  // like its size, its position, etc. So the main window can use it for logic.
  const windowRef = useRef<Window | null>(null);

  useEffect(() => {
    windowRef.current = window.open(
      '',
      '_blank', // target is optional, if you try to open a window with the same target, it will override the previous one.
      'popup=1,width=800,height=600,left=400,top=400'
    );

    windowRef.current?.document.body.appendChild(containerRef.current);

    return () => {
      windowRef.current?.close();
    };
  }, [target]);

  return createPortal(children, containerRef.current);
};

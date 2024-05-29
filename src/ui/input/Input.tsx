import React, { ComponentPropsWithoutRef } from 'react';
import { cn } from '../util';
import { composeRefs } from '@radix-ui/react-compose-refs';

export const Input = React.forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'>
>(({ className, ...passthrough }, ref) => {
  const input = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState('');
  const [hasStuffOutsideVisibleArea, setHasStuffOutsideVisibleArea] =
    React.useState(false);
  const [isScrollWindowAtStart, setIsScrollWindowAtStart] =
    React.useState(false);

  const showOverlay = hasStuffOutsideVisibleArea && !isScrollWindowAtStart;

  return (
    <div className="relative">
      <input
        className={cn(
          'rounded border border-gray-06 bg-gray-01 px-1.5 py-1',
          className
        )}
        value={value}
        onChange={(e) => {
          React.startTransition(() => {
            setValue(e.target.value);
          });

          setHasStuffOutsideVisibleArea(
            e.target.scrollWidth > e.target.clientWidth
          );
        }}
        onScroll={(e) => {
          console.log('scroll left', e.currentTarget.scrollLeft);
          React.startTransition(() => {
            setIsScrollWindowAtStart(e.currentTarget.scrollLeft === 0);
          });
        }}
        {...passthrough}
        ref={composeRefs(ref, input)}
      />
      <div
        className={cn(
          'absolute bottom-0 right-0 top-0 w-12 rounded-[inherit] bg-gradient-to-r from-transparent to-gray-01 opacity-0',
          showOverlay && 'opacity-100'
        )}
      />
    </div>
  );
});

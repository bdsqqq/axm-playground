import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import * as Toggle from '@radix-ui/react-toggle';
import { type ToggleProps, PrimitiveButtonProps } from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { UnionToIntersection } from 'ts-essentials';

import { Link, LinkProps } from 'react-router-dom';

import { cn } from '../util';
import { Spinner } from '../icons';

// IGOR, You were adapting your code to use https://www.typescriptlang.org/play?target=99&jsx=4&pretty=true#code/JYWwDg9gTgLgBAbzgYwB5wL5wGZQiOAImQBsBDAZwoFoA3MqYMgO2QFNqyBXGAC2mAwAnoQDcAKFCRYicXBzQA7gwAmAJTbYANHLgBhclQCCMGIwBGPNhR3yjrflAASAFQCyAGRNnglmNds4ACEeGAhmV09vCysbXQ0yZBgAOQgVNkCAMSVVNnVNHSxcfCIoNkSYMUlwaHgkAFVmYHCXCABJZn8oCjYk5uZMHDwCQhgaax7OphIKKvE2VGl4ZHCKeGwcqBVG-o1sOABeBShlLb24SjguZgBrZghFAcuAHgAFAD4ACl0VmuY2ToALjg33k8gA9OC4Hw2HAAAZlbBwuCKYAkEhwcywkDAKjAZgAcyGJV4bDKWkxPGOp3y+xUuIoZDA5W6cHxOB4XDKcDKFV0EKhFAgcF4LBUJHxRMEcAA+mRsF0ZdDSXAKGBeSo2RQOTAuRx1RAINh+XADWAKMDXoEBcrcaaGPA7bz0UI4AArLhrY7K2H4rrMMgYqQkNggAEwMgwfpwI0+lD4SD-TomyEo2ErLgkTWe2GEa53B7MQgXZia4TMi5UMlR1YXBVktMoUnIG5wekUZCMHEBzps5hrcoqE2I4GERHFhb+Uvam5sISx14m+QAfjg2ROuVpzyXYPkOxa7U6ZJ6fXC293F7BqWYyUz5HMIfPl+frwYZDDXQozwAoqgzBU3gAbTHTRCAAXQpT4ADoYIYAkLRLIRALAgBKQ53jgWgIGAFR3neQCAAYwJ3S93hIsEyOfOBKIvUdAF4NwBBPbgKDES1OAcTxQliQIM1ZkCNCDgwhIklSdIdAEjD1xpPY9ATcJwzed4JHmRZaj7LpsESWEpNUGS5KTGBFNkeRPl4y0UOBYSUjSNgJAhAAqez+XsuB6h6TV2XSSwCQJSV2ImMgCWsKC4AATQgLh2OAAleHgZRezCVU2EdGBnLgBYwAlZBBBIV1gH2edIvi+BEvbTKyFdMg23y7AyXDOAAzDY40q8rgfL8sAuUgHoKCg5y0oAAR6WEEAGiVbhFUxzUBSEQwJRIhBY8okjdXroAJcEVAgZAKHBXkkmoX5E3DKDYpAEgAGIyvIIRGthDw2Hm5BXSsuAABFtooDB+rBFyBoWd9MrYH75BcuFwbGVAQbgFyVn7eA3CEWS-nDYFMj0Q4QQk4zQbBMpdSgAZnnpWh3icNh0QgABCZ5NuAUm0u+360sR5Hjs6KDroq5J31hI4AHJEaMRRrHwNg2fkzp+bS8G4Wc8FdC5oQebDZdgTWRguIAHyuUtNHxPIJG+lSljbXpyG5O61S04JQnCV48HNHG-TJTT2DgexkEcEJTHtx2KBNScARUbUDEoChol8WJnkiLwHGgb8QzDTp3mtMFPccWPI78awY-cOOvYTpPwwwhATV4EdVR8Qk7LBVMK80NiAQimLvSq9tO1AfEWBgCk-DgNo4AlWcUUYKMuNGIRmWLS4YRwYBungM0Y32H2wmYFNBWFEWUR76FhSC+BGE1WM4XLNh1erglkWKAhxtbZfz+1MU4FnNgwB9Tf4XP9WuHMHF4A6z8OvZE4RcrejNA2YB4QTTnzVg1NgtAyS12NvIF2UA3awjXuEbBzAHYQHNIHP8wdQ6GAjqYGI-gvyx1wYnUMJc07yFwVnChUcqF508LQ4uKccbyAbtgeB-wkFQBQeIY2GU1Ln1tr7PB-tDi6B1rg-B5ooIZ2gEo-2CjpHr2Ub1XBGiCEUGUhImQcMvS4MxhsDcWx9zMD2M8Ax5ovimX9hSRE2My7yDMcsMhKs+YoFQJ8QgGxOjUHMBALMppqAACYeQRT1ioQgFJeJQVIOHPxKFlJoP2C4wxp1WJUwOEca46RsAGxUGhTxeNkpciJlVBAMEoK8SwIiA4CBERYDSVQPxbSukUD8VgcESldCoJ5DUwmcBnjQIGOfA4hBpnFgaTBZpYzsBtI6SgXxvNelbLDIM4ZGBMniHEN42UABGTGoJJm4PLq0wg4IKDRWYNQLgYBCAmnCAYYALY2mfEQeGDxO5TlynjlATG-yObIC5GUToLg4LJVrruVMYIAB6y5jmXlTANMY1AMq9BgLiqAeAoBAtWPAGU9wYC4OBDQu2zA6HJ3gEcCFMBUnQvDHCqAh9EWYCZtUtZCA-ncJgICy8wLWLMuFTym0qL0U7ixTivFB0yTEtJfDWUlLqVwFpTIhl9UdbMDvOCqVGKLynIjFy5Kxr6GdGXFBC13L5VQllSaDAfKaLyAAMpPKuGAXQtNcFkSOScslspYlHCuQ4ulsCp5sDmRQP+AD3m7k+VlG4vyWWirNaGkFhcwXMqQZC9lsL4UwGlXAZF8g0WmqRVCbF4xFj4sJaqsVObKVqKgDS-OHa9W9gLSdKFRKOWlp5W64cmgM3CqzbucVjdJU2rLU63c1al31txY25VRLoBqq9BSiAMAO1dqiKC3tgCGpGvnYyrJF4FUNuZJult2b1UOqtZe8MdqX2Lp3SVWN1rGUftjeWytcBq27jHfID1cBvUEgGK8-14JA3iCOUAA

export const forwardUnionRef = React.forwardRef as unknown as <P>(
  component: (
    // the `ref` will be missing from here, but forwardRef dissapears in future react
    // so handling it _after_ the spread is future-proof
    props: P,
    // this part is really just for the internal implementation of the component
    // we could use "unknown" and type assertions after we check discriminant instead
    ref: 'ref' extends keyof P
      ? React.ForwardedRef<
          UnionToIntersection<
            NonNullable<
              Parameters<Extract<P['ref'], (...args: unknown[]) => void>>[0]
            >
          >
        >
      : '🙁 .ref is missing from props'
  ) => React.ReactNode
) => ForwardRefComponent<P>;

export interface ForwardRefComponent<P> {
  (props: P): React.ReactNode;
  /**
   * Used in debugging messages. You might want to set it
   * explicitly if you want to display a different name for
   * debugging purposes.
   *
   * @see {@link https://legacy.reactjs.org/docs/react-component.html#displayname Legacy React Docs}
   *
   * @example
   *
   * ```tsx
   *
   * const MyComponent: FC = () => {
   *   return <div>Hello!</div>
   * }
   *
   * MyComponent.displayName = 'MyAwesomeComponent'
   * ```
   */
  displayName?: string | undefined;
}

type TogglePropsWithoutPrimitiveButtonProps = Omit<
  ToggleProps,
  keyof PrimitiveButtonProps
>;
type TogglePropsWithValuesAsNever = {
  [K in keyof TogglePropsWithoutPrimitiveButtonProps]: never;
};

type LinkPropsWithoutPolymorphicComponentOrLegacyInnerRef = Omit<
  LinkProps,
  'component' | 'innerRef'
>;
type LinkPropsWithoutPrimitiveAnchorProps = Omit<
  LinkPropsWithoutPolymorphicComponentOrLegacyInnerRef,
  keyof React.ComponentPropsWithoutRef<'a'>
>;
type LinkPropsWithValuesAsNever = {
  [K in keyof LinkPropsWithoutPrimitiveAnchorProps]: never;
};

type HTMLButtonProps = React.ComponentPropsWithoutRef<'button'>;
type HTMLAnchorProps = React.ComponentPropsWithoutRef<'a'>;

type HTMLButtonPropsThatDontExistInHTMLAnchorPropsAsNever = {
  [K in Exclude<keyof HTMLButtonProps, keyof HTMLAnchorProps>]?: never;
};

/** Map of modifier keys to their KeyboardEvent properties
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState MDN Reference}
 */
export type ModifierKey = (typeof ModifierKeys)[number];

export const ModifierKeys = [
  'Accel',
  'Alt' /* Full Browser Support */,
  'AltGraph' /* Full Browser Support */,
  'CapsLock' /* Full Browser Support */,
  'Control' /* Full Browser Support */,
  'Fn',
  'Meta' /* Full Browser Support */,
  'NumLock',
  'OS',
  'ScrollLock',
  'Shift' /* Full Browser Support */,
  'Symbol',
] as const;

const ModifierToElement = {
  Accel: '⌘',
  Alt: '⌥',
  AltGraph: 'AltGr',
  CapsLock: 'Caps',
  Control: 'Ctrl',
  Fn: 'Fn',
  Meta: '⌘',
  NumLock: 'Num',
  OS: 'OS',
  ScrollLock: 'Scroll',
  Shift: '⇧',
  Symbol: 'Sym',
} as const;

export const Shortcut = ({
  children,
  modifier,
}: {
  children: string;
  modifier?: ModifierKey[];
}) => {
  const stableId = React.useId();

  return (
    <span className="flex items-center gap-0.5">
      {modifier?.map((mod) => (
        <kbd
          className="rounded-[3px] border border-[#00000055] bg-[#00000008] px-1 py-px text-sm leading-none"
          key={`${stableId}-${mod}`}
        >
          {ModifierToElement[mod]}
        </kbd>
      ))}
      <kbd className="rounded-[3px] border border-[#00000055] bg-[#00000008] px-1 py-px text-sm uppercase leading-none">
        {children}
      </kbd>
    </span>
  );
};

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded border border-transparent transition-all duration-[70ms]',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        tertiary: '',
      },
      size: {
        sm: 'h-7 min-w-7 px-1.5 py-1.5 text-sm',
        md: 'h-8 min-w-8 px-2 py-1.5 text-md',
      },
      intent: {
        neutral: '',
        danger: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        intent: 'neutral',
        className: [
          'border-gray-12 bg-gray-a-12 text-gray-02 hover:border-gray-11 hover:bg-gray-a-11 focus-visible:border-gray-11 focus-visible:bg-gray-a-11',
          'data-[state=on]:border-gray-11 data-[state=on]:bg-gray-a-11 data-[state=on]:hover:border-gray-10 data-[state=on]:hover:bg-gray-a-10 data-[state=on]:focus-visible:border-gray-10 data-[state=on]:focus-visible:bg-gray-a-10',
          'data-[state=off]:border-gray-12 data-[state=off]:bg-gray-a-12 data-[state=off]:hover:border-gray-11 data-[state=off]:hover:bg-gray-a-11 data-[state=off]:focus-visible:border-gray-11 data-[state=off]:focus-visible:bg-gray-a-11',
          'disabled:border-gray-07 disabled:bg-gray-a-05 disabled:text-gray-09 disabled:hover:border-gray-07 disabled:hover:bg-gray-a-05 disabled:focus-visible:border-gray-07 disabled:focus-visible:bg-gray-a-05',
        ],
      },
      {
        variant: 'secondary',
        intent: 'neutral',
        className: [
          'border-gray-a-06 bg-gray-a-02 text-gray-12 hover:bg-gray-a-03 focus-visible:bg-gray-a-03',
          'data-[state=on]:border-gray-a-06 data-[state=on]:bg-gray-a-05 data-[state=on]:hover:bg-gray-a-03 data-[state=on]:focus-visible:bg-gray-a-04',
          'data-[state=off]:border-gray-a-06 data-[state=off]:bg-gray-a-02 data-[state=off]:hover:bg-gray-a-03 data-[state=off]:focus-visible:bg-gray-a-03',
          'disabled:border-gray-04 disabled:bg-gray-a-01 disabled:text-gray-09 disabled:hover:border-gray-04 disabled:hover:bg-gray-a-01 disabled:focus-visible:border-gray-04 disabled:focus-visible:bg-gray-a-01',
        ],
      },
      {
        variant: 'tertiary',
        intent: 'neutral',
        className: [
          'bg-gray-a-01 text-gray-12 hover:bg-gray-a-03 focus-visible:bg-gray-a-03',
          'data-[state=on]:bg-gray-a-05 data-[state=on]:hover:bg-gray-a-03 data-[state=on]:focus-visible:bg-gray-a-04',
          'data-[state=off]:bg-gray-a-01 data-[state=off]:hover:bg-gray-a-03 data-[state=off]:focus-visible:bg-gray-a-03',
          'disabled:bg-gray-a-01 disabled:text-gray-09 disabled:hover:bg-gray-a-01 disabled:focus-visible:bg-gray-a-01',
        ],
      },
    ],
    defaultVariants: {
      variant: 'primary',
      intent: 'neutral',
      size: 'md',
    },
  }
);

interface BaseButtonProps {
  loading?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  shortcut?: {
    key: string;
    modifier?: ModifierKey[];
  };
  /**
   * minimum artificial delays
   * - minimumDuration: shows spinner for at least 500ms
   * - delay: don't show spinner if response is less than 100ms
   * - immediate: normal behavior
   * @default "delay"
   */
  loadingStrategy?: 'minimumDuration' | 'delay' | 'immediate';
}

export interface ButtonProps
  extends React.ClassAttributes<HTMLButtonElement>,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseButtonProps,
    TogglePropsWithValuesAsNever,
    LinkPropsWithValuesAsNever,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;

  toggle?: false;
}

export interface ToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseButtonProps,
    ToggleProps,
    LinkPropsWithValuesAsNever,
    VariantProps<typeof buttonVariants> {
  asChild?: false;
  ref?: React.Ref<HTMLButtonElement>;

  toggle: true;
}

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    BaseButtonProps,
    HTMLButtonPropsThatDontExistInHTMLAnchorPropsAsNever,
    TogglePropsWithValuesAsNever,
    LinkPropsWithoutPrimitiveAnchorProps,
    VariantProps<typeof buttonVariants> {
  ref?: React.Ref<React.ComponentRef<Link>>;
  asChild?: boolean;

  toggle?: false;
}

export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  loading: _loading,
  left,
  right,
  shortcut,
  children,
  loadingStrategy = 'delay',
  toggle,
  ref,
  ...props
}: ButtonProps | ToggleButtonProps | LinkButtonProps) => {
  // loading strategy is based on https://x.com/JohnPhamous/status/1679271160570327040?s=20
  const [loading, setLoading] = React.useState(_loading);
  const artificialDelayPromiseRef = React.useRef<Promise<void>>();

  const minimumDurationCallback = React.useCallback(() => {
    setLoading(true);
    artificialDelayPromiseRef.current = new Promise((resolve) =>
      setTimeout(resolve, 500)
    );
  }, []);

  const delayCallback = React.useCallback(() => {
    artificialDelayPromiseRef.current = new Promise((resolve) =>
      setTimeout(() => {
        setLoading(true);
        resolve();
      }, 100)
    );
  }, []);

  React.useEffect(() => {
    if (loadingStrategy === 'immediate') {
      setLoading(_loading);
      return;
    }

    if (_loading) {
      if (loadingStrategy === 'minimumDuration') {
        minimumDurationCallback();
      } else if (loadingStrategy === 'delay') {
        delayCallback();
      }
    } else {
      void artificialDelayPromiseRef.current?.then(() => {
        setLoading(false);
      });
    }
  }, [_loading, loadingStrategy, minimumDurationCallback, delayCallback]);

  const isThisALink = 'to' in props;

  const CompIfNotAsChild = isThisALink
    ? Link
    : toggle
      ? Toggle.Root
      : HTMLButton;
  const Comp = asChild ? Slot : CompIfNotAsChild;
  const Left = loading ? <Spinner className="animate-spin" /> : left;

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      // @ts-expect-error - pretend it fucking is
      ref={ref}
      {...props}
    >
      {Left}
      {children || shortcut ? (
        <span className="inline-flex gap-1">
          {children}
          {shortcut && (
            <Shortcut modifier={shortcut.modifier}>{shortcut.key}</Shortcut>
          )}
        </span>
      ) : null}
      {right}
    </Comp>
  );
};
Button.displayName = 'Button';

/**
 * Group of buttons
 * Takes buttons, removes the borders that would get doubled, makes only the outer ones rounded.
 */
export const ButtonGroup = ({ children }: { children: React.ReactNode }) => {
  const stableId = React.useId();

  return (
    <div className="flex">
      {React.Children.map(children, (child, index) => {
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;

        const childWithProps = React.cloneElement(child as React.ReactElement, {
          className: cn(
            (child as React.ReactElement).props.className,
            !isFirst && 'rounded-l-none border-l-0',
            !isLast && 'rounded-r-none border-r-0'
          ),
          key: `${stableId}-${index}`,
        });

        return (
          <>
            {childWithProps}
            {!isLast && <span className="h-auto w-px bg-gray-07" />}
          </>
        );
      })}
    </div>
  );
};

const HTMLButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>((props, ref) => <button {...props} ref={ref} />);

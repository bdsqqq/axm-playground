import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../util";
import { Spinner } from "../icons";

/** Map of modifier keys to their KeyboardEvent properties
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState MDN Reference}
 */
export type ModifierKey = (typeof ModifierKeys)[number];

export const ModifierKeys = [
  "Accel",
  "Alt" /* Full Browser Support */,
  "AltGraph" /* Full Browser Support */,
  "CapsLock" /* Full Browser Support */,
  "Control" /* Full Browser Support */,
  "Fn",
  "Meta" /* Full Browser Support */,
  "NumLock",
  "OS",
  "ScrollLock",
  "Shift" /* Full Browser Support */,
  "Symbol",
] as const;

const ModifierToElement = {
  Accel: "⌘",
  Alt: "⌥",
  AltGraph: "AltGr",
  CapsLock: "Caps",
  Control: "Ctrl",
  Fn: "Fn",
  Meta: "⌘",
  NumLock: "Num",
  OS: "OS",
  ScrollLock: "Scroll",
  Shift: "⇧",
  Symbol: "Sym",
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
          className="text-sm leading-none rounded-[3px] bg-[#00000008] px-1 py-px border border-[#00000055]"
          key={`${stableId}-${mod}`}
        >
          {ModifierToElement[mod]}
        </kbd>
      ))}
      <kbd className="text-sm leading-none rounded-[3px] bg-[#00000008] px-1 py-px border border-[#00000055] uppercase">
        {children}
      </kbd>
    </span>
  );
};

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center border border-transparent whitespace-nowrap rounded transition-all duration-[70ms]",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        tertiary: "",
      },
      size: {
        sm: "px-1.5 py-1.5 h-7 min-w-7 text-sm",
        md: "px-2 h-8 py-1.5 min-w-8 text-md",
      },
      intent: {
        neutral: "",
        danger: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        intent: "neutral",
        className: [
          "text-gray-02 bg-gray-a-12 hover:bg-gray-a-11 focus-visible:bg-gray-a-11 border-gray-12 hover:border-gray-11 focus-visible:border-gray-11",
          "disabled:text-gray-09 disabled:bg-gray-a-05 disabled:hover:bg-gray-a-05 disabled:focus-visible:bg-gray-a-05 disabled:border-gray-07 disabled:hover:border-gray-07 disabled:focus-visible:border-gray-07",
        ],
      },
      {
        variant: "secondary",
        intent: "neutral",
        className: [
          "text-gray-12 bg-gray-a-02 hover:bg-gray-a-03 focus-visible:bg-gray-a-03 border-gray-a-06",
          "disabled:text-gray-09 disabled:bg-gray-a-01 disabled:hover:bg-gray-a-01 disabled:focus-visible:bg-gray-a-01 disabled:border-gray-04 disabled:hover:border-gray-04 disabled:focus-visible:border-gray-04",
        ],
      },
      {
        variant: "tertiary",
        intent: "neutral",
        className: [
          "text-gray-12 bg-gray-a-01 hover:bg-gray-a-03 focus-visible:bg-gray-a-03",
          "disabled:text-gray-09 disabled:bg-gray-a-01 disabled:hover:bg-gray-a-01 disabled:focus-visible:bg-gray-a-01",
        ],
      },
    ],
    defaultVariants: {
      variant: "primary",
      intent: "neutral",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
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
  loadingStrategy?: "minimumDuration" | "delay" | "immediate";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading: _loading,
      left,
      right,
      shortcut,
      children,
      loadingStrategy = "delay",
      ...props
    },
    ref
  ) => {
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
      if (loadingStrategy === "immediate") {
        setLoading(_loading);
        return;
      }

      if (_loading) {
        if (loadingStrategy === "minimumDuration") {
          minimumDurationCallback();
        } else if (loadingStrategy === "delay") {
          delayCallback();
        }
      } else {
        void artificialDelayPromiseRef.current?.then(() => {
          setLoading(false);
        });
      }
    }, [_loading, loadingStrategy, minimumDurationCallback, delayCallback]);

    const Comp = asChild ? Slot : "button";
    const Left = loading ? <Spinner className="animate-spin" /> : left;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
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
  }
);
Button.displayName = "Button";

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
            !isFirst && "rounded-l-none border-l-0",
            !isLast && "rounded-r-none border-r-0"
          ),
          key: `${stableId}-${index}`,
        });

        return (
          <>
            {childWithProps}
            {!isLast && <span className="w-px h-auto bg-gray-07" />}
          </>
        );
      })}
    </div>
  );
};

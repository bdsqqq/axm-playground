import { Dialoguer } from "./ui/dialog/Dialog";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./ui/util";

const Spinner = ({ ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M8 1.5C9.19862 1.5 10.3739 1.83143 11.3959 2.45765C12.418 3.08388 13.2469 3.98051 13.7912 5.04843C14.3355 6.11635 14.5739 7.31398 14.48 8.50892C14.3862 9.70387 13.9638 10.8496 13.2594 11.8195L12.4529 11.2337C13.0492 10.4126 13.4068 9.44257 13.4863 8.43088C13.5658 7.41918 13.3639 6.40522 12.9031 5.50107C12.4423 4.59691 11.7405 3.83779 10.8752 3.3076C10.0099 2.77741 9.01481 2.4968 8 2.4968V1.5Z"
      fill="currentColor"
    />
  </svg>
);

const Add = ({ ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g clip-path="url(#clip0_308_995)">
      <path
        d="M8.5 7.5V2.5H7.5V7.5H2.5V8.5H7.5V13.5H8.5V8.5H13.5V7.5H8.5Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_308_995">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

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

const Shortcut = ({
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      left,
      right,
      shortcut,
      children,
      ...props
    },
    ref
  ) => {
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
const ButtonGroup = ({ children }: { children: React.ReactNode }) => {
  const stableId = React.useId();

  return (
    <div className="flex">
      {React.Children.map(children, (child, index) => {
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;

        const childWithProps = React.cloneElement(child as React.ReactElement, {
          className: cn(
            (child as React.ReactElement).props.className,
            !isFirst && "rounded-l-none",
            !isLast && "rounded-r-none"
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

function App() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col gap-8 items-center justify-center">
        <Button
          left={<Add />}
          shortcut={{
            key: "N",
            modifier: ["Meta"],
          }}
          right={<Add />}
        >
          Hej do
        </Button>
        <Button left={<Add />} />

        <ButtonGroup>
          <Button
            left={<Add />}
            shortcut={{
              key: "N",
              modifier: ["Meta"],
            }}
            right={<Add />}
          >
            Hej do
          </Button>
          <Button left={<Add />} />
        </ButtonGroup>
      </div>
      <Dialoguer />
    </div>
  );
}

export default App;

import { Dialoguer } from "./ui/dialog/Dialog";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./ui/util";

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

const buttonVariants = cva(
  "inline-flex items-center justify-center border border-transparent whitespace-nowrap rounded transition-colors",
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

// button has the following slots:
// left (icon, loading)
// label
// shortcut
// right (icon, usually reserved for chevron)
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

function App() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col gap-8 items-center justify-center">
        <Button>Hej do</Button>
      </div>
      <Dialoguer />
    </div>
  );
}

export default App;

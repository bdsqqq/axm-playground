import { dialog } from "./App";

export const NestedThing = () => {
  return (
    <div className="border-dotted border-4 border-red-600 p-2">
      <button
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-fit"
        onClick={(e) => {
          dialog({
            content: <div>From nested</div>,
            triggerElement: e.currentTarget,
          });
        }}
      >
        I'm deeply nested, very far away from anything that looks like a Radix
        Dialog Markup
      </button>
    </div>
  );
};

import { dialog } from "./ui/dialog/Dialog";

export const NestedThing = () => {
  return (
    <div className="border-4 border-dotted border-gray-07 p-2">
      <button
        className="text-white w-fit rounded-md bg-gray-03 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-04 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-07"
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

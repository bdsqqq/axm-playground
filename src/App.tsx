import { NestedThing } from "./NestedThing";
import { Dialoguer, dialog, resetDialog } from "./ui/dialog/Dialog";

function App() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col gap-8 items-center justify-center">
        <button
          className="rounded-md bg-gray-03 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-04 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-07 w-fit"
          onClick={(e) => {
            console.log("e.currentTarget", e.currentTarget);

            dialog({
              title: "Title because we like consistent styles",
              triggerElement: e.currentTarget,
              content: (
                <div>
                  From App.tsx
                  <button
                    className="rounded-md bg-gray-03 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-04 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-07 w-fit"
                    onClick={resetDialog}
                  >
                    Close from content prop
                  </button>
                </div>
              ),
            });
          }}
        >
          Hej do
        </button>
        <NestedThing />
      </div>
      <Dialoguer />
    </div>
  );
}

export default App;

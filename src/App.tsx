import * as Dialog from "@radix-ui/react-dialog";

import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { NestedThing } from "./NestedThing";

interface DialogState {
  open: boolean;
  content: React.ReactNode;
  title: string | null;
  description: string | null;

  triggerElement: HTMLElement | null;

  setOpen: (open: boolean) => void;

  reset: () => void;
}

const dialogStore = createStore<DialogState>((set) => ({
  open: false,
  content: null,
  title: null,
  description: null,

  triggerElement: null,

  setOpen: (open) => set({ open }),

  reset: () =>
    set({
      open: false,
      content: null,
      title: null,
      description: null,
    }),
}));

export const dialog = ({
  content,
  title = null,
  description = null,
  triggerElement = null,
}: {
  content: DialogState["content"];
  title?: DialogState["title"];
  description?: DialogState["description"];
  triggerElement?: DialogState["triggerElement"];
}) => {
  dialogStore.setState({
    open: true,
    content,
    title,
    description,
    triggerElement,
  });
};

const Dialoguer = () => {
  const { open, content, title, description, setOpen, triggerElement, reset } =
    useStore(dialogStore);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (newOpen) return;
        reset();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/20 data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-sm" />
        <Dialog.Content
          onCloseAutoFocus={() => {
            console.log("onCloseAutoFocus", triggerElement);
            triggerElement?.focus();
            dialogStore.setState({ triggerElement: null });
          }}
          className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <Dialog.Title className="text-lg">{title}</Dialog.Title>
          <Dialog.Description className="mt-2.5 mb-5 leading-normal">
            {description}
          </Dialog.Description>

          {content}

          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              x
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

function App() {
  const { reset } = useStore(dialogStore);

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col gap-8 items-center justify-center">
        <button
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-fit"
          onClick={(e) => {
            console.log("e.currentTarget", e.currentTarget);

            dialog({
              title: "Title because we like consistent styles",
              triggerElement: e.currentTarget,
              content: (
                <div>
                  From App.tsx
                  <button
                    className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-fit"
                    onClick={reset}
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

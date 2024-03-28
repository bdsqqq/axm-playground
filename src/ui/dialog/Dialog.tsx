import * as Dialog from "@radix-ui/react-dialog";

import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

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

// eslint-disable-next-line react-refresh/only-export-components
export const resetDialog = () => dialogStore.setState({ open: false });

// eslint-disable-next-line react-refresh/only-export-components
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

/**
 * Dialog provider;
 * to be used by manipulating the state of the DialogStore.
 */
export const Dialoguer = () => {
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
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-gray-a-02 backdrop-blur-sm" />
        <Dialog.Content
          onCloseAutoFocus={() => {
            console.log("onCloseAutoFocus", triggerElement);
            triggerElement?.focus();
            dialogStore.setState({ triggerElement: null });
          }}
          className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-01 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <Dialog.Title className="text-lg">{title}</Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 leading-normal">
            {description}
          </Dialog.Description>

          {content}

          <Dialog.Close asChild>
            <button
              className="absolute right-2 top-2 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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

import * as Dialog from '@radix-ui/react-dialog';

import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

interface PanelState {
  open: boolean;
  content: React.ReactNode;
  title: string | null;
  description: string | null;

  triggerElement: HTMLElement | null;

  setOpen: (open: boolean) => void;

  reset: () => void;
}

const PanelStore = createStore<PanelState>((set) => ({
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
export const resetDialog = () => PanelStore.setState({ open: false });

// eslint-disable-next-line react-refresh/only-export-components
export const panel = ({
  content,
  title = null,
  description = null,
  triggerElement = null,
}: {
  content: PanelState['content'];
  title?: PanelState['title'];
  description?: PanelState['description'];
  triggerElement?: PanelState['triggerElement'];
}) => {
  PanelStore.setState({
    open: true,
    content,
    title,
    description,
    triggerElement,
  });
};

/**
 * Panel provider;
 * to be used by manipulating the state of the PanelStore.
 */
export const PanelProvider = () => {
  const { open, content, title, description, setOpen, triggerElement, reset } =
    useStore(PanelStore);

  return (
    <Dialog.Root
      modal
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (newOpen) return;
        reset();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content
          onCloseAutoFocus={() => {
            console.log('onCloseAutoFocus', triggerElement);
            triggerElement?.focus();
            PanelStore.setState({ triggerElement: null });
          }}
          className="fixed bottom-2 right-2 top-2 max-h-[calc(100vh_-_1rem)] w-96 rounded bg-gray-01 focus:outline-none"
        >
          <Dialog.Title className="px-4 text-lg">{title}</Dialog.Title>
          <Dialog.Description className="px-4">
            {description}
          </Dialog.Description>

          <div className="px-4">{content}</div>

          <Dialog.Close asChild>
            <button
              className="absolute right-2 top-2 inline-flex h-4 w-4 appearance-none items-center justify-center leading-none"
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

import { useEffect, useMemo } from 'react';
import { Button } from './ui/button/button';
import { ButtonShowcase, LatencyShowcase } from './ui/button/showcase';
import { Dialoguer } from './ui/dialog/Dialog';
import { PanelProvider, panel } from './ui/dialog/Panel';

import { type ModifierKey, ModifierKeys, Shortcut } from './ui/button/button';
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';

interface registeredShortcut {
  name: string;
  modifierKeys?: ModifierKey[];
  targetKeys: string[];
}
interface ShortcutStore {
  shortcuts: registeredShortcut[];

  getShortcutByName: (name: string) => registeredShortcut | undefined;
  getShortcutNameByKeys: (
    targetKeys: string[],
    modifierKeys?: ModifierKey[]
  ) => string | undefined;
  addShortcut: (shortcut: registeredShortcut) => void;
  removeShortcut: (shortcut: registeredShortcut) => void;
}

const shortcutStore = createStore<ShortcutStore>((set, get) => ({
  shortcuts: [],

  getShortcutByName: (name: string) => {
    return get().shortcuts.find((shortcut) => shortcut.name === name);
  },
  getShortcutNameByKeys: (targetKeys, modifierKeys = []) => {
    return get().shortcuts.find(
      (shortcut) =>
        shortcut.targetKeys.sort().join(',') === targetKeys.sort().join(',') &&
        (!modifierKeys.length ||
          (shortcut.modifierKeys || []).sort().join(',') ===
            modifierKeys.sort().join(','))
    )?.name;
  },
  addShortcut: (shortcut: registeredShortcut) => {
    set((state) => ({ shortcuts: [...state.shortcuts, shortcut] }));
  },
  removeShortcut: (shortcut: registeredShortcut) => {
    set((state) => ({
      shortcuts: state.shortcuts.filter((s) => s.name !== shortcut.name),
    }));
  },
}));

type UseKeyPressProps = {
  name: string;
  targetKeys: string[];
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  modifierKeys?: ModifierKey[];
};

/**
 * Hook used to listen for a specific key press.
 *
 * @param name - The name of the action to perform. Used to display in help pannel and maybe more? TODO @igor: this.
 * @param targetKeys - The keys to listen for. These are case-insensitive and modifier key exclusive, meaning it won't fire if a modifier key is pressed unless it's specified in the modifierKeys array.
 * @param onKeyDown - The action to perform on key down.
 * @param onKeyUp - The action to perform on key up.
 * @param [modifierKeys] - Optionally specify which modifier keys to listen for.
 */
function useKeyPress({
  name,
  targetKeys,
  onKeyDown,
  onKeyUp,
  modifierKeys = [],
}: UseKeyPressProps) {
  const { addShortcut, removeShortcut } = useStore(shortcutStore);

  useEffect(() => {
    console.log('add shortcut effect');
    addShortcut({ name, targetKeys, modifierKeys });

    return () => {
      console.log('remove shortcut effect');
      removeShortcut({ name, targetKeys, modifierKeys });
    };
  }, [name, targetKeys, modifierKeys, addShortcut, removeShortcut]);

  useEffect(() => {
    const allowedModifiers = new Set(modifierKeys);

    const checkModifiers = (event: KeyboardEvent) => {
      if (allowedModifiers.size === 0) {
        return true;
      }

      return ModifierKeys.every(
        (mod) => allowedModifiers.has(mod) === event.getModifierState(mod)
      ); // gaurentee that all modifier keys are pressed
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        targetKeys.some(
          (key) => key.toLowerCase() === event.key.toLowerCase()
        ) &&
        checkModifiers(event)
      ) {
        onKeyDown(event);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!onKeyUp) {
        return;
      }

      if (
        targetKeys.some(
          (key) => key.toLowerCase() === event.key.toLowerCase()
        ) &&
        checkModifiers(event)
      ) {
        onKeyUp(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [name, targetKeys, onKeyDown, onKeyUp, modifierKeys]);
}

const KeyboardShortCutShowcase = () => {
  const { shortcuts } = useStore(shortcutStore);

  const handleOpenKeyboardShortcutPanel = () => {
    panel({
      title: 'Keyboard Shortcut',
      description: 'Keyboard Shortcut',
      content: (
        <ul>
          {shortcuts.map((shortcut) => (
            <li
              key={shortcut.name}
              className="flex items-center justify-between"
            >
              <span>{shortcut.name}</span>
              <span>
                <Shortcut
                  children={shortcut.targetKeys.join(', ')}
                  modifier={shortcut.modifierKeys}
                />
              </span>
            </li>
          ))}
        </ul>
      ),
    });
  };

  const stableTargetKeys = useMemo(() => ['?'], []);
  const stableModifierKeys = useMemo<ModifierKey[]>(() => ['Shift'], []);

  useKeyPress({
    name: 'Open Keyboard Shortcut Panel',
    targetKeys: stableTargetKeys,
    modifierKeys: stableModifierKeys,
    onKeyDown: handleOpenKeyboardShortcutPanel,
  });

  return (
    <Button onClick={handleOpenKeyboardShortcutPanel}>Keyboard Shortcut</Button>
  );
};

function App() {
  return (
    <div className="grid min-h-screen place-items-center gap-8 p-12">
      <KeyboardShortCutShowcase />
      <hr className="w-full border-gray-06" />
      <LatencyShowcase />
      <hr className="w-full border-gray-06" />
      <ButtonShowcase />
      <Dialoguer />
      <PanelProvider />
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import { Button } from './ui/button/button';
import { ButtonShowcase, LatencyShowcase } from './ui/button/showcase';
import { Dialoguer } from './ui/dialog/Dialog';
import { PanelProvider, panel } from './ui/dialog/Panel';

import { type ModifierKey, ModifierKeys } from './ui/button/button';

type UseKeyPressProps = {
  targetKeys: string[];
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  modifierKeys?: ModifierKey[];
};

/**
 * Hook used to listen for a specific key press.
 *
 * @param targetKeys - The keys to listen for. These are case-insensitive and modifier key exclusive, meaning it won't fire if a modifier key is pressed unless it's specified in the modifierKeys array.
 * @param onKeyDown - The action to perform on key down.
 * @param onKeyUp - The action to perform on key up.
 * @param [modifierKeys] - Optionally specify which modifier keys to listen for.
 */
function useKeyPress({
  targetKeys,
  onKeyDown,
  onKeyUp,
  modifierKeys = [],
}: UseKeyPressProps) {
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
  }, [targetKeys, onKeyDown, onKeyUp, modifierKeys]);
}

const KeyboardShortCutShowcase = () => {
  const handleOpenKeyboardShortcutPanel = () => {
    panel({
      title: 'Keyboard Shortcut',
      description: 'Keyboard Shortcut',
      content: <div>Keyboard Shortcut</div>,
    });
  };

  useKeyPress({
    targetKeys: ['?'],
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

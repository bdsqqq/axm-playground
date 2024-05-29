import { useCallback, useState } from 'react';
import { Button } from '../button/button';
import { newId } from '../util';
import { NewWindow } from '.';

export const NewWindowShowcase = () => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);

  const [windowStack, setWindowStack] = useState<string[]>([]);

  const openNewWindow = useCallback(() => {
    const newWindowId = newId('window');
    setWindowStack([...windowStack, newWindowId]);
  }, [windowStack]);

  return (
    <div className="flex gap-4">
      count: {count}
      <Button onClick={increment}>Increment</Button>
      <Button onClick={openNewWindow}>Open new window</Button>
      {windowStack.map((id) => (
        <NewWindow target="incrementer" key={id}>
          <div className="flex gap-2">
            <span>window: {id}</span>
            <span>count: {count}</span>

            <Button onClick={increment}>Increment</Button>
          </div>
        </NewWindow>
      ))}
    </div>
  );
};

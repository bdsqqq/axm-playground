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
    <div className="flex w-full flex-col items-start gap-8">
      <div>
        <h2>Cross window(or tab) ui:</h2>
        <p className="max-w-prose text-sm text-gray-11">{`
            React doesn't really care where it puts the exit of a portal, including a window if you get a reference to it by creating it programatically(eg: window.open).
        `}</p>
        <br />
        <p className="max-w-prose text-sm text-gray-11">{`
            And since the portalled content is still rendered by react, it keeps all the behaviour as if it was in the same window. So, sharing state between the two windows is possible using no new abstractions.
        `}</p>
      </div>

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
    </div>
  );
};

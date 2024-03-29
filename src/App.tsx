import { useCallback, useState } from 'react';
import { ButtonShowcase, LatencyShowcase } from './ui/button/showcase';
import { Dialoguer } from './ui/dialog/Dialog';
import { Button } from './ui/button/button';
import { Sun, Moon, CircleDotDashed } from './ui/icons';

const THEMES = ['system', 'light', 'dark'] as const;
const THEME_ICONS = {
  system: <CircleDotDashed />,
  light: <Sun />,
  dark: <Moon />,
} as const;

const CycleToggleButton = ({
  options,
}: {
  options: {
    label: string;
    icon: React.ReactNode;
  }[];
}) => {
  const [selected, setSelected] = useState(0);
  const cycleSelected = useCallback(() => {
    setSelected((selected + 1) % options.length);
  }, [selected, options.length]);

  const Icon = options[selected]?.icon;

  return (
    // could add a context menu to select an item directly
    <Button
      data-valute={options[selected]?.label}
      left={Icon}
      onClick={cycleSelected}
      variant="secondary"
      size="sm"
    />
  );
};

function App() {
  return (
    <div className="grid min-h-screen place-items-center gap-8 p-12">
      <CycleToggleButton
        options={THEMES.map((theme) => ({
          label: theme,
          icon: THEME_ICONS[theme],
        }))}
      />
      <hr className="w-full border-gray-06" />
      <LatencyShowcase />
      <hr className="w-full border-gray-06" />
      <ButtonShowcase />
      <Dialoguer />
    </div>
  );
}

export default App;

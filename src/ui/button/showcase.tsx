import { Button, ButtonGroup, ButtonProps } from './button';
import { Add, ChevronDown } from '../icons';
import { useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

export const ButtonShowcase = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        <h1>Button sm</h1>
        <section>
          <h2>Button</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="primary">
              Label
            </Button>
            <Button size="sm" variant="secondary">
              Label
            </Button>
            <Button size="sm" variant="tertiary">
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button disabled</h2>
          <div className="flex gap-2">
            <Button size="sm" disabled variant="primary">
              Label
            </Button>
            <Button size="sm" disabled variant="secondary">
              Label
            </Button>
            <Button size="sm" disabled variant="tertiary">
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Icon button</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="primary" left={<Add />} />
            <Button size="sm" variant="secondary" left={<Add />} />
            <Button size="sm" variant="tertiary" left={<Add />} />
          </div>
        </section>
        <section>
          <h2>Icon button loading</h2>
          <div className="flex gap-2">
            <Button size="sm" loading variant="primary" left={<Add />} />
            <Button size="sm" loading variant="secondary" left={<Add />} />
            <Button size="sm" loading variant="tertiary" left={<Add />} />
          </div>
        </section>
        <section>
          <h2>Button with icon</h2>
          <div className="flex gap-2">
            <Button size="sm" left={<Add />} variant="primary">
              Label
            </Button>
            <Button size="sm" left={<Add />} variant="secondary">
              Label
            </Button>
            <Button size="sm" left={<Add />} variant="tertiary">
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with icon right</h2>
          <div className="flex gap-2">
            <Button size="sm" right={<ChevronDown />} variant="primary">
              Label
            </Button>
            <Button size="sm" right={<ChevronDown />} variant="secondary">
              Label
            </Button>
            <Button size="sm" right={<ChevronDown />} variant="tertiary">
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button loading</h2>
          <div className="flex gap-2">
            <Button size="sm" loading variant="primary">
              Label
            </Button>
            <Button size="sm" loading variant="secondary">
              Label
            </Button>
            <Button size="sm" loading variant="tertiary">
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with icon right loading</h2>
          <div className="flex gap-2">
            <Button size="sm" loading right={<ChevronDown />} variant="primary">
              Label
            </Button>
            <Button
              size="sm"
              loading
              right={<ChevronDown />}
              variant="secondary"
            >
              Label
            </Button>
            <Button
              size="sm"
              loading
              right={<ChevronDown />}
              variant="tertiary"
            >
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with shortcut</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="primary"
            >
              Label
            </Button>
            <Button
              size="sm"
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="secondary"
            >
              Label
            </Button>
            <Button
              size="sm"
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="tertiary"
            >
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with shortcut and icon right</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              right={<ChevronDown />}
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="primary"
            >
              Label
            </Button>
            <Button
              size="sm"
              right={<ChevronDown />}
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="secondary"
            >
              Label
            </Button>
            <Button
              size="sm"
              right={<ChevronDown />}
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="tertiary"
            >
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button group</h2>
          <div className="flex gap-2">
            <ButtonGroup>
              <Button size="sm" variant="primary">
                Label
              </Button>
              <Button size="sm" left={<Add />} variant={'primary'} />
            </ButtonGroup>

            <ButtonGroup>
              <Button size="sm" variant="secondary">
                Label
              </Button>
              <Button size="sm" left={<Add />} variant={'secondary'} />
            </ButtonGroup>

            <ButtonGroup>
              <Button size="sm" variant="tertiary">
                Label
              </Button>
              <Button size="sm" left={<Add />} variant={'tertiary'} />
            </ButtonGroup>
          </div>
        </section>
        <section>
          <h2>Toggle Button</h2>
          <div className="flex gap-2">
            <Button
              toggle
              size="sm"
              left={<Add />}
              defaultPressed={false}
              variant="primary"
            />
            <Button
              toggle
              size="sm"
              left={<Add />}
              defaultPressed={false}
              variant="secondary"
            />
            <Button
              toggle
              size="sm"
              left={<Add />}
              defaultPressed={false}
              variant="tertiary"
            />
          </div>
        </section>
        <section>
          <h2>Toggle Button in ToggleGroup</h2>
          <div className="flex gap-2">
            <ToggleGroup.Root type="single" defaultValue="1">
              <ToggleGroup.Item asChild value="1">
                <Button toggle size="sm" left={<Add />} variant="primary" />
              </ToggleGroup.Item>
              <ToggleGroup.Item asChild value="2">
                <Button toggle size="sm" left={<Add />} variant="secondary" />
              </ToggleGroup.Item>
              <ToggleGroup.Item asChild value="3">
                <Button toggle size="sm" left={<Add />} variant="tertiary" />
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-4">
        <h1>Button md</h1>
        <section>
          <h2>Button</h2>
          <div className="flex gap-2">
            <Button variant="primary">Label</Button>
            <Button variant="secondary">Label</Button>
            <Button variant="tertiary">Label</Button>
          </div>
        </section>
        <section>
          <h2>Button disabled</h2>
          <div className="flex gap-2">
            <Button disabled variant="primary">
              Label
            </Button>
            <Button disabled variant="secondary">
              Label
            </Button>
            <Button disabled variant="tertiary">
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Icon button</h2>
          <div className="flex gap-2">
            <Button variant="primary" left={<Add />} />
            <Button variant="secondary" left={<Add />} />
            <Button variant="tertiary" left={<Add />} />
          </div>
        </section>
        <section>
          <h2>Icon button loading</h2>
          <div className="flex gap-2">
            <Button loading variant="primary" left={<Add />} />
            <Button loading variant="secondary" left={<Add />} />
            <Button loading variant="tertiary" left={<Add />} />
          </div>
        </section>
        <section>
          <h2>Button with icon</h2>
          <div className="flex gap-2">
            <Button left={<Add />} variant="primary">
              Label
            </Button>
            <Button left={<Add />} variant="secondary">
              Label
            </Button>
            <Button left={<Add />} variant="tertiary">
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with icon right</h2>
          <div className="flex gap-2">
            <Button right={<ChevronDown />} variant="primary">
              Label
            </Button>
            <Button right={<ChevronDown />} variant="secondary">
              Label
            </Button>
            <Button right={<ChevronDown />} variant="tertiary">
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button loading</h2>
          <div className="flex gap-2">
            <Button loading variant="primary">
              Label
            </Button>
            <Button loading variant="secondary">
              Label
            </Button>
            <Button loading variant="tertiary">
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with icon right loading</h2>
          <div className="flex gap-2">
            <Button loading right={<ChevronDown />} variant="primary">
              Label
            </Button>
            <Button loading right={<ChevronDown />} variant="secondary">
              Label
            </Button>
            <Button loading right={<ChevronDown />} variant="tertiary">
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with shortcut</h2>
          <div className="flex gap-2">
            <Button
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="primary"
            >
              Label
            </Button>
            <Button
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="secondary"
            >
              Label
            </Button>
            <Button
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="tertiary"
            >
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with shortcut and icon right</h2>
          <div className="flex gap-2">
            <Button
              right={<ChevronDown />}
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="primary"
            >
              Label
            </Button>
            <Button
              right={<ChevronDown />}
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="secondary"
            >
              Label
            </Button>
            <Button
              right={<ChevronDown />}
              shortcut={{
                key: 'A',
                modifier: ['Meta', 'Shift'],
              }}
              variant="tertiary"
            >
              Label
            </Button>
          </div>
        </section>
        <section>
          <h2>Button group</h2>
          <div className="flex gap-2">
            <ButtonGroup>
              <Button variant="primary">Label</Button>
              <Button left={<Add />} variant={'primary'} />
            </ButtonGroup>

            <ButtonGroup>
              <Button variant="secondary">Label</Button>
              <Button left={<Add />} variant={'secondary'} />
            </ButtonGroup>

            <ButtonGroup>
              <Button variant="tertiary">Label</Button>
              <Button left={<Add />} variant={'tertiary'} />
            </ButtonGroup>
          </div>
        </section>
        <section>
          <h2>Toggle Button</h2>
          <div className="flex gap-2">
            <Button
              toggle
              left={<Add />}
              defaultPressed={false}
              variant="primary"
            />
            <Button
              toggle
              left={<Add />}
              defaultPressed={false}
              variant="secondary"
            />
            <Button
              toggle
              left={<Add />}
              defaultPressed={false}
              variant="tertiary"
            />
          </div>
        </section>
        <section>
          <h2>Toggle Button in ToggleGroup</h2>
          <div className="flex gap-2">
            <ToggleGroup.Root type="single" defaultValue="1">
              <ToggleGroup.Item asChild value="1">
                <Button toggle left={<Add />} variant="primary" />
              </ToggleGroup.Item>
              <ToggleGroup.Item asChild value="2">
                <Button toggle left={<Add />} variant="secondary" />
              </ToggleGroup.Item>
              <ToggleGroup.Item asChild value="3">
                <Button toggle left={<Add />} variant="tertiary" />
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
        </section>
      </div>
    </div>
  );
};

const ButtonWithLatency = ({
  latency,
  ...props
}: { latency: number } & Omit<ButtonProps, 'loading'>) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), latency);
      }}
      loading={loading}
      {...props}
    >
      ~{latency}ms latency
    </Button>
  );
};

export const LatencyShowcase = () => {
  const latencies = [1, 50, 350, 1000];
  const loadingStrategies = ['minimumDuration', 'delay', 'immediate'] as const;

  return (
    <section className="flex flex-col gap-4">
      <h2>
        Loading Strategy:
        <pre className="text-sm text-gray-11">{`minimum artificial delays
- minimumDuration: shows spinner for at least 500ms
- delay: don't show spinner if response is less than 100ms
- immediate: normal behavior`}</pre>
      </h2>
      {loadingStrategies.map((loadingStrategy) => (
        <div>
          <h2 className="font-sm text-gray-11">{loadingStrategy}</h2>
          <div className="flex gap-4">
            {latencies.map((latency) => (
              <ButtonWithLatency
                key={latency}
                latency={latency}
                loadingStrategy={loadingStrategy}
                variant="primary"
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

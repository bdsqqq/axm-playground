import { Dialoguer } from "./ui/dialog/Dialog";

import { Button, ButtonGroup } from "./ui/button/button";
import { Add, ChevronDown } from "./ui/icons";

const ButtonShowcase = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        <h1>Button sm</h1>
        <section>
          <h2>Button</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="primary">
              Button
            </Button>
            <Button size="sm" variant="secondary">
              Button
            </Button>
            <Button size="sm" variant="tertiary">
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button disabled</h2>
          <div className="flex gap-2">
            <Button size="sm" disabled variant="primary">
              Button
            </Button>
            <Button size="sm" disabled variant="secondary">
              Button
            </Button>
            <Button size="sm" disabled variant="tertiary">
              Button
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
              Button
            </Button>
            <Button size="sm" left={<Add />} variant="secondary">
              Button
            </Button>
            <Button size="sm" left={<Add />} variant="tertiary">
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with icon right</h2>
          <div className="flex gap-2">
            <Button size="sm" right={<ChevronDown />} variant="primary">
              Button
            </Button>
            <Button size="sm" right={<ChevronDown />} variant="secondary">
              Button
            </Button>
            <Button size="sm" right={<ChevronDown />} variant="tertiary">
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button loading</h2>
          <div className="flex gap-2">
            <Button size="sm" loading variant="primary">
              Button
            </Button>
            <Button size="sm" loading variant="secondary">
              Button
            </Button>
            <Button size="sm" loading variant="tertiary">
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with icon right loading</h2>
          <div className="flex gap-2">
            <Button size="sm" loading right={<ChevronDown />} variant="primary">
              Button
            </Button>
            <Button
              size="sm"
              loading
              right={<ChevronDown />}
              variant="secondary"
            >
              Button
            </Button>
            <Button
              size="sm"
              loading
              right={<ChevronDown />}
              variant="tertiary"
            >
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with shortcut</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              shortcut={{
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="primary"
            >
              Button
            </Button>
            <Button
              size="sm"
              shortcut={{
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="secondary"
            >
              Button
            </Button>
            <Button
              size="sm"
              shortcut={{
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="tertiary"
            >
              Button
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
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="primary"
            >
              Button
            </Button>
            <Button
              size="sm"
              right={<ChevronDown />}
              shortcut={{
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="secondary"
            >
              Button
            </Button>
            <Button
              size="sm"
              right={<ChevronDown />}
              shortcut={{
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="tertiary"
            >
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button group</h2>
          <div className="flex gap-2">
            <ButtonGroup>
              <Button size="sm" variant="primary">
                Button
              </Button>
              <Button size="sm" left={<Add />} variant={"primary"} />
            </ButtonGroup>

            <ButtonGroup>
              <Button size="sm" variant="secondary">
                Button
              </Button>
              <Button size="sm" left={<Add />} variant={"secondary"} />
            </ButtonGroup>

            <ButtonGroup>
              <Button size="sm" variant="tertiary">
                Button
              </Button>
              <Button size="sm" left={<Add />} variant={"tertiary"} />
            </ButtonGroup>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-4">
        <h1>Button md</h1>
        <section>
          <h2>Button</h2>
          <div className="flex gap-2">
            <Button variant="primary">Button</Button>
            <Button variant="secondary">Button</Button>
            <Button variant="tertiary">Button</Button>
          </div>
        </section>
        <section>
          <h2>Button disabled</h2>
          <div className="flex gap-2">
            <Button disabled variant="primary">
              Button
            </Button>
            <Button disabled variant="secondary">
              Button
            </Button>
            <Button disabled variant="tertiary">
              Button
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
              Button
            </Button>
            <Button left={<Add />} variant="secondary">
              Button
            </Button>
            <Button left={<Add />} variant="tertiary">
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with icon right</h2>
          <div className="flex gap-2">
            <Button right={<ChevronDown />} variant="primary">
              Button
            </Button>
            <Button right={<ChevronDown />} variant="secondary">
              Button
            </Button>
            <Button right={<ChevronDown />} variant="tertiary">
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button loading</h2>
          <div className="flex gap-2">
            <Button loading variant="primary">
              Button
            </Button>
            <Button loading variant="secondary">
              Button
            </Button>
            <Button loading variant="tertiary">
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with icon right loading</h2>
          <div className="flex gap-2">
            <Button loading right={<ChevronDown />} variant="primary">
              Button
            </Button>
            <Button loading right={<ChevronDown />} variant="secondary">
              Button
            </Button>
            <Button loading right={<ChevronDown />} variant="tertiary">
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with shortcut</h2>
          <div className="flex gap-2">
            <Button
              shortcut={{
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="primary"
            >
              Button
            </Button>
            <Button
              shortcut={{
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="secondary"
            >
              Button
            </Button>
            <Button
              shortcut={{
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="tertiary"
            >
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button with shortcut and icon right</h2>
          <div className="flex gap-2">
            <Button
              right={<ChevronDown />}
              shortcut={{
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="primary"
            >
              Button
            </Button>
            <Button
              right={<ChevronDown />}
              shortcut={{
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="secondary"
            >
              Button
            </Button>
            <Button
              right={<ChevronDown />}
              shortcut={{
                key: "A",
                modifier: ["Meta", "Shift"],
              }}
              variant="tertiary"
            >
              Button
            </Button>
          </div>
        </section>
        <section>
          <h2>Button group</h2>
          <div className="flex gap-2">
            <ButtonGroup>
              <Button variant="primary">Button</Button>
              <Button left={<Add />} variant={"primary"} />
            </ButtonGroup>

            <ButtonGroup>
              <Button variant="secondary">Button</Button>
              <Button left={<Add />} variant={"secondary"} />
            </ButtonGroup>

            <ButtonGroup>
              <Button variant="tertiary">Button</Button>
              <Button left={<Add />} variant={"tertiary"} />
            </ButtonGroup>
          </div>
        </section>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col gap-8 items-center justify-center">
        <ButtonShowcase />
      </div>
      <Dialoguer />
    </div>
  );
}

export default App;

import { ButtonShowcase, LatencyShowcase } from './ui/button/showcase';
import { Dialoguer } from './ui/dialog/Dialog';
import { Input } from './ui/input/Input';
import { PortalDevtools } from './ui/portal/devtools';
import {
  PortalShowcase_FarAwaySlots,
  PortalShowcase_Multiplexer,
} from './ui/portal/showcase';

function App() {
  return (
    <div className="grid min-h-screen place-items-center gap-8 p-12">
      <Input type="text" placeholder="NEXT_PUBLIC_SUPER_PASSWORD" />
      <hr className="w-full border-gray-06" />
      <PortalShowcase_Multiplexer />
      <hr className="w-full border-gray-06" />
      <PortalShowcase_FarAwaySlots />
      <hr className="w-full border-gray-06" />
      <LatencyShowcase />
      <hr className="w-full border-gray-06" />
      <ButtonShowcase />
      <Dialoguer />
      <PortalDevtools />
    </div>
  );
}

export default App;

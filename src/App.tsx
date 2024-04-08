import { ButtonShowcase, LatencyShowcase } from './ui/button/showcase';
import { Dialoguer } from './ui/dialog/Dialog';
import { Aperture } from './ui/portal';
import {
  PortalShowcase_FarAwaySlots,
  PortalShowcase_Multiplexer,
} from './ui/portal/showcase';

function App() {
  return (
    <div className="grid min-h-screen place-items-center gap-8 p-12">
      <PortalShowcase_Multiplexer />
      <hr className="w-full border-gray-06" />
      <PortalShowcase_FarAwaySlots />
      <hr className="w-full border-gray-06" />
      <LatencyShowcase />
      <hr className="w-full border-gray-06" />
      <ButtonShowcase />
      <Dialoguer />
      <Aperture />
    </div>
  );
}

export default App;

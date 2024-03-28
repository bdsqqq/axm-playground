import { ButtonShowcase, LatencyShowcase } from "./ui/button/showcase";
import { Dialoguer } from "./ui/dialog/Dialog";

function App() {
  return (
    <div className="grid min-h-screen place-items-center gap-8 p-12">
      <LatencyShowcase />
      <hr className="w-full border-gray-06" />
      <ButtonShowcase />
      <Dialoguer />
    </div>
  );
}

export default App;

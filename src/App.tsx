import { ButtonShowcase, LatencyShowcase } from "./ui/button/showcase";
import { Dialoguer } from "./ui/dialog/Dialog";

function App() {
  return (
    <div className="min-h-screen grid place-items-center gap-8">
      <LatencyShowcase />
      <hr className="border-gray-06 w-full" />
      <ButtonShowcase />
      <Dialoguer />
    </div>
  );
}

export default App;

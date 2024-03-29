import { ButtonShowcase, LatencyShowcase } from './ui/button/showcase';
import { Dialoguer } from './ui/dialog/Dialog';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ButtonLink } from './ui/button/button';

const ButtonRoute = () => (
  <div>
    <h2>Button</h2>
    <ButtonShowcase />
  </div>
);

const LatencyRoute = () => (
  <div>
    <h2>Latency</h2>
    <LatencyShowcase />
  </div>
);

const Nav = () => (
  <nav className="place-self-start">
    <ul className="flex gap-2">
      <li>
        <ButtonLink variant={'secondary'} to="/button">
          Button
        </ButtonLink>
      </li>
      <li>
        <ButtonLink to="/latency">Latency</ButtonLink>
      </li>
    </ul>
  </nav>
);

function App() {
  return (
    <div className="grid min-h-screen place-items-center gap-8 p-12">
      <Router>
        <Nav />
        <Switch>
          <Route path="/button" component={ButtonRoute} />
          <Route path="/latency" component={LatencyRoute} />
        </Switch>
      </Router>
      <Dialoguer />
    </div>
  );
}

export default App;

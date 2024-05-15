import { FlowContextProvider } from "../store/flow-context";
import Home from "./pages/Home";

function App() {
  return (
    <FlowContextProvider>
      <Home />
    </FlowContextProvider>
  );
}

export default App;

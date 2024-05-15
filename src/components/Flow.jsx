import ReactFlow, { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

function Flow(props) {
  return <ReactFlow {...props} />;
}

function FlowWithProvider(props) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;

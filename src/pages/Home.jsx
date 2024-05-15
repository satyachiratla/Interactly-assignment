import { useRef, useCallback, useContext } from "react";
import ReactFlow, {
  Controls,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import EditNode from "../components/EditNode";
import { FlowContext } from "../../store/flow-context";
import Popup from "../components/Popup";
import CustomEdge from "../components/CustomEdge";

const nodeTypes = {
  node: EditNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeIdCounter = useRef(0);
  const edgeIdCounter = useRef(0);

  const { showPopup } = useContext(FlowContext);

  const createNodeHandler = () => {
    const newNodeId = (nodeIdCounter.current += 1).toString();
    const newEdgeId = `e${(edgeIdCounter.current += 1)}-${
      edgeIdCounter.current
    }`;

    const newNode = {
      id: newNodeId,
      type: "node",
      data: { title: "Node" },
      position: calculateNodePosition(newNodeId),
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);

    const targetNodeId = (parseInt(newNodeId) + 1).toString();
    let sourceNodeId;

    if (edgeIdCounter.current <= 2) {
      sourceNodeId = "1";
    } else if (edgeIdCounter.current > 2) {
      sourceNodeId = String(edgeIdCounter.current - 1);
    }

    const newEdge = {
      id: newEdgeId,
      source: sourceNodeId,
      target: targetNodeId,
    };

    setEdges((prevEdges) => [...prevEdges, newEdge]);
  };

  const calculateNodePosition = (nodeId) => {
    const lastNode = nodes.find(
      (node) => node.id === (parseInt(nodeId) - 1).toString()
    );
    const lastNodePosition = lastNode ? lastNode.position : { x: 0, y: 0 };

    if (nodeId === "1") {
      return { x: 0, y: 0 };
    } else {
      if (nodeId > 1 && nodeId % 2 === 0) {
        return { x: 100, y: lastNodePosition.y + 100 };
      } else if (nodeId > 1 && nodeId % 2 !== 0) {
        return { x: lastNodePosition.x - 200, y: lastNodePosition.y };
      }
    }
  };

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `e${(edgeIdCounter.current += 1)}-${edgeIdCounter.current}`,
        type: "customEdge",
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [setEdges]
  );

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <button
          onClick={createNodeHandler}
          className="bg-cyan-300 py-2 px-5 rounded-md"
        >
          Create Node
        </button>
      </div>
      <ReactFlowProvider>
        <div className="flex items-center justify-around">
          <div className="w-[50vw] h-[80vh] border-2 mt-20">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onConnect={onConnect}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
          {showPopup && (
            <div>
              <Popup />
            </div>
          )}
        </div>
      </ReactFlowProvider>
    </div>
  );
}

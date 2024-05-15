/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { FlowContext } from "../../store/flow-context";
import { MdCancel } from "react-icons/md";

export default function EditNode({ data: { title }, id }) {
  const { onClickNode } = useContext(FlowContext);
  const { setNodes } = useReactFlow();

  const [showCancel, setShowCancel] = useState(false);

  const handleNodeClick = () => {
    onClickNode(id, title);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowCancel(true)}
      onMouseLeave={() => setShowCancel(false)}
    >
      <button
        onClick={handleNodeClick}
        className="bg-blue-300 p-3 rounded-full"
      >
        {title}
      </button>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
      {showCancel && (
        <MdCancel
          size={20}
          className="cursor-pointer absolute top-0 right-0 text-red-600"
          onClick={() =>
            setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
          }
        />
      )}
    </div>
  );
}

import { useContext } from "react";
import { IoMdPricetags } from "react-icons/io";
import { MdDelete, MdCancel } from "react-icons/md";
import { FlowContext } from "../../store/flow-context";
import { useReactFlow } from "reactflow";

export default function Popup() {
  const { title, titleChange, saveNodeTitle, selectedNodeId } =
    useContext(FlowContext);
  const { setNodes } = useReactFlow();

  const handleSave = () => {
    setNodes((prevNodes) => {
      return prevNodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, title } }
          : node
      );
    });
    saveNodeTitle();
  };

  return (
    <div className="border border-gray-300 rounded-md p-6 w-[400px]">
      <div className="flex justify-between items-center border-b border-gray-400 pb-4">
        <h3>Title</h3>
        <div className="flex items-center gap-2">
          <IoMdPricetags size={20} />
          <MdDelete size={20} className="text-red-500" />
          <MdCancel size={20} />
        </div>
      </div>
      <div className="pt-4 flex justify-end gap-4">
        <button
          onClick={saveNodeTitle}
          className="border border-gray-300 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-black px-4 py-2 rounded-md text-white"
        >
          Save
        </button>
      </div>
      <div className="mt-5">
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 w-full"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => titleChange(e)}
        />
      </div>
    </div>
  );
}

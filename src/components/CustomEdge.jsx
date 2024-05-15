/* eslint-disable react/prop-types */
import {
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "reactflow";
import { MdCancel } from "react-icons/md";

export default function CustomEdge(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;

  const { setEdges } = useReactFlow();

  // eslint-disable-next-line no-unused-vars
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const handleDeleteEdge = () => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: labelX, top: labelY, pointerEvents: "all" }}
        >
          <MdCancel
            size={20}
            onClick={handleDeleteEdge}
            className="cursor-pointer text-red-500"
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

import { createContext, useState } from "react";

export const FlowContext = createContext({
  onClickNode: () => {},
  showPopup: false,
  title: "",
  titleChange: () => {},
  selectedNodeId: null,
  saveNodeTitle: () => {},
});

// eslint-disable-next-line react/prop-types
export const FlowContextProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const showPopupHandler = (nodeId, nodeTitle) => {
    setSelectedNodeId(nodeId);
    setTitle(nodeTitle);
    setShowPopup(true);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const saveNodeTitleHandler = () => {
    setShowPopup(false);
  };

  const flowValue = {
    onClickNode: showPopupHandler,
    showPopup: showPopup,
    title: title,
    titleChange: titleChangeHandler,
    selectedNodeId: selectedNodeId,
    saveNodeTitle: saveNodeTitleHandler,
  };

  return (
    <FlowContext.Provider value={flowValue}>{children}</FlowContext.Provider>
  );
};

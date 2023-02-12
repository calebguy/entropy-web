import { createContext, useContext } from "react";

interface DisplayContextShape {
  showProps: boolean;
  setShowProps?: (showProps: boolean) => void;
}

const DisplayContext = createContext<DisplayContextShape>({ showProps: false });
export const useDisplayContext = () => useContext(DisplayContext);
export default DisplayContext;

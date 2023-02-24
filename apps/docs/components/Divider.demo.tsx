import { Divider } from "dsl";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const DividerDemo = () => {
  return (
    <Demo title="Divider">
      <SubDemo>
        <Divider />
      </SubDemo>
    </Demo>
  );
};

export default DividerDemo;

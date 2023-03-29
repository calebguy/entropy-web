import { Select } from "dsl";
import { useState } from "react";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const SelectDemo = () => {
  const [value, setValue] = useState("select");
  return (
    <Demo title="Select">
      <SubDemo>
        <Select
          value={value}
          onChange={(val) => setValue(val)}
          items={[{ name: "select", id: "select" }]}
        />
      </SubDemo>
    </Demo>
  );
};

export default SelectDemo;

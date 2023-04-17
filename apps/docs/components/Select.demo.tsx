import { Select } from "dsl";
import { useState } from "react";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const SelectDemo = () => {
  const items = ["🤳", "🖼️", "📀", "💻", "🌏", "🌐", "test"].map((item) => ({
    name: item,
    id: item,
  }));
  const [value, setValue] = useState(items[0].id);

  return (
    <Demo title="Select">
      <SubDemo>
        <Select value={value} onChange={(val) => setValue(val)} items={items} />
      </SubDemo>
    </Demo>
  );
};

export default SelectDemo;

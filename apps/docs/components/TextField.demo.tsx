import { useState } from "react";
import { TextField } from "ui";
import { css } from "utils";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const TextFieldDemo = () => {
  const [value, setValue] = useState("hello");
  return (
    <Demo title={"TextField"}>
      <div className={css("grid", "grid-cols-1", "md:grid-cols-2", "gap-2")}>
        <SubDemo labels={{ placeholder: "string" }}>
          <TextField placeholder="e+" />
        </SubDemo>
        <SubDemo
          labels={{ type: "password", block: "true", placeholder: "string" }}
        >
          <TextField placeholder={"pw plz"} type={"password"} block />
        </SubDemo>
        <SubDemo labels={{ value: "string", onChange: "() => void" }}>
          <TextField value={value} onChange={(val) => setValue(val)} />
        </SubDemo>
        <SubDemo labels={{ type: "email", block: "true" }}>
          <TextField type={"email"} block />
        </SubDemo>
      </div>
    </Demo>
  );
};

export default TextFieldDemo;

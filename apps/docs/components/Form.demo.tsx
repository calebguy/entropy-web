import { useState } from "react";
import { Button, ButtonIntent, Form, TextInput } from "ui";
import { css } from "utils";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const FormDemo = () => {
  const [value, setValue] = useState("test this out");
  return (
    <Demo title={"Form"}>
      <SubDemo labels={{ uncontrolled: "true" }}>
        <Form onSubmit={(values) => console.log("submit", values)}>
          <TextInput
            name={"firstName"}
            placeholder={"...textonly..."}
            label={"<TextInput>"}
            block
          />
          <div className={css("flex", "justify-center")}>
            <Button intent={ButtonIntent.Secondary} submit>
              submit
            </Button>
          </div>
        </Form>
      </SubDemo>
      <SubDemo labels={{ controlledValue: value }}>
        <Form onSubmit={(values) => console.log("submit", values)}>
          <TextInput
            value={value}
            onChange={(val) => setValue(val)}
            name={"firstName"}
            placeholder={"...textonly..."}
            label={"<TextInput>"}
            block
          />
          <div className={css("flex", "justify-center")}>
            <Button intent={ButtonIntent.Secondary} submit>
              submit
            </Button>
            <Button onClick={() => setValue("test")}>set to random</Button>
          </div>
        </Form>
      </SubDemo>
    </Demo>
  );
};

export default FormDemo;

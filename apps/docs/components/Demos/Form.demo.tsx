import { useState } from "react";
import { css, getRandomOfLength, jsonify } from "utils";
import {
  Button,
  ButtonIntent,
  Form,
  TextInput,
} from "../../../../packages/dsl";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const FormDemo = () => {
  const [value, setValue] = useState("test this out");
  return (
    <Demo title={"Form"}>
      <div className={css("grid", "grid-cols-2", "gap-4")}>
        <SubDemo>
          <Form onSubmit={(values) => alert(jsonify(values))}>
            <TextInput
              rules={{ required: true, maxLength: 4 }}
              name={"firstName"}
              placeholder={"...textonly..."}
              label={"<TextInput> Uncontrolled"}
              block
            />
            <div className={css("flex", "justify-center", "mt-4")}>
              <Button intent={ButtonIntent.Secondary} submit>
                submit
              </Button>
            </div>
          </Form>
        </SubDemo>
        <SubDemo>
          <Form onSubmit={(values) => alert(jsonify(values))}>
            <TextInput
              rules={{ required: true }}
              helperText={"i must know your name m'dear"}
              value={value}
              onChange={(val) => setValue(val)}
              name={"firstName"}
              placeholder={"...textonly..."}
              label={"<TextInput> Controlled"}
              block
            />
            <div className={css("flex", "justify-center", "mt-4", "gap-4")}>
              <Button intent={ButtonIntent.Secondary} submit>
                submit
              </Button>
              <Button onClick={() => setValue(getRandomOfLength(7))}>
                set random
              </Button>
            </div>
          </Form>
        </SubDemo>
      </div>
    </Demo>
  );
};

export default FormDemo;

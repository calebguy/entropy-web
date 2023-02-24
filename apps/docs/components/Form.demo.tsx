import { Button, ButtonIntent, ButtonSize, Form, Submit, TextInput } from "dsl";
import MediaInput from "dsl/src/Form/MediaInput";
import { useState } from "react";
import { css, getRandomOfLength, jsonify } from "utils";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const FormDemo = () => {
  const [value, setValue] = useState("e+++++");
  return (
    <Demo title={"Form"}>
      <div className={css("grid", "grid-cols-2", "gap-4")}>
        <SubDemo>
          <Form onSubmit={async (values) => console.log(values)}>
            <TextInput
              rules={{ required: true, maxLength: 4 }}
              name={"firstName"}
              placeholder={"...textonly..."}
              label={"<TextInput> Uncontrolled"}
              block
            />
            <MediaInput
              name={"media"}
              label={"<MediaInput> Uncontrolled"}
              helperText={"help me out!"}
              buttonLabel={"Choose Image from Library"}
              required
            />
            <div className={css("flex", "justify-center", "mt-4")}>
              <Submit
                size={ButtonSize.Lg}
                intent={ButtonIntent.Gray}
                block
                bold
              />
            </div>
          </Form>
        </SubDemo>
        <SubDemo>
          <Form onSubmit={async (values) => alert(jsonify(values))}>
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

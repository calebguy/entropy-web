import { Form } from "ui";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const FormDemo = () => {
  return (
    <Demo title={"Form"}>
      <SubDemo>
        <Form onSubmit={() => console.log("submit")}></Form>
      </SubDemo>
    </Demo>
  );
};

export default FormDemo;

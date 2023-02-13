import {
  Form,
  Pane,
  PaneSize,
  Text,
  TextInput,
  TextIntent,
  TextSize,
} from "dsl";
import { css } from "utils";
import AppLayout from "../layouts/App.layout";

const SignupPage = () => {
  return (
    <AppLayout>
      <div
        className={css(
          "flex",
          "justify-center",
          "flex-col",
          "items-center",
          "gap-4"
        )}
      >
        <Pane size={PaneSize.Lg}>
          <Text intent={TextIntent.Outline} size={TextSize.Xl}>
            Join entropy+
          </Text>
        </Pane>
        <Form
          onSubmit={(values) => console.log(values)}
          className={css("w-full", "flex", "flex-col", "gap-4", "max-w-sm")}
        >
          <TextInput
            name={"name"}
            label={"Username"}
            placeholder={"create a username..."}
            block
            labelCenter
          />
          <TextInput
            name={"email"}
            label={"Email"}
            placeholder={"enter your email..."}
            block
            labelCenter
          />
          <TextInput
            name={"password"}
            label={"Password"}
            placeholder={"create a password..."}
            block
            labelCenter
          />
          <TextInput
            name={"confirmPassword"}
            placeholder={"confirm password..."}
            block
          />
          <TextInput
            name={"twitterHandle"}
            label={"Twitter Handle"}
            placeholder={"@xyzxyzxyz"}
            block
            labelCenter
          />
        </Form>
      </div>
    </AppLayout>
  );
};

export default SignupPage;

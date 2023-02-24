import {
  Button,
  ButtonIntent,
  Form,
  Pane,
  PaneSize,
  Text,
  TextInput,
  TextIntent,
  TextSize,
} from "dsl";
import MediaInput, { MediaInputIntent } from "dsl/src/Form/MediaInput";
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
          "gap-4",
          "h-full"
        )}
      >
        <div
          className={css("sm:max-w-sm", "w-full", "flex", "flex-col", "gap-4")}
        >
          <Pane size={PaneSize.Lg} block>
            <div className={css("text-center")}>
              <Text intent={TextIntent.Outline} size={TextSize.Xl}>
                Join entropy+
              </Text>
            </div>
          </Pane>
          <Form
            onSubmit={async (values) => console.log(values)}
            className={css("w-full", "flex", "flex-col", "gap-4")}
          >
            <MediaInput
              intent={MediaInputIntent.Secondary}
              buttonLabel={"upload profile pic"}
              name={"profilePic"}
            />
            <Text>Profile Info:</Text>
            <TextInput
              name={"name"}
              label={"Username"}
              placeholder={"create a username..."}
              helperText={""}
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
            <div className={css("flex", "justify-center")}>
              <Button intent={ButtonIntent.Secondary} round submit>
                Create account
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};

export default SignupPage;

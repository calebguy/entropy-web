import {
  ButtonIntent,
  Form,
  Pane,
  PaneSize,
  Submit,
  Text,
  TextInput,
  TextIntent,
  TextSize,
} from "dsl";
import MediaInput, { MediaInputIntent } from "dsl/src/Form/MediaInput";
import { css } from "utils";

const SignupPage = () => {
  return (
    <div
      className={css(
        "flex",
        "justify-center",
        "flex-col",
        "items-center",
        "gap-4",
        "grow",
        "p-4"
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
            rules={{ required: true }}
            block
            labelCenter
          />
          <TextInput
            name={"email"}
            label={"Email"}
            placeholder={"enter your email..."}
            rules={{ required: true }}
            block
            labelCenter
          />
          <TextInput
            name={"password"}
            label={"Password"}
            placeholder={"create a password..."}
            type={"password"}
            block
            labelCenter
          />
          <TextInput
            name={"confirmPassword"}
            placeholder={"confirm password..."}
            type={"password"}
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
            <Submit intent={ButtonIntent.Secondary} round>
              Create account
            </Submit>
            {/* <Button intent={ButtonIntent.Secondary} round submit>
                Create account
              </Button> */}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;

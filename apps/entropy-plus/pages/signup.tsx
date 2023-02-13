import {
  AspectRatio,
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
          "md:h-full"
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
          <div className={css("flex", "justify-center")}>
            <div className={css("flex", "flex-col", "items-center", "gap-2")}>
              <AspectRatio
                ratio={"1/1"}
                className={css(
                  "max-w-[70px]",
                  "w-full",
                  "border-[1px]",
                  "rounded-full",
                  "border-black"
                )}
              />
              <Button intent={ButtonIntent.Secondary} round>
                upload profile pic
              </Button>
            </div>
          </div>
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
    </AppLayout>
  );
};

export default SignupPage;

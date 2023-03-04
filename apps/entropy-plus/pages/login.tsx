import { Button, ButtonIntent, Form, Icon, IconName, TextInput } from "dsl";
import { observer } from "mobx-react-lite";
import { css } from "utils";
import { LoginDto } from "../interfaces";
import AppStore from "../store/App.store";

const Login = observer(() => {
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
      <Icon name={IconName.Logo} />
      <Form
        className={css("w-full", "flex", "flex-col", "gap-4", "max-w-sm")}
        onSubmit={({ username, password }: LoginDto) =>
          AppStore.auth.login({ username, password })
        }
      >
        <TextInput
          name={"username"}
          block
          placeholder={"username"}
          rules={{ required: true }}
        />
        <TextInput
          type={"password"}
          name={"password"}
          block
          placeholder={"password"}
          rules={{ required: true }}
        />
        <div className={css("flex", "justify-center")}>
          <Button intent={ButtonIntent.Secondary} submit>
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
});

export default Login;

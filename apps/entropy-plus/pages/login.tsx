import {
  Button,
  ButtonIntent,
  Form,
  Icon,
  IconName,
  Submit,
  TextInput,
} from "dsl";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { css } from "utils";
import Dev from "../environment/Dev";
import LoginStore from "../store/Login.store";

const Login = observer(() => {
  const store = useMemo(() => new LoginStore(), []);
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
        onSubmit={() => store.login()}
      >
        <TextInput
          block
          name={"username"}
          placeholder={"username"}
          rules={{ required: true }}
          value={store.username}
          onChange={(value) => (store.username = value)}
        />
        <TextInput
          block
          type={"password"}
          name={"password"}
          placeholder={"password"}
          rules={{ required: true }}
          value={store.password}
          onChange={(value) => (store.password = value)}
        />
        <div className={css("flex", "justify-center")}>
          <Submit intent={ButtonIntent.Secondary} loading={store.isLoading}>
            Login
          </Submit>
        </div>
        <Dev>
          <div className={css("justify-center", "flex")}>
            <Button
              intent={ButtonIntent.Green}
              onClick={() => store.setGCreds()}
            >
              g
            </Button>
          </div>
        </Dev>
      </Form>
    </div>
  );
});

export default Login;

import { Button, ButtonIntent, Form, Icon, IconName, TextInput } from "dsl";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { css } from "utils";
import { LoginPayload } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import LoginStore from "../store/Login.store";

const Login = observer(() => {
  const store = useMemo(() => new LoginStore(), []);
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
        <Icon name={IconName.Logo} />
        <Form
          className={css("w-full", "flex", "flex-col", "gap-4", "max-w-sm")}
          onSubmit={({ username, password }: LoginPayload) =>
            store.onSubmit(username, password)
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
    </AppLayout>
  );
});

export default Login;

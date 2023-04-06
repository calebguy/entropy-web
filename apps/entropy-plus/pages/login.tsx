import { ButtonIntent, Form, Icon, IconName, Submit, TextInput } from "dsl";
import { observer } from "mobx-react-lite";
import Router from "next/router";
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
        onSubmit={({ username, password }: LoginDto) => {
          const lowercaseUsername = username.toLowerCase();
          // we'll probably have to change this and check if lowercase is the correct format
          return AppStore.auth
            .login({ username: lowercaseUsername, password })
            .then(() => {
              return Router.push("/sort");
            });
        }}
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
          <Submit intent={ButtonIntent.Secondary}>Login</Submit>
        </div>
      </Form>
    </div>
  );
});

export default Login;

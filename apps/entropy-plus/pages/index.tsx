import { ButtonIntent, Form, Submit, Text, TextInput, TextSize } from "dsl";
import Image from "next/image";
import { useState } from "react";
import { css } from "utils";
import AppLayout from "../layouts/App.layout";
import { HttpForClient } from "../services/Http";

export default function Web() {
  return (
    <AppLayout>
      <div className={css("flex", "items-center", "h-full", "flex-col")}>
        <div className={css("grow", "relative", "w-full")}>
          <Image
            className={css("object-contain")}
            src={"/images/rotating-logo.gif"}
            alt={"logo-rotation-magic"}
            fill
          />
        </div>
        <div className={css("w-full")}>
          <JoinWaitlist />
        </div>
      </div>
    </AppLayout>
  );
}

const JoinWaitlist = () => {
  const [view, setView] = useState("form");
  if (view === "form") {
    return (
      <div className={css("flex", "flex-col", "items-center", "gap-2")}>
        <Text size={TextSize.Lg}>Join the waitlist</Text>
        <Form
          onSubmit={(values) =>
            HttpForClient.joinWaitlist(values.email).then(() =>
              setView("success")
            )
          }
          className={css("flex", "flex-col", "gap-2")}
        >
          <TextInput
            name={"email"}
            placeholder={"enter your email"}
            rules={{
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            }}
          />
          <Submit intent={ButtonIntent.Secondary}>sign up</Submit>
        </Form>
      </div>
    );
  } else if (view == "success") {
    return (
      <div className={css("text-center")}>
        <Text size={TextSize.Lg}>Thanks for subscribing!</Text>
      </div>
    );
  }
  return <></>;
};

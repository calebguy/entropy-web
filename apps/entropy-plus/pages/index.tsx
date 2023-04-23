import {
  Button,
  ButtonIntent,
  ButtonSize,
  Form,
  Icon,
  IconName,
  Submit,
  Text,
  TextInput,
  TextIntent,
  TextSize,
} from "dsl";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { css } from "utils";
import AppLayout from "../layouts/App.layout";
import { HttpForClient } from "../services/Http";
import AppStore from "../store/App.store";

const Web = observer(() => {
  return (
    <AppLayout>
      <div className={css("flex", "items-center", "h-full", "flex-col")}>
        <div className={css("grow", "relative", "w-full")}>
          {!AppStore.auth.isLoggedIn && (
            <Image
              className={css("object-contain", "-ml-6")}
              src={"/images/rotating-logo.gif"}
              alt={"logo-rotation-magic"}
              fill
            />
          )}
          {AppStore.auth.isLoggedIn && (
            <div
              className={css(
                "absolute",
                "w-full",
                "h-full",
                "flex",
                "justify-center",
                "items-center"
              )}
            >
              <Link href={"/sort"}>
                <Button
                  interactive
                  size={ButtonSize.Lg}
                  intent={ButtonIntent.Primary}
                >
                  <div
                    className={css(
                      "flex",
                      "flex-col",
                      "items-center",
                      "gap-1.5"
                    )}
                  >
                    <Icon name={IconName.Logo} fill={"white"} />
                    <Text intent={TextIntent.White}>welcome</Text>
                  </div>
                </Button>
              </Link>
            </div>
          )}
        </div>
        {/* <div className={css("w-full")}>
          <JoinWaitlist />
        </div> */}
      </div>
    </AppLayout>
  );
});

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

export default Web;

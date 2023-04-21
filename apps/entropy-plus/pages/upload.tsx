import { ButtonSize, Form, Submit, Text, TextIntent } from "dsl";
import MediaInput from "dsl/src/Form/MediaInput";
import { observer } from "mobx-react-lite";
import Router from "next/router";
import { useState } from "react";
import { css } from "utils";
import withAuth from "../helpers/auth";
import AppLayout from "../layouts/App.layout";
import { HttpForClient } from "../services/Http";

interface UploadPageProps {}

const UploadPage = observer(({}: UploadPageProps) => {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <AppLayout>
      <div className={css("h-full", "flex", "items-center")}>
        <Form
          onSubmit={({ image }) => {
            setShowMessage(false);
            return HttpForClient.postImage(image[0])
              .then(({ data }) => {
                Router.push("/sort");
              })
              .catch(() => {
                setShowMessage(true);
              });
          }}
          className={css("flex", "justify-center", "w-full")}
        >
          <div
            className={css(
              "max-w-lg",
              "w-full",
              "flex",
              "flex-col",
              "gap-4",
              "min-h-[500px]"
            )}
          >
            <div className={css("grow", "flex", "items-stretch")}>
              <MediaInput
                name={"image"}
                buttonLabel={"Choose Image from Library"}
              />
            </div>
            {showMessage && (
              <Text intent={TextIntent.Error}>Error submiting image</Text>
            )}
            <Submit size={ButtonSize.Lg} block>
              Upload
            </Submit>
          </div>
        </Form>
      </div>
    </AppLayout>
  );
});

export const getServerSideProps = withAuth<UploadPageProps>(async (context) => {
  return {
    props: {},
  };
});

export default UploadPage;

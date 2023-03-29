import { ButtonIntent, ButtonSize, Form, Submit, TextInput } from "dsl";
import MediaInput from "dsl/src/Form/MediaInput";
import { css } from "utils";
import AppLayout from "../layouts/App.layout";
import { HttpForClient } from "../services/Http";

const UploadPage = () => {
  return (
    <AppLayout>
      <div className={css("h-full")}>
        <Form
          onSubmit={(vals) => {
            return HttpForClient.postImage(vals.image, vals.source).then(
              ({ data }) => {
                console.log("data", data);
              }
            );
          }}
          className={css(
            "grid",
            "grid-cols-1",
            "md:grid-cols-2",
            "grid-rows-3",
            "md:grid-rows-1",
            "h-full",
            "gap-x-8"
          )}
        >
          <div
            className={css(
              "flex",
              "items-stretch",
              "justify-center",
              "md:py-44",
              "row-span-2",
              "md:row-span-1"
            )}
          >
            <MediaInput
              name={"image"}
              buttonLabel={"Choose Image from Library"}
            />
          </div>
          <div className={css("flex", "flex-col", "justify-center", "gap-1")}>
            <TextInput
              name={"creator"}
              label={"Curator"}
              // rules={{ required: true }}
              block
            />
            <TextInput
              name={"source"}
              label={"Source"}
              rules={{ required: true }}
              block
            />
            <TextInput
              name={"description"}
              label={"Description"}
              // rules={{ required: true }}
              block
            />
            <div className={css("mt-2")}>
              <Submit intent={ButtonIntent.Gray} size={ButtonSize.Lg} block>
                Confirm
              </Submit>
            </div>
          </div>
        </Form>
      </div>
    </AppLayout>
  );
};

export default UploadPage;

import Image from "next/image";
import { useState } from "react";
import { Button, ButtonIntent, Text, TextSize } from "ui";
import AspectRatioDemo from "../components/demos/AspectRatio.demo";
import ButtonDemo from "../components/demos/Button.demo";
import FormDemo from "../components/demos/Form.demo";
import IconDemo from "../components/demos/Icon.demo";
import PaneDemo from "../components/demos/Pane.demo";
import PillDemo from "../components/demos/Pill.demo";
import SpinnerDemo from "../components/demos/Spinner.demo";
import TextDemo from "../components/demos/Text.demo";
import TextFieldDemo from "../components/demos/TextField.demo";
import DisplayContext from "../state/DisplayContext";

export default function Docs() {
  const [showProps, setShowProps] = useState(true);
  return (
    <DisplayContext.Provider value={{ showProps, setShowProps }}>
      <main className="p-4 flex justify-center">
        <div className="max-w-2xl w-full flex flex-col gap-4">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <LogoSpin />
              <Text size={TextSize.Xl} bold>
                DSL
              </Text>
              <LogoSpin />
            </div>
          </div>
          <div>
            <Button
              intent={ButtonIntent.Secondary}
              round
              onClick={() => setShowProps(!showProps)}
            >
              {showProps ? "- props" : "+ props"}
            </Button>
          </div>
          <ButtonDemo />
          <PillDemo />
          <TextDemo />
          <PaneDemo />
          <TextFieldDemo />
          <FormDemo />
          <AspectRatioDemo />
          <IconDemo />
          <SpinnerDemo />
        </div>
      </main>
    </DisplayContext.Provider>
  );
}

const LogoSpin = () => {
  return (
    <Image
      alt={"logo-spin"}
      src={"/images/logo-rotate.gif"}
      width={55}
      height={55}
    />
  );
};

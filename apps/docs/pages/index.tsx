import Image from "next/image";
import { useState } from "react";
import { Button, ButtonIntent, Text, TextSize } from "ui";
import AspectRatioDemo from "../components/AspectRatio.demo";
import ButtonDemo from "../components/Button.demo";
import FormDemo from "../components/Form.demo";
import PaneDemo from "../components/Pane.demo";
import TextDemo from "../components/Text.demo";
import TextFieldDemo from "../components/TextField.demo";
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
              <Text size={TextSize.Xl}>DSL</Text>
              <LogoSpin />
            </div>
          </div>
          <div>
            <Button
              intent={ButtonIntent.Secondary}
              round
              onClick={() => setShowProps(!showProps)}
            >
              {showProps ? "-" : "+"}
            </Button>
          </div>
          <ButtonDemo />
          <TextDemo />
          <PaneDemo />
          <TextFieldDemo />
          <FormDemo />
          <AspectRatioDemo />
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

import Image from "next/image";
import { useState } from "react";
import { Button, ButtonIntent, ButtonSize } from "ui";
import ButtonDemo from "../components/ButtonDemo";
import PaneDemo from "../components/PaneDemo";
import TextDemo from "../components/TextDemo";
import DisplayContext from "../state/DisplayContext";

export default function Docs() {
  const [showProps, setShowProps] = useState(false);
  return (
    <DisplayContext.Provider value={{ showProps, setShowProps }}>
      <main className="p-4 flex justify-center">
        <div className="max-w-2xl w-full flex flex-col gap-4">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <LogoSpin />
              <Button
                onClick={() => setShowProps(!showProps)}
                intent={ButtonIntent.Secondary}
                size={ButtonSize.Lg}
              >
                DSL
              </Button>
              <LogoSpin />
            </div>
          </div>
          <ButtonDemo />
          <TextDemo />
          <PaneDemo />
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

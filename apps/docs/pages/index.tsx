import { Button, ButtonIntent, ButtonSize, Text, TextSize } from "ui";
import Demo from "../components/Demo";
import SubDemo from "../components/SubDemo";

export default function Docs() {
  return (
    <main className="p-4 flex justify-center">
      <div className="max-w-2xl w-full flex flex-col gap-4">
        <div className="text-center">
          <Text bold size={TextSize.Lg}>
            DSL
          </Text>
        </div>
        <Demo title={"Button"}>
          <div className="grid grid-cols-4">
            <div>
              <SubDemo title={"Primary"}>
                <Button>
                  <Text>Primary</Text>
                </Button>
              </SubDemo>
              <SubDemo title={"Primary (Round)"}>
                <Button round>
                  <Text>Primary</Text>
                </Button>
              </SubDemo>
              <SubDemo title={"Primary Lg"}>
                <Button size={ButtonSize.Lg} round>
                  <Text>Primary</Text>
                </Button>
              </SubDemo>
            </div>
            <div>
              <SubDemo title={"Secondary"}>
                <Button intent={ButtonIntent.Secondary}>
                  <Text>Secondary</Text>
                </Button>
              </SubDemo>
              <SubDemo title={"Secondary (Round)"}>
                <Button round intent={ButtonIntent.Secondary}>
                  <Text>Secondary</Text>
                </Button>
              </SubDemo>
              <SubDemo title={"Secondary Lg"}>
                <Button
                  size={ButtonSize.Lg}
                  round
                  intent={ButtonIntent.Secondary}
                >
                  <Text>Secondary</Text>
                </Button>
              </SubDemo>
            </div>
            <div>
              <SubDemo title={"Green"}>
                <Button intent={ButtonIntent.Green}>
                  <Text>Green</Text>
                </Button>
              </SubDemo>
              <SubDemo title={"Green (Round)"}>
                <Button round intent={ButtonIntent.Green}>
                  <Text>Green</Text>
                </Button>
              </SubDemo>
              <SubDemo title={"Green Lg"}>
                <Button size={ButtonSize.Lg} round intent={ButtonIntent.Green}>
                  <Text>Green</Text>
                </Button>
              </SubDemo>
            </div>
          </div>
        </Demo>
        <Demo title={"Text"}>
          <Text>I love this bar!</Text>
        </Demo>
      </div>
    </main>
  );
}

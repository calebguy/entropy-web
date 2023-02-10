import { Button, Text, TextSize } from "ui";
import Demo from "../components/Demo";

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
          <Button>
            <Text>I love this place!</Text>
          </Button>
        </Demo>
        <Demo title={"Text"}>
          <Text>I love this bar!</Text>
        </Demo>
      </div>
    </main>
  );
}

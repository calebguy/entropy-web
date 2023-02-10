import { Text, TextSize } from "ui";
import ButtonDemo from "../components/ButtonDemo";
import TextDemo from "../components/TextDemo";

export default function Docs() {
  return (
    <main className="p-4 flex justify-center">
      <div className="max-w-2xl w-full flex flex-col gap-4">
        <div className="text-center">
          <Text bold size={TextSize.Lg}>
            DSL
          </Text>
        </div>
        <ButtonDemo />
        <TextDemo />
      </div>
    </main>
  );
}

import { Text, TextIntent, TextSize } from "dsl";
import { css } from "utils";
import AppLayout from "../layouts/App.layout";

export default function Web() {
  return (
    <AppLayout>
      <div className={css("flex", "items-center", "h-full")}>
        <div className={css("flex", "flex-wrap")}>
          {new Array(342).fill(undefined).map((_, index) => (
            <Text
              key={`e-plus-${index}`}
              intent={TextIntent.Outline}
              size={TextSize.Xxl}
              bold
            >
              + {index === 177 && "entropy"}
            </Text>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

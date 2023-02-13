import { Text, TextIntent, TextSize } from "dsl";
import { css } from "utils";
import AuthedLayout from "../layouts/Authed.layout";

export default function Web() {
  return (
    <AuthedLayout>
      <div className={css("flex", "items-center", "h-full")}>
        <div className={css("flex", "flex-wrap")}>
          {new Array(500).fill(undefined).map((_, index) => (
            <Text intent={TextIntent.Outline} size={TextSize.Xl} bold>
              + {index === 250 && "entropy"}
            </Text>
          ))}
        </div>
      </div>
    </AuthedLayout>
  );
}

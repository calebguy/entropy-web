import { Text, TextIntent, TextSize } from "ui";
import { css } from "utils";
import Demo from "./Demo";
import SubDemo from "./SubDemo";
const text = Object.values(TextIntent).map((intent) => ({
  intent,
  children: intent,
}));

const sizes = Object.values(TextSize).map;

const TextDemo = () => {
  return (
    <Demo title={"Text"}>
      <div
        className={css(
          "grid",
          "grid-cols-1",
          "sm:grid-cols-2",
          "md:grid-cols-3",
          "gap-y-8"
        )}
      >
        {text.map((item, index) => (
          <div
            key={`text-demo-${item.intent}-${index}`}
            className={css("rounded-md", "p-2", {
              "bg-black": item.intent === TextIntent.White,
            })}
          >
            {Object.values(TextSize).map((size) => (
              <SubDemo
                key={`text-demo-sub-demo-${size}-${item.intent}`}
                labels={{ size }}
              >
                <Text intent={item.intent} size={size}>
                  {item.children}
                </Text>
              </SubDemo>
            ))}
          </div>
        ))}
      </div>
    </Demo>
  );
};

export default TextDemo;

import { Pill, PillIntent } from "dsl";
import { css } from "utils";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const pills = Object.values(PillIntent).map((intent) => ({
  intent,
  children: intent,
}));

const PillDemo = () => {
  return (
    <Demo title={"Pill"}>
      <div className={css("flex", "gap-2")}>
        {pills.map((item) => (
          <SubDemo key={`pill-${item.intent}`}>
            <Pill intent={item.intent}>{item.children}</Pill>
          </SubDemo>
        ))}
      </div>
    </Demo>
  );
};

export default PillDemo;

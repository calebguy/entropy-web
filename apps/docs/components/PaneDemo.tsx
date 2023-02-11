import { Text, TextIntent } from "ui";
import Pane, { PaneIntent, PaneSize } from "ui/Pane/Pane";
import { css } from "utils";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const PaneDemo = () => {
  return (
    <Demo title={"Pane"}>
      <div className={css("flex", "flex-col", "gap-2")}>
        <SubDemo labels={{ size: PaneSize.Sm }}>
          <Pane intent={PaneIntent.Primary}>
            <Text>{PaneIntent.Primary}</Text>
          </Pane>
        </SubDemo>
        <SubDemo labels={{ size: PaneSize.Lg }}>
          <Pane intent={PaneIntent.Primary} size={PaneSize.Lg}>
            <Text>{PaneIntent.Primary}</Text>
          </Pane>
        </SubDemo>
        <SubDemo labels={{ size: PaneSize.Sm }}>
          <Pane intent={PaneIntent.Secondary}>
            <Text intent={TextIntent.White}>{PaneIntent.Secondary}</Text>
          </Pane>
        </SubDemo>
        <SubDemo labels={{ size: PaneSize.Lg }}>
          <Pane intent={PaneIntent.Secondary} size={PaneSize.Lg}>
            <Text intent={TextIntent.White}>{PaneIntent.Secondary}</Text>
          </Pane>
        </SubDemo>
      </div>
    </Demo>
  );
};

export default PaneDemo;

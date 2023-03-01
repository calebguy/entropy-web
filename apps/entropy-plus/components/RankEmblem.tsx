import { Text } from "dsl";
import { css } from "utils";

const RankEmblem = ({ rank }: { rank: number }) => {
  return (
    <div
      className={css(
        "border-[1px]",
        "border-black",
        "rounded-full",
        "w-[30px]",
        "h-[30px]",
        "flex",
        "justify-center",
        "items-center"
      )}
    >
      <Text>{rank}</Text>
    </div>
  );
};

export default RankEmblem;

import { Pane, PaneSize, Text, TextSize } from "dsl";
import { css, formatWithThousandsSeparators } from "utils";
import { Profile } from "../interfaces/index";
import ProfileIcon from "./ProfileIcon";
import RankEmblem from "./RankEmblem";

interface LeaderboardProps {
  leaderBoard: Profile[];
}

const Leaderboard = ({ leaderBoard: curators }: LeaderboardProps) => {
  return (
    <div>
      <div className={css("flex", "justify-between", "items-center")}>
        <div className={css("gap-4", "flex", "ml-4")}>
          <Text>rank</Text>
          <Text>curator</Text>
        </div>
        <div className={css("text-right")}>
          <Text>Entropy score</Text>
        </div>
      </div>
      <div className={css("flex", "flex-col", "gap-2")}>
        {curators.map((curator, index) => {
          let scoreTextSize;
          if (index === 0) {
            scoreTextSize = TextSize.Xl;
          } else if (index === 1) {
            scoreTextSize = TextSize.Lg;
          } else {
            scoreTextSize = TextSize.Md;
          }
          return (
            <Pane key={`${curator.handle}-${index}`} size={PaneSize.Lg} block>
              <div className={css("flex", "justify-between", "gap-4")}>
                <div
                  className={css("col-span-4", "flex", "items-center", "gap-4")}
                >
                  <div className={css("flex", "items-center")}>
                    <RankEmblem rank={index + 1} />
                  </div>
                  <div className={css("flex", "items-center", "gap-2")}>
                    <ProfileIcon profile={curator} />
                    <Text>@{curator.handle}</Text>
                  </div>
                </div>
                {curator.entropy_score !== null &&
                  curator.entropy_score !== undefined && (
                    <div
                      className={css(
                        "flex",
                        "items-center",
                        "justify-end",
                        "col-span-2",
                        "overflow-hidden"
                      )}
                    >
                      <Text size={scoreTextSize}>
                        {formatWithThousandsSeparators(curator.entropy_score)}
                      </Text>
                    </div>
                  )}
              </div>
            </Pane>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;

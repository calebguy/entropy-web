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
      <div className={css("grid", "grid-cols-6", "gap-2")}>
        <div className={css("col-span-1", "ml-4")}>
          <Text>rank</Text>
        </div>
        <div className={css("col-span-3", "ml-2")}>
          <Text>curator</Text>
        </div>
        <div className={css("col-span-2")}>
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
            <Pane size={PaneSize.Lg} block>
              <div className={css("grid", "grid-cols-6", "gap-2")}>
                <div className={css("flex", "items-center", "col-span-1")}>
                  <RankEmblem rank={index + 1} />
                </div>
                <div
                  className={css("flex", "items-center", "gap-2", "col-span-3")}
                >
                  <ProfileIcon profile={curator} />
                  <Text>@{curator.handle}</Text>
                </div>
                {curator.entropy_score !== null &&
                  curator.entropy_score !== undefined && (
                    <div className={css("flex", "items-center", "col-span-2")}>
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

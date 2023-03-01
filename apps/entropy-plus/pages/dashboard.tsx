import {
  AspectRatio,
  Button,
  ButtonIntent,
  Pane,
  PaneSize,
  Text,
  TextSize,
} from "dsl";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { css, formatWithThousandsSeparators, objectKeys } from "utils";
import AcheivementPill from "../components/AcheivementPill";
import Leaderboard from "../components/Leaderboard";
import ProfileIcon from "../components/ProfileIcon";
import RankEmblem from "../components/RankEmblem";
import { GetDashboardResponse } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import Http from "../services/Http";

interface DashboardPageProps extends GetDashboardResponse {}

const DashboardPage = ({
  profile,
  rankedCurators,
  suggestedPhotos,
  userInvitesCount,
  curatedPhotosCount,
  allPhotosCount,
  rank,
  acheivements,
}: DashboardPageProps) => {
  return (
    <AppLayout>
      <div className={css("flex", "flex-col", "gap-2")}>
        {!!userInvitesCount && (
          <Pane size={PaneSize.Lg} block>
            <div
              className={css(
                "flex",
                "justify-between",
                "items-center",
                "gap-2"
              )}
            >
              <Text>Invite {userInvitesCount} friends to join entropy+</Text>
              <Link href={"/users/invite"}>
                <Button intent={ButtonIntent.Orange} round>
                  invite
                </Button>
              </Link>
            </div>
          </Pane>
        )}
        <Pane size={PaneSize.Lg} block>
          <div className={css("flex", "flex-col", "gap-2")}>
            <div className={css("flex", "justify-between")}>
              <Text>rank</Text>
              <Text>Entropy Score</Text>
            </div>
            <Pane size={PaneSize.Lg} block>
              <div className={css("flex", "items-center", "justify-between")}>
                <div className={css("flex", "items-center", "gap-2")}>
                  <RankEmblem rank={rank} />
                  <ProfileIcon profile={profile} />
                  <Text>@{profile.name}</Text>
                </div>
                <Text size={TextSize.Xl} bold>
                  {profile.entropy_score &&
                    formatWithThousandsSeparators(profile.entropy_score)}
                </Text>
              </div>
            </Pane>
            {objectKeys(acheivements).length > 0 && (
              <div
                className={css("flex", "items-center", "gap-2", "flex-wrap")}
              >
                {objectKeys(acheivements)
                  .filter((key) => !!acheivements[key])
                  .map((key) => (
                    <AcheivementPill acheivement={key} />
                  ))}
              </div>
            )}
          </div>
        </Pane>
        <div className={css("flex", "items-stretch", "gap-2")}>
          <Pane size={PaneSize.Lg} block>
            <div className={css("flex", "flex-col", "items-center", "gap-2")}>
              <Text>You have seen</Text>
              <div className={css("text-center")}>
                <Text size={TextSize.Xl}>{allPhotosCount} images</Text>
              </div>
            </div>
          </Pane>
          <Pane size={PaneSize.Lg} block>
            <div className={css("flex", "flex-col", "items-center", "gap-2")}>
              <Text>Images curated</Text>
              <div className={css("text-center")}>
                <Text size={TextSize.Xl}>{curatedPhotosCount}</Text>
              </div>
            </div>
          </Pane>
        </div>
        <div className={css("flex", "gap-2")}>
          <Pane size={PaneSize.Lg} block>
            <div className={css("text-center")}>
              <Text>Your upcoming tweets</Text>
            </div>
          </Pane>
          <Pane size={PaneSize.Lg} block>
            <div className={css("text-center")}>
              <Text>Queue</Text>
            </div>
          </Pane>
        </div>
        <div>
          <div className={css("my-2")}>
            <Text size={TextSize.Lg}>Images you may like...</Text>
          </div>
          <Pane size={PaneSize.Lg} block>
            <div className={css("flex", "flex-wrap", "gap-2")}>
              {suggestedPhotos.map((photo) => (
                // @next -- where should this link to
                <Link
                  href={`/sort`}
                  className={css("inline-block", "max-w-[150px]", "w-full")}
                >
                  <AspectRatio
                    ratio={"1/1"}
                    className={css(
                      "bg-cover",
                      "bg-center",
                      "bg-no-repeat",
                      "rounded-md"
                    )}
                    style={{ backgroundImage: `url(${photo.image?.url})` }}
                  />
                </Link>
              ))}
            </div>
            <Link href={"/sort"} className={css("mt-2", "inline-block")}>
              <Button intent={ButtonIntent.Secondary} round>
                explore
              </Button>
            </Link>
          </Pane>
        </div>
        <div>
          <div className={css("my-2")}>
            <Text size={TextSize.Lg}>How are you doing?</Text>
          </div>
          <Pane size={PaneSize.Lg} block>
            <div>
              <Leaderboard curators={rankedCurators} />
              <div className={css("mt-2", "flex", "justify-center")}>
                <Link href={"/leaderboard"}>
                  <Button intent={ButtonIntent.Secondary} round>
                    view leaderboard
                  </Button>
                </Link>
              </div>
            </div>
          </Pane>
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps<
  DashboardPageProps
> = async () => {
  const { data } = await Http.getDashboard();
  return {
    props: {
      ...data,
    },
  };
};

export default DashboardPage;

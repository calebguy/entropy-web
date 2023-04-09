import {
  AspectRatio,
  Button,
  ButtonIntent,
  Pane,
  PaneSize,
  Text,
  TextSize,
} from "dsl";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useMemo } from "react";
import { css } from "utils";
import Leaderboard from "../components/Leaderboard";
import ProfileIcon from "../components/ProfileIcon";
import RankEmblem from "../components/RankEmblem";
import withAuth from "../helpers/auth";
import { Photo, Profile } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import { HttpForServer, getSuggestedPhotos } from "../services/Http";
import AppStore from "../store/App.store";
import DashboardPageStore from "../store/DashboardPage.store";

interface DashboardPageProps {
  suggestedPhotos: Photo[];
  userInvitesCount: number;
  leaderBoard: Profile[];
}

const DashboardPage = observer(
  ({ suggestedPhotos, userInvitesCount, leaderBoard }: DashboardPageProps) => {
    const store = useMemo(() => new DashboardPageStore(leaderBoard), []);
    return (
      <AppLayout profile={AppStore.auth.profile!}>
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
                <Link href={"https://entropyplus.xyz/users/invite"}>
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
                    <RankEmblem rank={store.rank} />
                    <ProfileIcon profile={AppStore.auth.profile!} />
                    <Text>@{AppStore.auth.profile?.handle}</Text>
                  </div>
                  {AppStore.auth.profile?.seen_feed_images ? (
                    <Text size={TextSize.Xl}>
                      {AppStore.auth.profile?.entropy_score}
                    </Text>
                  ) : (
                    <Text>Loading...</Text>
                  )}
                </div>
              </Pane>
              {/* {objectKeys(acheivements).length > 0 && (
                <div
                  className={css("flex", "items-center", "gap-2", "flex-wrap")}
                >
                  {objectKeys(acheivements)
                    .filter((key) => !!acheivements[key])
                    .map((key, index) => (
                      <AcheivementPill
                        key={`${key}-${index}`}
                        acheivement={key}
                      />
                    ))}
                </div>
              )} */}
            </div>
          </Pane>
          <div className={css("flex", "items-stretch", "gap-2")}>
            <Pane size={PaneSize.Lg} block>
              <div className={css("flex", "flex-col", "items-center", "gap-2")}>
                <Text>You have seen</Text>
                <div className={css("text-center")}>
                  {AppStore.auth.profile?.seen_feed_images ? (
                    <Text size={TextSize.Xl}>
                      {AppStore.auth.profile?.seen_feed_images} images
                    </Text>
                  ) : (
                    <Text>No images have been seen yet.</Text>
                  )}
                </div>
              </div>
            </Pane>
            <Pane size={PaneSize.Lg} block>
              <div className={css("flex", "flex-col", "items-center", "gap-2")}>
                <Text>Images curated</Text>
                <div className={css("text-center")}>
                  {AppStore.auth.profile?.liked_feed_images ? (
                    <Text size={TextSize.Xl}>
                      {AppStore.auth.profile?.liked_feed_images} images
                    </Text>
                  ) : (
                    <Text>Loading...</Text>
                  )}
                </div>
              </div>
            </Pane>
          </div>
          {/* <div className={css("flex", "gap-2")}>
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
          </div> */}
          <div>
            <div className={css("my-2")}>
              <Text size={TextSize.Lg}>Images you may like...</Text>
            </div>
            <Pane size={PaneSize.Lg} block>
              {suggestedPhotos ? (
                <div className={css("flex", "flex-wrap", "gap-2")}>
                  {suggestedPhotos.map((photo, index) => (
                    // @next -- where should this link to
                    <Link
                      key={`${photo.image?.url}-${index}`}
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
                        style={{ backgroundImage: `url(${photo.url})` }}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <Text>Loading...</Text>
              )}
              <Link href={"/sort"} className={css("mt-2", "inline-block")}>
                <Button intent={ButtonIntent.Secondary} round>
                  Explore
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
                <Leaderboard leaderBoard={leaderBoard.slice(0, 3)} />
                <div className={css("mt-2", "flex", "justify-center")}>
                  <Link href={"/leaderboard"}>
                    <Button intent={ButtonIntent.Secondary} round>
                      View leaderboard
                    </Button>
                  </Link>
                </div>
              </div>
            </Pane>
          </div>
          <Pane size={PaneSize.Lg} block>
            <div className={css("mt-2", "flex", "justify-center")}>
              <Link href={"/upload"}>
                <Button intent={ButtonIntent.Secondary} round>
                  Upload images
                </Button>
              </Link>
            </div>
          </Pane>
        </div>
      </AppLayout>
    );
  }
);

export const getServerSideProps = withAuth<any>(async () => {
  const { data: leaderBoard } = await HttpForServer._getLeaderboard();
  console.log(leaderBoard[0]);
  const { data: suggestedPhotos } = await getSuggestedPhotos();

  return {
    props: {
      suggestedPhotos,
      leaderBoard,
    },
  };
});

export default DashboardPage;

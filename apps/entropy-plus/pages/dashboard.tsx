import {
  Button,
  ButtonIntent,
  Icon,
  IconName,
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
import LoadingImage from "../components/LoadingImage";
import ProfileIcon from "../components/ProfileIcon";
import RankEmblem from "../components/RankEmblem";
import withAuth from "../helpers/auth";
import { Photo, Profile } from "../interfaces";
import AppLayout from "../layouts/App.layout";
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
      <AppLayout>
        <div className={css("flex", "flex-col", "gap-2.5")}>
          <ProfileMetrics store={store} />
          <ImageSuggestions suggestedPhotos={suggestedPhotos} />
          <ProfileLeaderboard leaderBoard={leaderBoard} />
          <UploadImages />
        </div>
      </AppLayout>
    );
  }
);

const ProfileMetrics = observer(({ store }: { store: DashboardPageStore }) => {
  return (
    <div className={css("flex", "flex-col", "gap-2")}>
      <Pane size={PaneSize.Lg} block>
        <div className={css("flex", "flex-col", "gap-2")}>
          <div className={css("flex", "justify-between", "px-4")}>
            <Text>rank</Text>
            <div className={css("flex", "gap-0.5")}>
              <Text>Entropy Score</Text>

              <Link
                target="_blank"
                href={
                  "https://twitter.com/entropy____plus/status/1586860562406936582"
                }
              >
                <Icon name={IconName.Info} size={12} />
              </Link>
            </div>
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
        </div>
      </Pane>
      <div
        className={css(
          "flex",
          "items-stretch",
          "gap-2",
          "flex-col",
          "xs:flex-row"
        )}
      >
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
    </div>
  );
});

const ImageSuggestions = observer(
  ({ suggestedPhotos }: { suggestedPhotos: Photo[] }) => {
    return (
      <div>
        <div className={css("mb-2")}>
          <Text size={TextSize.Lg}>Images you may like...</Text>
        </div>
        <Pane size={PaneSize.Lg} block>
          {suggestedPhotos ? (
            <div
              className={css("grid", "grid-cols-2", "sm:grid-cols-4", "gap-2")}
            >
              {suggestedPhotos.map((photo, index) => (
                <Link
                  href={`/image/${photo.id}`}
                  key={`suggested-${index}-${photo.url}`}
                >
                  <LoadingImage photo={photo} />
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
    );
  }
);

const ProfileLeaderboard = observer(
  ({ leaderBoard }: { leaderBoard: Profile[] }) => {
    return (
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
    );
  }
);

const UploadImages = observer(() => {
  return (
    <Pane size={PaneSize.Lg} block>
      <div className={css("flex", "justify-center")}>
        <Link href={"/upload"}>
          <Button intent={ButtonIntent.Secondary} round>
            Upload images
          </Button>
        </Link>
      </div>
    </Pane>
  );
});

export const getServerSideProps = withAuth<DashboardPageProps>(
  async (_, Http) => {
    const { data: leaderBoard } = await Http.getLeaderboard();
    const { data: suggestedPhotos } = await Http.getSuggestedPhotos();
    return {
      props: {
        suggestedPhotos,
        leaderBoard,
        userInvitesCount: 0,
      },
    };
  }
);

export default DashboardPage;

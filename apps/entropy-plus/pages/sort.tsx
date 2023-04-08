import {
  AspectRatio,
  Button,
  ButtonIntent,
  ButtonSize,
  Icon,
  IconName,
  Pane,
  PaneSize,
  Text,
  TextSize,
} from "dsl";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { css } from "utils";
import ProfileIcon from "../components/ProfileIcon";
import withAuth from "../helpers/auth";
import { Profile, Sort, TwitterChannel } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import { HttpForServer } from "../services/Http";
import AppStore from "../store/App.store";
import SortPageStore from "../store/SortPage.store";

interface SortPageProps {
  sort: Sort;
  currentChannel: TwitterChannel;
}

const SortPage = observer(({ sort, currentChannel }: SortPageProps) => {
  const store = useMemo(() => new SortPageStore(sort), []);
  useEffect(() => {
    store.init();
  }, []);

  return (
    <AppLayout profile={AppStore.auth.profile!}>
      <div className={css("flex", "flex-col", "h-full", "gap-4")}>
        <div
          className={css(
            "grow",
            "flex",
            "flex-col",
            "justify-center",
            "items-center",
            "sm:max-w-lg",
            "mx-auto",
            "w-full",
            "gap-2"
          )}
        >
          {store.sort?.curator && <UserPreview profile={store.sort.curator} />}
          <AspectRatio
            ratio={"1/1"}
            className={css(
              "mx-auto",
              "w-full",
              "border-[1px]",
              "border-black",
              "rounded-sm",
              "bg-cover",
              "bg-center",
              "bg-no-repeat"
            )}
            style={{ backgroundImage: `url(${store.sort?.url})` }}
          />
          <div className={css("self-start", "-my-1")}>
            <TwitterProfileSelector
              channels={AppStore.twitterChannels}
              currentChannel={currentChannel}
            />
          </div>
        </div>
        <div className={css("flex", "justify-around", "gap-4", "md:gap-24")}>
          {AppStore.auth.profile && (
            <Button
              onClick={() => store.handleReject()}
              size={ButtonSize.Lg}
              block
            >
              <Icon name={IconName.Close} />
            </Button>
          )}
          {AppStore.auth.profile && (
            <Button
              onClick={() => store.handleApprove()}
              size={ButtonSize.Lg}
              block
            >
              <Icon name={IconName.Heart} />
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
});

const TwitterChannelIcon = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <AspectRatio
      ratio={"1/1"}
      className={css(
        "rounded-full",
        "w-[28px]",
        "bg-cover",
        "bg-center",
        "border-[1px]",
        "border-black"
      )}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
  );
};

interface TwitterProfileSelectorProps {
  channels: TwitterChannel[];
  currentChannel: TwitterChannel;
}

const TwitterProfileSelector = ({
  channels,
  currentChannel,
}: TwitterProfileSelectorProps) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={css(
        "flex",
        "items-center",
        "gap-1",
        "border-[1px]",
        "p-1",
        "rounded-sm",
        { "border-black": show, "border-transparent": !show }
      )}
    >
      <button onClick={() => setShow(!show)} className={css()}>
        <TwitterChannelIcon imageUrl={currentChannel.profile_image_url} />
      </button>
      {show && (
        <>
          {channels
            .filter(
              (channel) => channel.screen_name !== currentChannel.screen_name
            )
            .map((channel) => (
              <Link
                className={css("hover:scale-105")}
                key={`twitter-channel-selector-${channel.screen_name}`}
                // @next -- @brian -- is this for switching channels or for classifying the presented image as belonging to the selected channel?
                href={"/sort"}
              >
                <TwitterChannelIcon imageUrl={channel.profile_image_url} />
              </Link>
            ))}
        </>
      )}
    </div>
  );
};

interface UserPreviewProps {
  profile: Profile;
}

const UserPreview = ({ profile }: UserPreviewProps) => {
  return (
    <Pane size={PaneSize.Sm} block>
      <div className={css("flex", "justify-between", "items-center")}>
        <div className={css("flex", "items-center", "gap-2")}>
          <ProfileIcon profile={profile} />
          <Text size={TextSize.Lg}>@{profile.name}</Text>
        </div>
        <Link href={`/curator/${profile.slug}`}>
          <Button size={ButtonSize.Sm} intent={ButtonIntent.Secondary} round>
            view profile
          </Button>
        </Link>
      </div>
    </Pane>
  );
};

export const getServerSideProps = withAuth<any>(async () => {
  try {
    const { data: me } = await HttpForServer.getMe();
    const { data: sorts } = await HttpForServer.getSortImage(me.handle);
    const sort = sorts[0];
    const { data: currentChannel } = await HttpForServer.getTwitterChannel(
      sort.twitter_channel
    );
    return {
      props: { sort, currentChannel },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
});

export default SortPage;

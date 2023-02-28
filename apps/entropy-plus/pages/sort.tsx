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
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { css } from "utils";
import ProfileIcon from "../components/ProfileIcon";
import { Photo, Profile, TwitterChannel } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import Http from "../services/Http";

interface SortPageProps {
  image: Photo;
  twitterChannels: TwitterChannel[];
  currentChannel: TwitterChannel;
}

const SortPage = ({
  twitterChannels,
  currentChannel,
  image,
}: SortPageProps) => {
  return (
    <AppLayout>
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
          {image.curator && <UserPreview profile={image.curator} />}
          <AspectRatio
            ratio={`${image.image?.width_field}/${image.image?.height_field}`}
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
            style={{ backgroundImage: `url(${image.url})` }}
          />
          <div className={css("self-start", "-my-1")}>
            <TwitterProfileSelector
              channels={twitterChannels}
              currentChannel={currentChannel}
            />
          </div>
        </div>
        <div className={css("flex", "justify-around", "gap-4", "md:gap-24")}>
          <Button size={ButtonSize.Lg} block>
            <Icon name={IconName.Close} />
          </Button>
          <Button size={ButtonSize.Lg} block>
            <Icon name={IconName.Heart} />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

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
                key={`twitter-channel-selector-${channel.profile_image_url}`}
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

export const getServerSideProps: GetServerSideProps<
  SortPageProps
> = async () => {
  const {
    data: { image, twitter_channels, current_channel },
  } = await Http.getSort();
  return {
    props: {
      image,
      currentChannel: current_channel,
      twitterChannels: twitter_channels,
    },
  };
};

export default SortPage;

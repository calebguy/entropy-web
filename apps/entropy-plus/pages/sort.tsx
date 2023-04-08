import {
  AspectRatio,
  Button,
  ButtonIntent,
  ButtonSize,
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
import { Photo, Profile, TwitterChannel } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import AppStore from "../store/App.store";
import SortPageStore from "../store/SortPage.store";

interface SortPageProps {
  image: Photo;
  twitterChannels: TwitterChannel[];
  currentChannel: TwitterChannel;
}

interface ImageData {
  id: number;
}

const SortPage = observer(({ twitterChannels }: SortPageProps) => {
  const store = useMemo(() => new SortPageStore(), []);
  useEffect(() => {
    store.init();
  }, []);

  const [image, setImage] = useState<Photo | null>(null);
  const [currentChannel, setcurrentChannel] = useState<TwitterChannel>({
    profile_image_url: "",
    screen_name: "",
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (AppStore.auth.profile) {
  //       const imageData = await getSortImageData(AppStore.auth.profile.handle);
  //       const returnedImage = imageData.image;
  //       setImage(returnedImage);
  //       const currentChannelResp = returnedImage.twitter_channel;
  //       const currentChannel = await getTwitterChannel(currentChannelResp);
  //       setcurrentChannel(currentChannel);
  //     }
  //   }
  //   fetchData()
  // }, []);

  // const PatchForServer = {
  //   patch: (url: string, data?: any) => axios.patch(url, data),
  //   // add other methods here as needed
  // };

  // const handleApproveImage = async () => {
  //   try {
  //     if (image) {
  //       const imageData: ImageData = { id: image.id };
  //       try {
  //         const getMe = AppStore.auth.profile?.handle;
  //         if (!getMe) {
  //           throw new Error("Profile handle is not defined.");
  //         }
  //         const profile = await HttpForServer.getProfile(getMe);
  //         const slug = profile.data.profile.slug;
  //         const url = `https://entropy-plus.herokuapp.com/api/images/${imageData.id}/update/?slug=${slug}`;
  //         const response = await PatchForServer.patch(url);
  //         console.log(response, "approve")
  //         if (response.status === 200) {
  //           const updatedImageData = await await getSortImageData(getMe);
  //           setImage(updatedImageData.image);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //       await HttpForServer.approveImage(imageData);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const handleDeclineImage = async () => {
  //   try {
  //     if (image) {
  //       const imageData: ImageData = { id: image.id };
  //       try {
  //         const getMe = AppStore.auth.profile?.handle;
  //         if (!getMe) {
  //           throw new Error("Profile handle is not defined.");
  //         }
  //         const profile = await HttpForServer.getProfile(getMe);
  //         const slug = profile.data.profile.slug;
  //         const url = `https://entropy-plus.herokuapp.com/api/images/${imageData.id}/update/decline/?slug=${slug}`;
  //         const response = await PatchForServer.patch(url);
  //         console.log(response, "decline")
  //         if (response.status === 200) {
  //           const updatedImageData = await await getSortImageData(getMe);
  //           setImage(updatedImageData.image);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
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
          {image?.curator && <UserPreview profile={image.curator} />}
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
            style={{ backgroundImage: `url(${image?.url})` }}
          />
          <div className={css("self-start", "-my-1")}>
            <TwitterProfileSelector
              channels={twitterChannels}
              currentChannel={currentChannel}
            />
          </div>
        </div>
        {/* <div className={css("flex", "justify-around", "gap-4", "md:gap-24")}>
          {AppStore.auth.profile && (
            <Button onClick={handleDeclineImage} size={ButtonSize.Lg} block>
              <Icon name={IconName.Close} />
            </Button>
          )}
          {AppStore.auth.profile && (
            <Button onClick={handleApproveImage} size={ButtonSize.Lg} block>
              <Icon name={IconName.Heart} />
            </Button>
          )}
        </div> */}
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
                key={`twitter-channel-selector-${channel}`}
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
  return {
    props: {},
  };
});

export default SortPage;

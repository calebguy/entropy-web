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
} from "dsl";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { css } from "utils";
import { TwitterChannel } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import Http from "../services/Http";

interface SortPageProps {
  twitterChannels: TwitterChannel[];
}

const SortPage = ({ twitterChannels }: SortPageProps) => {
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
            "md:max-w-md",
            "max-w-sm",
            "mx-auto",
            "w-full",
            "gap-2"
          )}
        >
          <UserPreview username={"gainor"} />
          <AspectRatio
            ratio={"1/1.2"}
            className={css(
              "mx-auto",
              "w-full",
              "border-[1px]",
              "border-black",
              "rounded-sm",
              "bg-brand"
            )}
          >
            <div
              className={css(
                "flex",
                "items-center",
                "justify-center",
                "rounded-sm"
              )}
            >
              <div className={css("bg-white", "rounded-full", "p-2")}>
                <Icon name={IconName.Logo} />
              </div>
            </div>
          </AspectRatio>
          <div className={css("self-start", "-my-1")}>
            <TwitterProfileSelector channels={twitterChannels} />
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

interface TwitterProfileSelectorProps {
  channels: TwitterChannel[];
}

const TwitterProfileSelector = ({ channels }: TwitterProfileSelectorProps) => {
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
      <button
        onClick={() => setShow(!show)}
        className={css(
          "rounded-full",
          "bg-brand",
          "p-1",
          "cursor-pointer",
          "border-[1px]",
          "border-black"
        )}
      >
        <Icon name={IconName.Logo} size={18} fill={"white"} />
      </button>
      {show && (
        <>
          {channels.map((channel) => (
            <Link
              className={css("hover:scale-105")}
              key={`twitter-channel-selector-${channel.profile_image_url}`}
              // @next -- what is the intended functionality here?
              href={"/sort"}
            >
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
                style={{ backgroundImage: `url(${channel.profile_image_url})` }}
              />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

interface UserPreviewProps {
  username: string;
}

const UserPreview = ({ username }: UserPreviewProps) => {
  return (
    <Pane size={PaneSize.Sm} block>
      <div className={css("flex", "justify-between", "items-center")}>
        <div className={css("flex", "items-center", "gap-1")}>
          <AspectRatio
            ratio={"1/1"}
            className={css(
              "w-[30px]",
              "bg-brand",
              "rounded-full",
              "border-[1px]",
              "border-black"
            )}
          />
          <Text>@{username}</Text>
        </div>
        <Link href={`/curator/${username}`}>
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
  const twitterChannels = await Http.getTwitterChannels();
  return {
    props: {
      twitterChannels,
    },
  };
};

export default SortPage;

import { AspectRatio } from "dsl";
import { useState } from "react";
import { css } from "utils";
import { TwitterChannel } from "../../interfaces";

interface TwitterChannelSelectorProps {
  channels: TwitterChannel[];
  selectedChannel: TwitterChannel;
  onClick: (channel: TwitterChannel) => void;
}

const TwitterChannelSelector = ({
  channels,
  selectedChannel,
  onClick,
}: TwitterChannelSelectorProps) => {
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
        <TwitterChannelIcon imageUrl={selectedChannel.profile_image_url} />
      </button>
      {show && (
        <>
          {channels
            .filter(
              (channel) => channel.screen_name !== selectedChannel.screen_name
            )
            .map((channel) => (
              <button
                onClick={() => {
                  onClick(channel);
                  setShow(false);
                }}
                className={css("hover:scale-105")}
                key={`twitter-channel-selector-${channel.screen_name}`}
              >
                <TwitterChannelIcon imageUrl={channel.profile_image_url} />
              </button>
            ))}
        </>
      )}
    </div>
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

export default TwitterChannelSelector;

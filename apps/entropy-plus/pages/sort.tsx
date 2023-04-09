import { Button, ButtonSize, Icon, IconName } from "dsl";
import Logo from "dsl/src/Icon/CustomIcons/Logo";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useMemo } from "react";
import { css } from "utils";
import TwitterChannelSelector from "../components/SortPage/TwitterChannelSelector";
import UserPreview from "../components/SortPage/UserPreview";
import withAuth from "../helpers/auth";
import { Sort, TwitterChannel } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import { HttpForServer } from "../services/Http";
import AppStore from "../store/App.store";
import SortPageStore from "../store/SortPage.store";

interface SortPageProps {
  sort: Sort;
  currentChannel: TwitterChannel;
}

const SortPage = observer(({ sort, currentChannel }: SortPageProps) => {
  const store = useMemo(() => new SortPageStore(sort, currentChannel), []);
  const overlayCss = useMemo(
    () =>
      css(
        "absolute",
        "inset-0",
        "w-full",
        "h-full",
        "bg-white",
        "justify-center",
        "items-center",
        "opacity-80",
        { hidden: !store.isLoading, flex: store.isLoading }
      ),
    [store.isLoading]
  );
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
          <div
            className={css(
              "relative",
              "w-full",
              `h-[500px]`
              // "border-[1px]",
              // "border-solid",
              // "border-black"
            )}
          >
            {/* TODO: IF WE CAN'T GET IMAGE HEIGHT AND WIDTH FROM SERVER WE NEED TO CALCULATE LOCALLY AND SET THE HEIGHT BASED ON THE ASPECT RATIO OF THE NATURAL IMAGE AND THE WIDTH OF THE CONTAINER */}
            <Image
              alt={"sort image"}
              src={store.sort!.url}
              style={{ objectFit: "contain" }}
              onLoadingComplete={() => store.onLoadingComplete()}
              sizes="100vw"
              priority
              fill
            />
            <div className={css(overlayCss)} />
            <div
              className={css(
                "absolute",
                "inset-0",
                "w-full",
                "h-full",
                "justify-center",
                "items-center",
                { hidden: !store.isLoading, flex: store.isLoading }
              )}
            >
              <Logo size={32} />
            </div>
          </div>
          <div className={css("self-start", "-my-1", "relative")}>
            <TwitterChannelSelector
              channels={AppStore.twitterChannels}
              selectedChannel={store.selectedTwitterChannel!}
              onClick={(channel) => store.setSelectedTwitterChannel(channel)}
            />
            <div className={css(overlayCss)} />
          </div>
        </div>
        <div className={css("flex", "justify-around", "gap-4", "md:gap-24")}>
          <Button
            loading={store.isLoading}
            onClick={() => store.handleReject()}
            size={ButtonSize.Lg}
            spinner={false}
            block
          >
            <Icon name={IconName.Close} />
          </Button>
          <Button
            loading={store.isLoading}
            onClick={() => store.handleApprove()}
            size={ButtonSize.Lg}
            spinner={false}
            block
          >
            <Icon name={IconName.Heart} />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
});

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
    console.error(e);
    return {
      notFound: true,
    };
  }
});

export default SortPage;

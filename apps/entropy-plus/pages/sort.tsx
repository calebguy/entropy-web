import { Button, ButtonSize, Icon, IconName } from "dsl";
import Logo from "dsl/src/Icon/CustomIcons/Logo";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { css } from "utils";
import TwitterChannelSelector from "../components/SortPage/TwitterChannelSelector";
import UserPreview from "../components/SortPage/UserPreview";
import withAuth from "../helpers/auth";
import AppLayout from "../layouts/App.layout";
import AppStore from "../store/App.store";
import SortPageStore from "../store/SortPage.store";

interface SortPageProps {}

const SortPage = observer(({}: SortPageProps) => {
  const store = useMemo(() => new SortPageStore(), []);
  useEffect(() => {
    store.init();
  }, []);
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
          {store.sort?.curator && <UserPreview profile={store.sort.curator} />}
          <div
            // @next height should be dynamic
            className={css("relative", "w-full", `h-[300px]`, "md:h-[500px]")}
          >
            {store.sortStack.map((sort, index) => (
              <Image
                key={`sort-image-${sort.sort.id}-${index}`}
                alt={"sort image"}
                src={sort.sort.url}
                style={{ objectFit: "contain" }}
                onLoadingComplete={() => store.onLoadingComplete()}
                sizes="100vw"
                priority
                fill
                className={css({ hidden: index !== 0 })}
              />
            ))}
            <div className={css(overlayCss)} />
            <div
              className={css(
                "absolute",
                "inset-0",
                "w-full",
                "h-full",
                "justify-center",
                "items-center",
                "animate-spin",
                { hidden: !store.isLoading, flex: store.isLoading }
              )}
            >
              <Logo size={32} />
            </div>
          </div>
          <div className={css("self-start", "-my-1", "relative")}>
            <TwitterChannelSelector
              channels={AppStore.twitterChannels}
              selectedChannel={
                store.selectedTwitterChannel
                  ? store.selectedTwitterChannel
                  : store.defaultChannel!
              }
              onClick={(channel) => store.setSelectedTwitterChannel(channel)}
            />
            <div className={css(overlayCss)} />
          </div>
        </div>
        <div className={css("flex", "justify-around", "gap-4", "md:gap-24")}>
          <Button
            block
            interactive
            loading={store.isLoading}
            onClick={() => {
              store.handleReject();
            }}
            size={ButtonSize.Lg}
            spinner={false}
          >
            <Icon name={IconName.Close} />
          </Button>

          <Button
            block
            interactive
            loading={store.isLoading}
            onClick={() => {
              store.handleApprove();
            }}
            size={ButtonSize.Lg}
            spinner={false}
          >
            <Icon name={IconName.Heart} />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
});

export const getServerSideProps = withAuth<SortPageProps>(async () => {
  return {
    props: {},
  };
});

export default SortPage;

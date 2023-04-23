import {
  AspectRatio,
  Icon,
  IconName,
  InfiniteScroll,
  Pane,
  PaneSize,
  Text,
  TextIntent,
  TextSize,
} from "dsl";
import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { css, formatWithThousandsSeparators } from "utils";
import LoadingImage from "../../../components/LoadingImage";
import ProfileIcon from "../../../components/ProfileIcon";
import { Profile } from "../../../interfaces";
import AppLayout from "../../../layouts/App.layout";
import { HttpForServer } from "../../../services/Http";
import CuratorPageStore from "../../../store/CuratorPage.store";

interface CuratorPageProps {
  profile: Profile;
}

const CuratorPage = observer(({ profile }: CuratorPageProps) => {
  const {
    query: { slug },
  } = useRouter();
  const store = useMemo(() => new CuratorPageStore(slug as string), [slug]);
  useEffect(() => {
    store.init();
  }, [slug]);
  const hasLinks =
    !!profile.twitter_handle || !!profile.ig_handle || !!profile.website;
  return (
    <>
      <Head>
        <title>@{profile.handle}</title>
      </Head>
      <AppLayout>
        <div className={css("flex", "flex-col", "md:flex-row", "gap-2")}>
          <div className={css("grow")}>
            <Pane size={PaneSize.Lg} block>
              <div className={css("flex", "flex-col", "gap-2")}>
                <div className={css("flex", "items-center", "justify-between")}>
                  <div className={css("flex", "items-center", "gap-2")}>
                    <ProfileIcon profile={profile} isLink={false} />
                  </div>
                  <div className={css("flex", "flex-col", "items-end")}>
                    <Text size={TextSize.Xxl} bold>
                      {formatWithThousandsSeparators(
                        Number(profile.entropy_score)
                      )}
                    </Text>
                    <Text>entropy score</Text>
                  </div>
                </div>
                <div
                  className={css("flex", "gap-1", "flex-col", "sm:flex-row")}
                >
                  <Text size={TextSize.Lg}>@{profile.handle}</Text>
                  {profile.bio && (
                    <div className={css("break-words")}>
                      <Text intent={TextIntent.Gray}>{profile.bio}</Text>
                    </div>
                  )}
                </div>
              </div>
            </Pane>
          </div>
          {hasLinks && (
            <Pane size={PaneSize.Lg}>
              <div
                className={css(
                  "flex",
                  "flex-row",
                  "justify-between",
                  "h-full",
                  "md:flex-col",
                  "items-center"
                )}
              >
                {profile.twitter_handle && (
                  <Link
                    href={`https://twitter.com/${profile.twitter_handle}`}
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    <Icon name={IconName.Twitter} size={22} />
                  </Link>
                )}
                {profile.ig_handle && (
                  <Link
                    href={`https://instagram.com/${profile.ig_handle}`}
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    <Icon name={IconName.Instagram} size={19} />
                  </Link>
                )}
                {profile.website && (
                  <Link
                    href={profile.website}
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    <Icon name={IconName.Mouse} size={14} />
                  </Link>
                )}
              </div>
            </Pane>
          )}
        </div>
        <InfiniteScroll
          hasMore={store.hasMore}
          dataLength={store.dataLength}
          next={() => store.next()}
          renderEndData={() => (
            <div className={css("flex", "justify-center")}>
              <Icon name={IconName.GreyLogo} size={14} />
            </div>
          )}
        >
          <div
            className={css(
              "grid",
              "grid-cols-2",
              "sm:grid-cols-3",
              "md:grid-cols-4",
              "gap-2",
              "mt-2"
            )}
          >
            {store.isLoading &&
              Array(16)
                .fill(0)
                .map((value, index) => (
                  <AspectRatio
                    ratio={"1/1"}
                    key={`loader-${index}`}
                    className={css(
                      "border-[1px]",
                      "border-black",
                      "border-solid",
                      "rounded-md",
                      "h-[218px]"
                    )}
                  >
                    <div
                      className={css(
                        "w-full",
                        "h-full",
                        "flex",
                        "justify-center",
                        "items-center"
                      )}
                    >
                      <Icon name={IconName.GreyLogo} size={25} />
                    </div>
                  </AspectRatio>
                ))}
            {!store.isLoading &&
              store.data.map((photo, index) => (
                <Link
                  key={`image-preview-${index}`}
                  href={`/image/${photo.id}`}
                  className={css("w-full", "h-full")}
                >
                  <LoadingImage photo={photo} />
                </Link>
              ))}
          </div>
        </InfiniteScroll>
      </AppLayout>
    </>
  );
});

export const getServerSideProps: GetServerSideProps<CuratorPageProps> = async (
  context
) => {
  try {
    const { slug } = context.query as { slug: string };
    const { data: profile } = await HttpForServer.getCuratorProfile(slug);
    return {
      props: {
        profile,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default CuratorPage;

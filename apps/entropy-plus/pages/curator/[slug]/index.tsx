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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { css, formatWithThousandsSeparators } from "utils";
import ProfileIcon from "../../../components/ProfileIcon";
import { Profile } from "../../../interfaces";
import AppLayout from "../../../layouts/App.layout";
import { HttpForServer } from "../../../services/Http";
import CuratorPageStore from "../../../store/CuratorPage.store";

interface CuratorPageProps {
  profile: Profile;
  // acheivements: Acheivement;
}

const CuratorPage = observer(({ profile }: CuratorPageProps) => {
  const {
    query: { slug },
  } = useRouter();
  const store = useMemo(() => new CuratorPageStore(slug as string), [slug]);
  useEffect(() => {
    store.init();
  }, []);
  // const acheivmentKeys = objectKeys(acheivements);
  const hasLinks =
    !!profile.twitter_handle || !!profile.ig_handle || !!profile.website;
  return (
    <AppLayout profile={profile}>
      <div className={css("flex", "flex-col", "md:flex-row", "gap-2")}>
        <div className={css("grow")}>
          <Pane size={PaneSize.Lg} block>
            <div className={css("flex", "flex-col", "gap-2")}>
              <div className={css("flex", "items-center", "justify-between")}>
                <div className={css("flex", "items-center", "gap-2")}>
                  <ProfileIcon profile={profile} />
                  {/* <Button intent={ButtonIntent.DeepBlue} round>
                    Edit Profile
                  </Button> */}
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
              <div className={css("flex", "gap-1", "flex-col", "sm:flex-row")}>
                <Text size={TextSize.Lg}>@{profile.handle}</Text>
                {profile.bio && (
                  <div className={css("break-words")}>
                    <Text intent={TextIntent.Gray}>{profile.bio}</Text>
                  </div>
                )}
                {/* {AppStore.auth.profile && (
                  <Text>{jsonify(AppStore.auth.profile)}</Text>
                )} */}
              </div>
              {/* {acheivmentKeys.length > 0 && (
                <div
                  className={css("flex", "items-center", "gap-1", "flex-wrap")}
                >
                  {objectKeys(acheivements)
                    .filter((key) => !!acheivements[key])
                    .map((key, index) => (
                      <AcheivementPill
                        key={`profile-acheivement-${key}-${index}`}
                        acheivement={key}
                      />
                    ))}
                </div>
              )} */}
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
                  href={profile.twitter_handle}
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  <Icon name={IconName.Twitter} size={22} />
                </Link>
              )}
              {profile.ig_handle && (
                <Link
                  href={profile.ig_handle}
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
          {store.data.map((photo, index) => (
            <Link
              key={`curator-image-${photo.url}-${index}`}
              href={`${slug}/image/${photo.id}`}
              className={css("w-full", "h-full")}
            >
              <div className={css("relative")}>
                <AspectRatio
                  className={css(
                    "bg-cover",
                    "bg-center",
                    "bg-no-repeat",
                    "rounded-md",
                    "z-10"
                  )}
                  ratio={`1/1`}
                  style={{ backgroundImage: `url(${photo.url})` }}
                />

                <div
                  className={css(
                    "border-[1px]",
                    "border-solid",
                    "border-black",
                    "w-full",
                    "h-full",
                    "rounded-md",
                    "flex",
                    "justify-center",
                    "items-center",
                    "absolute",
                    "inset-0"
                  )}
                >
                  <Image
                    src={"/images/logo.svg"}
                    alt={"loader"}
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </AppLayout>
  );
});

export const getServerSideProps: GetServerSideProps<CuratorPageProps> = async (
  context
) => {
  const { slug } = context.query as { slug: string };
  const { data: profile } = await HttpForServer.getCuratorProfile(slug);
  console.log("PROFILE", profile);
  return {
    props: {
      profile,
      // acheivements,
    },
  };
};

export default CuratorPage;

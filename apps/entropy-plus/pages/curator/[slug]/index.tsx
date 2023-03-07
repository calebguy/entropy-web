import {
  AspectRatio,
  Button,
  ButtonIntent,
  Icon,
  IconName,
  Pane,
  PaneSize,
  Text,
  TextIntent,
  TextSize,
} from "dsl";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { css, formatWithThousandsSeparators, objectKeys } from "utils";
import AcheivementPill from "../../../components/AcheivementPill";
import ProfileIcon from "../../../components/ProfileIcon";
import { Acheivement, Photo, Profile } from "../../../interfaces";
import AppLayout from "../../../layouts/App.layout";
import { Http } from "../../../services/Http";

interface CuratorPageProps {
  profile: Profile;
  photos: Photo[];
  acheivements: Acheivement;
}

const CuratorPage = ({ profile, photos, acheivements }: CuratorPageProps) => {
  const {
    query: { slug },
  } = useRouter();
  const acheivmentKeys = objectKeys(acheivements);
  const hasLinks =
    !!profile.twitter_handle || !!profile.ig_handle || !!profile.website;
  return (
    <AppLayout>
      <div className={css("flex", "flex-col", "md:flex-row", "gap-2")}>
        <div className={css("grow")}>
          <Pane size={PaneSize.Lg} block>
            <div className={css("flex", "flex-col", "gap-2")}>
              <div className={css("flex", "items-center", "justify-between")}>
                <div className={css("flex", "items-center", "gap-2")}>
                  <ProfileIcon profile={profile} />
                  <Button intent={ButtonIntent.DeepBlue} round>
                    Edit Profile
                  </Button>
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
                <Text size={TextSize.Lg}>@{profile.name}</Text>
                {profile.bio && (
                  <div className={css("break-words")}>
                    <Text intent={TextIntent.Gray}>{profile.bio}</Text>
                  </div>
                )}
              </div>
              {acheivmentKeys.length > 0 && (
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
              )}
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
      {photos.length > 0 && (
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
          {photos.map((photo) => (
            <Link
              key={`curator-image-${photo.url}`}
              href={`${slug}/image/${photo.id}`}
            >
              <AspectRatio
                className={css(
                  "bg-cover",
                  "bg-center",
                  "bg-no-repeat",
                  "rounded-md"
                )}
                ratio={`1/1`}
                style={{ backgroundImage: `url(${photo.image?.url})` }}
              />
            </Link>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps<CuratorPageProps> = async (
  context
) => {
  const { slug } = context.query;
  const {
    data: { profile, images, acheivements },
  } = await Http.getProfile(slug as string);
  return {
    props: {
      profile,
      photos: images,
      acheivements,
    },
  };
};

export default CuratorPage;

import {
  AspectRatio,
  Button,
  ButtonIntent,
  Icon,
  IconName,
  Pane,
  PaneSize,
  Text,
  TextSize,
} from "dsl";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { css, objectKeys } from "utils";
import AcheivementPill from "../../../components/AcheivementPill";
import ProfileIcon from "../../../components/ProfileIcon";
import { Acheivement, Photo, Profile } from "../../../interfaces";
import AppLayout from "../../../layouts/App.layout";
import Http from "../../../services/Http";

interface CuratorPageProps {
  profile: Profile;
  images: Photo[];
  acheivements: Acheivement;
}

const CuratorPage = ({ profile, images, acheivements }: CuratorPageProps) => {
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
                  <Text size={TextSize.Xl} bold>
                    {profile.entropy_score}
                  </Text>
                  <Text>entropy score</Text>
                </div>
              </div>
              <div className={css("flex", "items-end", "gap-1")}>
                <Text size={TextSize.Lg}>@{profile.name}</Text>
                {profile.bio && <Text>{profile.bio}</Text>}
              </div>
              {acheivmentKeys.length > 0 && (
                <div
                  className={css("flex", "items-center", "gap-1", "flex-wrap")}
                >
                  {objectKeys(acheivements)
                    .filter((key) => !!acheivements[key])
                    .map((key) => (
                      <AcheivementPill
                        key={`profile-acheivement-${key}`}
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
      {images.length > 0 && (
        <div className={css("grid", "grid-cols-4", "mt-2")}>
          {images.map((image) => (
            <Link href={`${slug}/image/${100}`}>
              <AspectRatio
                className={css(
                  "bg-cover",
                  "bg-center",
                  "bg-no-repeat",
                  "border-[1px]",
                  "border-black",
                  "rounded-md"
                )}
                ratio={`${image.image?.width_field}/${image.image?.height_field}`}
                style={{ backgroundImage: `url(${image.image?.url})` }}
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
      images,
      acheivements,
    },
  };
};

export default CuratorPage;

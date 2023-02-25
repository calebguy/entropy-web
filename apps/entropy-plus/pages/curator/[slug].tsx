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
import { css, objectKeys } from "utils";
import AcheivementPill from "../../components/AcheivementPill";
import { Acheivement, Photo, Profile } from "../../interfaces";
import AppLayout from "../../layouts/App.layout";
import Http from "../../services/Http";

interface CuratorPageProps {
  profile: Profile;
  images: Photo[];
  acheivements: Acheivement;
}

const CuratorPage = ({ profile, images, acheivements }: CuratorPageProps) => {
  const acheivmentKeys = objectKeys(acheivements);
  return (
    <AppLayout>
      <div className={css("flex", "flex-col", "gap-2")}>
        <Pane size={PaneSize.Lg} block>
          <div className={css("flex", "flex-col", "gap-2")}>
            <div className={css("flex", "items-center", "justify-between")}>
              <div className={css("flex", "items-center", "gap-2")}>
                <AspectRatio
                  ratio={"1/1"}
                  className={css(
                    "rounded-full",
                    "border-[1px]",
                    "border-black",
                    "w-[45px]",
                    "bg-cover",
                    "bg-center",
                    "bg-no-repeat"
                  )}
                  style={
                    profile.profile_image
                      ? { backgroundImage: `url(${profile.profile_image.url})` }
                      : undefined
                  }
                />
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
        <Pane size={PaneSize.Lg} block>
          <div className={css("flex", "justify-between")}>
            <Icon name={IconName.Logo} />
            <Icon name={IconName.Logo} />
            <Icon name={IconName.Logo} />
          </div>
        </Pane>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps<CuratorPageProps> = async (
  context
) => {
  const { slug } = context.query;
  const { profile, images, acheivements } = await Http.getProfile(
    slug as string
  );
  return {
    props: {
      profile,
      images,
      acheivements,
    },
  };
};

export default CuratorPage;

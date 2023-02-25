import {
  AspectRatio,
  Button,
  ButtonIntent,
  Pane,
  PaneSize,
  Text,
  TextSize,
} from "dsl";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { css } from "utils";
import ProfileIcon from "../../../../components/ProfileIcon";
import { Photo, Profile } from "../../../../interfaces";
import AppLayout from "../../../../layouts/App.layout";
import Http from "../../../../services/Http";

interface ImageByIdProps {
  profile: Profile;
  image: Photo;
}

const ImageById = ({ profile, image }: ImageByIdProps) => {
  return (
    <AppLayout>
      <div
        className={css(
          "h-full",
          "w-full",
          "grid",
          "grid-cols-1",
          "md:grid-cols-2",
          "gap-x-6"
        )}
      >
        <div className={css("flex", "items-center", "order-2", "md:order-1")}>
          <div className={css("grow", "flex", "flex-col", "gap-3")}>
            <Text>Curated by</Text>
            <Pane size={PaneSize.Lg}>
              <div className={css("flex", "items-center", "justify-between")}>
                <div className={css("flex", "items-center", "gap-2")}>
                  <ProfileIcon profile={profile} />
                  <Text size={TextSize.Lg}>@{profile.name}</Text>
                </div>
                <Link href={`/curator/${profile.slug}`}>
                  <Button round intent={ButtonIntent.Secondary}>
                    View Profile
                  </Button>
                </Link>
              </div>
            </Pane>
            <div className={css("flex", "items-center", "gap-4")}>
              <Link href={"/"} className={css("w-full")}>
                <Pane size={PaneSize.Lg} block>
                  <div className={css("text-center")}>
                    <Text>Sourced from: TEST</Text>
                  </div>
                </Pane>
              </Link>
              <Link href={"/"} className={css("w-full")}>
                <Pane size={PaneSize.Lg} block>
                  <div className={css("text-center")}>
                    <Text>More Info</Text>
                  </div>
                </Pane>
              </Link>
            </div>
          </div>
        </div>
        <div className={css("flex", "items-center", "order-1", "md:order-2")}>
          <AspectRatio
            ratio={"1/1"}
            className={css(
              "bg-contain",
              "bg-center",
              "bg-no-repeat",
              "w-full",
              "rounded-md",
              "border-[1px]",
              "border-black"
            )}
            style={{ backgroundImage: `url(${image.url})` }}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ImageByIdProps> = async (
  context
) => {
  const { curator, id } = context.query;
  const {
    data: { profile, image },
  } = await Http.getCuratorImage(curator as string, id as string);
  return {
    props: {
      profile,
      image,
    },
  };
};

export default ImageById;

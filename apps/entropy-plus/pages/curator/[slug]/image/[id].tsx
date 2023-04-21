import { Button, ButtonIntent, Pane, PaneSize, Text, TextSize } from "dsl";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { css } from "utils";
import ProfileIcon from "../../../../components/ProfileIcon";
import { CuratorPhoto, Profile } from "../../../../interfaces";
import AppLayout from "../../../../layouts/App.layout";
import { HttpForServer } from "../../../../services/Http";

interface ImageByIdProps {
  profile: Profile;
  image: CuratorPhoto;
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
                  <Text size={TextSize.Lg}>@{profile.handle}</Text>
                </div>
                <Link href={`/curator/${profile.slug}`}>
                  <Button round intent={ButtonIntent.Secondary}>
                    View Profile
                  </Button>
                </Link>
              </div>
            </Pane>
            <div className={css("flex", "items-center", "gap-4")}>
              {image.image_source && (
                <Link href={"/"} className={css("w-full")}>
                  <Pane size={PaneSize.Lg} block>
                    <div className={css("text-center")}>
                      <Text>Source</Text>
                    </div>
                  </Pane>
                </Link>
              )}
              <Link
                className={css("w-full")}
                target={"_blank"}
                href={`https://www.bing.com/images/search?q=imgurl:${image.url}
                            &view=detailv2&selectedindex=0&iss=sbi&id=${image.url}&ccid=zUFO%2BkX6&mediaurl=${image.url}&exph=511&expw=498&vt=2&sim=11`}
              >
                <Pane size={PaneSize.Lg} block>
                  <div className={css("text-center")}>
                    <Text>More Info</Text>
                  </div>
                </Pane>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={css(
            "flex",
            "items-center",
            "order-1",
            "md:order-2",
            "relative"
          )}
        >
          <Image
            alt={image.url}
            src={image.url}
            fill
            className={css("object-contain")}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ImageByIdProps> = async (
  context
) => {
  try {
    const { slug, id } = context.query;
    const { data: profile } = await HttpForServer.getCuratorProfile(
      slug as string
    );
    const { data: image } = await HttpForServer.getCuratorPhoto(
      slug as string,
      id as string
    );
    return {
      props: {
        profile,
        image,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default ImageById;

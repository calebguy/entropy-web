import { Button, ButtonIntent, Pane, PaneSize, Text, TextSize } from "dsl";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { css } from "utils";
import ProfileIcon from "../../components/ProfileIcon";
import {
  DESCRIPTION,
  NAME,
  TWITTER_CARD_URL,
  getBaseUrl,
} from "../../environment/vars";
import { Photo, Profile } from "../../interfaces";
import AppLayout from "../../layouts/App.layout";
import { HttpForServer } from "../../services/Http";

interface ImageByIdProps {
  profile: Profile;
  image: Photo;
}

const ImageById = ({ profile, image }: ImageByIdProps) => {
  return (
    <>
      <Head>
        <title>{NAME}</title>
        <meta name="description" content={DESCRIPTION} key="desc" />
        <meta property="og:site_name" content={NAME} />
        <meta property="og:title" content={NAME} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={TWITTER_CARD_URL} />
        <meta property="og:url" content={getBaseUrl()} />
        <meta name="twitter:title" content={NAME} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={TWITTER_CARD_URL} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
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
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { id } = context.query;
    const { data } = await HttpForServer.getPhoto(id as string);
    return {
      props: {
        profile: data.curator,
        image: data.image,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default ImageById;

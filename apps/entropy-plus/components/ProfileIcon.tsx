import { AspectRatio } from "dsl";
import Link from "next/link";
import { css } from "utils";
import { Profile } from "../interfaces";

interface ProfileIconProps {
  profile: Profile;
}

const ProfileIcon = ({ profile }: ProfileIconProps) => {
  const imageUrl = profile?.profile_image?.url;
  return (
    <Link href={`/curator/${profile.slug}`}>
      <AspectRatio
        style={
          imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
              }
            : undefined
        }
        className={css(
          "w-[35px]",
          "border-[1px]",
          "border-solid",
          "border-black",
          "rounded-full",
          "bg-cover",
          { "bg-brand": !imageUrl }
        )}
        ratio={"1/1"}
      />
    </Link>
  );
};

export default ProfileIcon;

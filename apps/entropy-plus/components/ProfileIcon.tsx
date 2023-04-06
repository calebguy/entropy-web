import { AspectRatio } from "dsl";
import Link from "next/link";
import { css } from "utils";
import { Profile } from "../interfaces";

interface ProfileIconProps {
  profile: Profile;
}

const ProfileIcon = ({ profile }: ProfileIconProps) => {
  const imageUrl = "https://res.cloudinary.com/dpooqlfdf/" + profile?.profile_image?.url;
  if (!profile) {
    return null; // Return null if the profile prop is null or undefined
  }
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

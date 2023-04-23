import { AspectRatio } from "dsl";
import Link from "next/link";
import { css } from "utils";
import { Profile } from "../interfaces";

interface ProfileIconProps {
  profile: Profile;
  isLink?: boolean;
}

const ProfileIcon = ({ profile, isLink = true }: ProfileIconProps) => {
  if (isLink) {
    return (
      <Link href={`/curator/${profile.slug}`}>
        <ProfileIconImage profile={profile} />
      </Link>
    );
  }

  return <ProfileIconImage profile={profile} />;
};

const ProfileIconImage = ({ profile }: { profile: Profile }) => {
  return (
    <AspectRatio
      style={
        profile?.profile_image
          ? {
              backgroundImage: `url(${
                "https://res.cloudinary.com/dpooqlfdf/" + profile?.profile_image
              })`,
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
        { "bg-brand": !profile?.profile_image }
      )}
      ratio={"1/1"}
    />
  );
};

export default ProfileIcon;

import { AspectRatio } from "dsl";
import Link from "next/link";
import { css } from "utils";
import { Profile } from "../interfaces";

interface ProfileIconProps {
  profile: Profile;
}

const ProfileIcon = ({ profile }: ProfileIconProps) => {
  return (
    <Link href={`/curator/${profile.slug}`}>
      <AspectRatio
        style={
          profile?.profile_image
            ? {
                backgroundImage: `url(${
                  "https://res.cloudinary.com/dpooqlfdf/" +
                  profile?.profile_image
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
    </Link>
  );
};

export default ProfileIcon;

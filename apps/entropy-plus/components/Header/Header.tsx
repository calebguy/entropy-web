import { AspectRatio, Icon, IconName, Text } from "dsl";
import Link from "next/link";
import { css } from "utils";

const Header = () => {
  const isAuthed = true;
  return (
    <div className={css("flex", "justify-between")}>
      <Link href={isAuthed ? "/sort" : "/"}>
        <Icon name={IconName.Logo} />
      </Link>
      <div className={css("flex", "items-center", "gap-2")}>
        {isAuthed && (
          <>
            <Link href={"/upload"}>
              <Icon name={IconName.Plus} />
            </Link>
            <Link href={"/dashboard"}>
              <Icon name={IconName.FourSquare} />
            </Link>
            <Link href={`/profile/test`}>
              <AspectRatio
                style={{
                  backgroundImage:
                    "url(https://res.cloudinary.com/dpooqlfdf/image/upload/v1675634340/yjtez64evmrzjolxtu0e.jpg)",
                }}
                className={css(
                  "w-[35px]",
                  "border-[1px]",
                  "border-solid",
                  "border-black",
                  "rounded-full",
                  "bg-cover"
                )}
                ratio={"1/1"}
              />
            </Link>
          </>
        )}
        {!isAuthed && (
          <Link href={"/signup"}>
            <Text bold>Signup</Text>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;

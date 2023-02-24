import { AspectRatio, Icon, IconName, Text } from "dsl";
import Link from "next/link";
import { css } from "utils";

const Header = () => {
  const isAuthed = true;
  return (
    <div className={css("flex", "justify-between")}>
      <Link href={isAuthed ? "/sort" : "/"}>
        <Icon name={IconName.Logo} size={41} />
      </Link>
      {isAuthed && (
        <div className={css("flex", "items-center", "gap-6")}>
          <Link href={"/upload"}>
            <Icon name={IconName.Plus} size={29} />
          </Link>
          <Link href={"/dashboard"}>
            <Icon name={IconName.FourSquare} size={29} />
          </Link>
          <Link href={`/curator/gainor`}>
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
        </div>
      )}
      {!isAuthed && (
        <Link href={"/signup"}>
          <Text bold>Signup</Text>
        </Link>
      )}
    </div>
  );
};

export default Header;

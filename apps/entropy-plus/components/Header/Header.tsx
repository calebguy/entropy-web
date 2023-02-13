import { AspectRatio, Icon, IconName } from "dsl";
import Link from "next/link";
import { css } from "utils";

const Header = () => {
  return (
    <div className={css("flex", "justify-between")}>
      <Icon name={IconName.Logo} />
      <div className={css("flex", "items-center", "gap-2")}>
        <Link href={"/create"}>
          <Icon name={IconName.Plus} />
        </Link>
        <Link href={"/dashboard"}>
          <Icon name={IconName.FourSquare} />
        </Link>
        <Link href={"/profile"}>
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
    </div>
  );
};

export default Header;

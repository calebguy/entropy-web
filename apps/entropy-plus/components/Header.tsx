import { Dropdown, DropdownItem, Icon, IconName, Text, TextSize } from "dsl";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { css } from "utils";
import Dev from "../environment/Dev";
import { Profile } from "../interfaces";
import { HttpForClient } from "../services/Http";
import AppStore from "../store/App.store";

interface HeaderProps {
  profile: Profile;
}

const Header = observer(({ profile }: HeaderProps) => {
  return (
    <div className={css("flex", "justify-between", "items-center")}>
      {AppStore.auth.isLoggedIn && (
        <>
          <div className={css("flex", "items-center", "gap-4")}>
            <Link href={"/sort"}>
              <Icon name={IconName.Logo} size={41} />
            </Link>
            <Dev>
              <div
                className={css(
                  "border-[1px]",
                  "border-dashed",
                  "border-gray-medium",
                  "px-1",
                  "flex",
                  "gap-2"
                )}
              >
                <Link href={"/me"}>
                  <Text>me</Text>
                </Link>
                <button
                  onClick={() => {
                    HttpForClient.logout().then(() => Router.push("/login"));
                  }}
                >
                  <Text>logout</Text>
                </button>
              </div>
            </Dev>
          </div>
          <div className={css("flex", "items-center", "gap-6")}>
            <Link href={"/upload"}>
              <Icon name={IconName.Plus} size={29} />
            </Link>
            <Link href={"/dashboard"}>
              <Icon name={IconName.FourSquare} size={29} />
            </Link>
            {AppStore.auth.profile && (
              <Link href={`/curator/${AppStore.auth.profile.handle}`}>
                {AppStore.auth.profile && (
                  <Image
                    width={100}
                    height={100}
                    src={`https://res.cloudinary.com/dpooqlfdf/${
                      AppStore.auth.profile.profile_image || ""
                    }`}
                    alt={AppStore.auth.profile.handle}
                    className={css("w-8", "h-8", "rounded-full")}
                  />
                )}
              </Link>
            )}
          </div>
        </>
      )}
      {!AppStore.auth.isLoggedIn && (
        <>
          <div>
            <Text size={TextSize.Md}>entropy+</Text>
          </div>
          <div>
            <Dropdown
              trigger={
                <div
                  className={css(
                    "bg-gray-light",
                    "p-2",
                    "rounded-md",
                    "inline-flex",
                    "items-center",
                    "gap-2"
                  )}
                >
                  <Text>Explore</Text>
                  <Icon name={IconName.ChevronDown} fill="black" size={16} />
                </div>
              }
            >
              <div className={css("flex", "flex-col", "gap-1")}>
                <DropdownItem>
                  <Link
                    target={"_blank"}
                    href={"https://twitter.com/ennntropy"}
                  >
                    <Text bold>Twitter</Text>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link
                    target={"_blank"}
                    href={"https://www.instagram.com/ennntropy/"}
                  >
                    <Text bold>Instagram</Text>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link href={"/login"}>
                    <Text bold>Login</Text>
                  </Link>
                </DropdownItem>
              </div>
            </Dropdown>
          </div>
        </>
      )}
    </div>
  );
});

export default Header;

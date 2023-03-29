import { Dropdown, DropdownItem, Icon, IconName, Text, TextSize } from "dsl";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import Router from "next/router";
import { css } from "utils";
import Dev from "../environment/Dev";
import { HttpForClient } from "../services/Http";
import AppStore from "../store/App.store";
import ProfileIcon from "./ProfileIcon";

const Header = observer(() => {
  return (
    <div className={css("flex", "justify-between", "items-center")}>
      {AppStore.auth.isLoggedIn && (
        <>
          <div className={css("flex", "items-center", "gap-4")}>
            <Link href={AppStore.auth.isLoggedIn ? "/sort" : "/"}>
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
              <ProfileIcon profile={AppStore.auth.profile} />
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

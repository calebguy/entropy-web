import { Icon, IconName, Text } from "dsl";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import Router from "next/router";
import { css } from "utils";
import { HttpForClient } from "../services/Http";
import AppStore from "../store/App.store";
import ProfileIcon from "./ProfileIcon";

const Header = observer(() => {
  return (
    <div className={css("flex", "justify-between")}>
      <div className={css("flex", "items-center", "gap-4")}>
        <Link href={AppStore.auth.isLoggedIn ? "/sort" : "/"}>
          <Icon name={IconName.Logo} size={41} />
        </Link>
        <div className={css("flex", "gap-2", "items-center")}>
          <Link href={"/me"}>
            <Text>ME</Text>
          </Link>
          <button
            onClick={() => {
              HttpForClient.logout().then(() => Router.push("/login"));
            }}
          >
            <Text>logout</Text>
          </button>
        </div>
      </div>
      {AppStore.auth.isLoggedIn && (
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
      )}
      {!AppStore.auth.isLoggedIn && (
        <Link href={"/signup"}>
          <Text bold>Signup</Text>
        </Link>
      )}
    </div>
  );
});

export default Header;

import { makeObservable, observable } from "mobx";
import Router from "next/router";
import { Nullable, Profile } from "../interfaces";
import { HttpForClient } from "../services/Http";
import { LoginDto } from "./../interfaces/index";

class AuthStore {
  @observable
  isLoggedIn = false;

  @observable
  profile: Nullable<Profile> = null;

  constructor() {
    makeObservable(this);
  }

  init() {
    this.getProfile()
      .then(() => (this.isLoggedIn = true))
      .catch(() => (this.isLoggedIn = false));
  }

  login({ username, password }: LoginDto) {
    return HttpForClient.login({ username, password })
      .then(() => {
        this.isLoggedIn = true;
        this.getProfile().then(() => {
          Router.push("/me");
        });
      })
      .catch((e) => {
        this.isLoggedIn = false;
        console.error(e);
      });
  }

  logout() {
    return HttpForClient.logout()
      .then(() => {
        this.isLoggedIn = false;
        Router.push("/login");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  private getProfile() {
    return HttpForClient.getMe().then(({ data }) => {
      this.profile = data;
      return data;
    });
  }
}

export default AuthStore;

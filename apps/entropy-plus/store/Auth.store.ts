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

  @observable
  hasInitialized = false;

  constructor() {
    makeObservable(this);
  }

  init() {
    return this.getProfile()
      .then(() => {
        this.isLoggedIn = true;
        this.hasInitialized = true;
      })
      .catch((e) => {
        this.isLoggedIn = false;
        this.hasInitialized = true;
      });
  }

  login({ username, password }: LoginDto) {
    return HttpForClient.login({
      // we'll probably have to change this and check if lowercase is the correct format
      username: username.toLocaleLowerCase(),
      password,
    })
      .then(() => {
        this.isLoggedIn = true;
        return this.getProfile();
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

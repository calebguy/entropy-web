import { makeObservable, observable } from "mobx";
import Router from "next/router";
import { Profile } from "../interfaces";
import Http from "../services/Http";
import { LoginDto } from "./../interfaces/index";

class AuthStore {
  @observable
  profile?: Profile;

  constructor() {
    makeObservable(this);
  }

  init() {
    console.log("auth store init");
  }

  login({ username, password }: LoginDto) {
    return Http.login({ username, password })
      .then(({ data }) => {
        Router.push("/sort");
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

export default AuthStore;

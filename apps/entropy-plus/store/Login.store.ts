import { action, makeObservable, observable } from "mobx";
import Router from "next/router";
import AppStore from "./App.store";

export default class LoginStore {
  @observable
  username = "";

  @observable
  password = "";

  constructor() {
    makeObservable(this);
  }

  login() {
    return AppStore.auth
      .login({
        username: this.username,
        password: this.password,
      })
      .then(() => {
        Router.push("/sort");
      });
  }

  @action
  setGCreds() {
    this.username = "gainor";
    this.password = "Sf4y6RWV9b*";
  }
}

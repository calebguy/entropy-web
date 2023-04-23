import { action, makeObservable, observable } from "mobx";
import Router from "next/router";
import AppStore from "./App.store";

export default class LoginStore {
  @observable
  username = "";

  @observable
  password = "";

  @observable
  isLoading = false;

  constructor() {
    makeObservable(this);
  }

  login() {
    this.isLoading = true;
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

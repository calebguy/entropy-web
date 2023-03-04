import { makeObservable, observable } from "mobx";
import AuthStore from "./Auth.store";

class _AppStore {
  @observable
  auth: AuthStore;

  constructor() {
    makeObservable(this);
    this.auth = new AuthStore();
  }

  init() {
    this.auth.init();
  }
}

const AppStore = new _AppStore();
export default AppStore;

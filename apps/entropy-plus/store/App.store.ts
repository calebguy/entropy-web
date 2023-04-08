import { makeObservable, observable } from "mobx";
import { TwitterChannel } from "../interfaces";
import AuthStore from "./Auth.store";

class _AppStore {
  @observable
  auth: AuthStore;

  @observable
  twitterChannels: TwitterChannel[] = [];

  constructor() {
    makeObservable(this);
    this.auth = new AuthStore();
  }

  init() {
    this.auth.init();
    // return HttpForClient.getTwitterChannels().then(({ data }) => {
    //   this.twitterChannels = data;
    // });
  }
}

const AppStore = new _AppStore();
export default AppStore;

import { makeObservable, observable } from "mobx";
import { TwitterChannel } from "../interfaces";
import { HttpForClient } from "../services/Http";
import AuthStore from "./Auth.store";

class _AppStore {
  @observable
  hasInitialized = false;

  @observable
  auth: AuthStore;

  @observable
  twitterChannels: TwitterChannel[] = [];

  constructor() {
    makeObservable(this);
    this.auth = new AuthStore();
  }

  async init() {
    await this.auth.init();
    return HttpForClient.getTwitterChannels()
      .then(({ data }) => {
        // null channel is returned from server
        this.twitterChannels = data.filter(
          (channel) => channel.profile_image_url !== null
        );
        this.hasInitialized = true;
      })
      .catch((e) => {
        console.error("GOT ERROR FETCHING TWITTER CHANNELS", e);
      });
  }
}

const AppStore = new _AppStore();
export default AppStore;

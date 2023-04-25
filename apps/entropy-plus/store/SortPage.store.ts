import { action, computed, makeObservable, observable } from "mobx";
import sleep from "utils/sleep";
import { HttpForClient } from "../services/Http";
import {
  Sort,
  TwitterChannel,
  TwitterChannelScreenName,
} from "./../interfaces/index";
import AppStore from "./App.store";

export default class SortPageStore {
  private stackDepth = 5;

  @observable
  sortStack: { sort: Sort; channel: TwitterChannel }[] = [];

  @observable
  isLoading = true;

  constructor() {
    makeObservable(this);
  }

  async init() {
    return Promise.all([
      this.getSort(),
      sleep(0.1).then(() => this.getSort()),
      sleep(0.2).then(() => this.getSort()),
      sleep(0.3).then(() => this.getSort()),
    ]).then(() => (this.isLoading = false));
  }

  @action
  getSort() {
    return HttpForClient.getSortImage(AppStore.auth.profile!.handle)
      .then(({ data }) => {
        const sort = data[0];
        const channel = AppStore.twitterChannels.find(
          (channel) => channel.screen_name === sort.twitter_channel
        ) as TwitterChannel;
        return this.sortStack.push({
          sort,
          channel,
        });
      })
      .catch((e) => console.error("error getting sort", e));
  }

  @action
  handleApprove() {
    this.sortStack.shift();
    HttpForClient.approveImage(
      this.sort!.id,
      AppStore.auth.profile!.handle,
      this.selectedTwitterChannel!.screen_name
    ).then(() => this.afterSort());
  }

  @action
  handleReject() {
    this.sortStack.shift();
    HttpForClient.rejectImage(
      this.sort!.id,
      AppStore.auth.profile!.handle,
      this.selectedTwitterChannel!.screen_name
    ).then(() => this.afterSort());
  }

  private afterSort() {
    this.getSort();
  }

  @action
  setSelectedTwitterChannel(twitterChannel: TwitterChannel) {}

  @action
  onLoadingComplete() {
    this.isLoading = false;
  }

  @computed
  get defaultChannel() {
    const channelName: TwitterChannelScreenName = "ennntropy";
    return AppStore.twitterChannels.find(
      (channel) => channel.screen_name === channelName
    );
  }

  @computed
  get sort() {
    return this.sortStack[0]?.sort;
  }

  @computed
  get selectedTwitterChannel() {
    return this.sortStack[0]?.channel;
  }
}

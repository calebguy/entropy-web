import { action, computed, makeObservable, observable } from "mobx";
import { HttpForClient } from "../services/Http";
import {
  Sort,
  TwitterChannel,
  TwitterChannelScreenName,
} from "./../interfaces/index";
import AppStore from "./App.store";

export default class SortPageStore {
  @observable
  sortStack: { sort: Sort; channel: TwitterChannel }[] = [];

  @observable
  isLoading = true;

  constructor() {
    makeObservable(this);
  }

  init() {
    return Promise.all([
      this.getSort(),
      this.getSort(),
      this.getSort(),
      this.getSort(),
    ]).finally(() => (this.isLoading = false));
  }

  @action
  getSort() {
    // can we get the image height && width from the server?
    return HttpForClient.getSortImage(AppStore.auth.profile!.handle).then(
      ({ data }) => {
        const sort = data[0];
        const channel = AppStore.twitterChannels.find(
          (channel) => channel.screen_name === sort.twitter_channel
        ) as TwitterChannel;
        this.sortStack.push({
          sort,
          channel,
        });
      }
    );
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

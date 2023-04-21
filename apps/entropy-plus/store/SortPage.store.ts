import { action, makeObservable, observable } from "mobx";
import { HttpForClient } from "../services/Http";
import { Sort, TwitterChannel } from "./../interfaces/index";
import AppStore from "./App.store";

export default class SortPageStore {
  @observable
  sort?: Sort = undefined;

  @observable
  selectedTwitterChannel?: TwitterChannel = undefined;

  // @next -- we should pull in 3 or 4 sort images to have to render directly after button clicks to avoid loaders all together
  @observable
  isLoading = true;

  constructor(sort: Sort) {
    makeObservable(this);
    this.sort = sort;
    this.selectedTwitterChannel = AppStore.twitterChannels.find(
      (channel) => channel.screen_name === sort.twitter_channel
    );
  }

  getSort() {
    // can we get the image height && width from the server?
    return HttpForClient.getSortImage(AppStore.auth.profile!.handle).then(
      ({ data }) => {
        this.sort = data[0];
      }
    );
  }

  handleApprove() {
    this.isLoading = true;
    HttpForClient.approveImage(
      this.sort!.id,
      AppStore.auth.profile!.handle,
      this.selectedTwitterChannel!.screen_name
    ).then(() => this.getSort());
  }

  handleReject() {
    this.isLoading = true;
    HttpForClient.rejectImage(
      this.sort!.id,
      AppStore.auth.profile!.handle,
      this.selectedTwitterChannel!.screen_name
    ).then(() => this.getSort());
  }

  @action
  setSelectedTwitterChannel(twitterChannel: TwitterChannel) {
    this.selectedTwitterChannel = twitterChannel;
  }

  @action
  onLoadingComplete() {
    this.isLoading = false;
    // we wait to update the twitter channel here to keep the UI in sync
    this.selectedTwitterChannel = AppStore.twitterChannels.find(
      (channel) => channel.screen_name === this.sort!.twitter_channel
    );
  }
}

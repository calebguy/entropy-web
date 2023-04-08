import { action, makeObservable, observable } from "mobx";
import { HttpForClient } from "../services/Http";
import { Sort, TwitterChannel } from "./../interfaces/index";
import AppStore from "./App.store";

export default class SortPageStore {
  @observable
  sort?: Sort = undefined;

  @observable
  selectedTwitterChannel?: TwitterChannel = undefined;

  constructor(sort: Sort, currentTwitterChannel: TwitterChannel) {
    makeObservable(this);
    this.sort = sort;
    this.selectedTwitterChannel = currentTwitterChannel;
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
    HttpForClient.approveImage(
      this.sort!.id,
      AppStore.auth.profile!.handle,
      this.selectedTwitterChannel!.screen_name
    ).then(() => this.getSort());
  }

  handleReject() {
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
}

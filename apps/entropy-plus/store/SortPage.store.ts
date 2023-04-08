import { makeObservable, observable } from "mobx";
import { HttpForClient } from "../services/Http";
import { Nullable, Sort } from "./../interfaces/index";
import AppStore from "./App.store";

export default class SortPageStore {
  @observable
  sort: Nullable<Sort> = null;

  constructor(sort: Sort) {
    makeObservable(this);
    this.sort = sort;
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
      AppStore.auth.profile!.handle
    ).then(() => this.getSort());
  }

  handleReject() {
    HttpForClient.rejectImage(
      this.sort!.id,
      AppStore.auth.profile!.handle
    ).then(() => this.getSort());
  }
}

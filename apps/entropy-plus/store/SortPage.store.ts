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

  init() {}

  getSort() {
    // can we get the image height && width from the server?

    return HttpForClient.getSortImage(AppStore.auth.profile!.handle).then(
      ({ data }) => {
        this.sort = data[0];
      }
    );
  }
}

import { makeObservable, observable } from "mobx";
import { HttpForClient } from "../services/Http";
import AppStore from "./App.store";

export default class SortPageStore {
  @observable
  image = "";

  constructor() {
    makeObservable(this);
  }

  init() {
    // console.log("GOT HANDLE", AppStore.auth.profile!.handle);
    return HttpForClient.getSortImage(AppStore.auth.profile!.handle).then(
      ({ data }) => {
        console.log(data);
      }
    );
  }
}

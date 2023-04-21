import { makeObservable, observable } from "mobx";
import { CuratorPhoto } from "../interfaces";
import { HttpForClient } from "../services/Http";
import ScrollableDataProviderStore from "./ScrollableDataProvider.store";

export default class CuratorPageStore extends ScrollableDataProviderStore<CuratorPhoto> {
  @observable
  isLoading = true;

  constructor(private readonly slug: string) {
    super();
    makeObservable(this);
  }

  init() {
    this.isLoading = true;
    return HttpForClient.getCuratorPhotos(this.slug)
      .then(({ data }) => {
        this._data = data;
      })
      .finally(() => (this.isLoading = false));
  }
}

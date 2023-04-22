import { makeObservable, observable } from "mobx";
import { Photo } from "../interfaces";
import { HttpForClient } from "../services/Http";

export default class CuratorImageStore {
  @observable
  image?: Photo = undefined;

  constructor(private readonly slug: string, private readonly id: string) {
    makeObservable(this);
  }

  init() {
    return HttpForClient.getCuratorPhoto(this.slug, this.id).then(
      ({ data }) => (this.image = data)
    );
  }
}

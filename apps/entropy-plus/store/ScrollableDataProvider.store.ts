import { computed, makeObservable, observable } from "mobx";
import sleep from "utils/sleep";

// NOTE: this scrollable data provider is for providing fake paging data
// so we don't show 1000's of photos on the page at once causing big network requests

export default class ScrollableDataProviderStore<T> {
  private itemsPerPage = 25;

  @observable
  private page = 0;

  @observable
  protected _data: Array<T> = [];

  constructor(initialData?: Array<T>) {
    makeObservable(this);
    if (initialData) {
      this._data = initialData;
    }
  }

  async next() {
    sleep(1);
    this.page++;
  }

  @computed
  get hasMore() {
    return this._data.length > this.data.length;
  }

  @computed
  get dataLength() {
    return this.data.length;
  }

  @computed
  get data() {
    return this._data.slice(0, this.itemsPerPage * (this.page + 1));
  }
}

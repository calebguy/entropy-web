import { makeObservable, observable } from "mobx";
import { HttpForClient } from "../services/Http";
import AppStore from "./App.store";

export default class SortPageStore {
    @observable
    image = ""

    constructor() {
        makeObservable(this)
    }

    init() {
        return HttpForClient.getSortImage(AppStore.auth.profile!.handle)
    }
}
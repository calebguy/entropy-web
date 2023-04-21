import { computed } from "mobx";
import { Profile } from "../interfaces";
import AppStore from "./App.store";

export default class DashboardPageStore {
  constructor(private readonly leaderboard: Profile[] = []) {}

  @computed
  get rank() {
    return this.leaderboard.findIndex(
      (profile) => profile.handle === AppStore.auth.profile!.handle
    );
  }
}

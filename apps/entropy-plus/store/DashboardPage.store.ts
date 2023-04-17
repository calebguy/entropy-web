import { computed } from "mobx";
import { Profile } from "../interfaces";
import AppStore from "./App.store";

export default class DashboardPageStore {
  constructor(private readonly leaderboard: Profile[] = []) {}

  @computed
  get rank() {
    console.log(this.leaderboard);
    return this.leaderboard.findIndex(
      (profile) => profile.handle === AppStore.auth.profile!.handle
    );
  }
}

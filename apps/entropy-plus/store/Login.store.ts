import Http from "../services/Http";

export default class LoginStore {
  constructor() {
    // makeObservable(this);
  }

  async onSubmit(username: string, password: string) {
    const res = await Http.login({ username, password });
    console.log(res);
    // return Http.login({ username, password });
  }
}

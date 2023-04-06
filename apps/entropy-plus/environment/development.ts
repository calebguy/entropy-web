import { Env } from ".";

const proxyUrl = "https://entropy-plus.herokuapp.com/";
// const proxyUrl = null;

const env: Env = {
  app: { name: "[LOCAL] E+" },
  api: { baseUrl: "https://entropy-plus.herokuapp.com" },
};

if (proxyUrl) {
  env.api.baseUrl = proxyUrl;
}

export default env;

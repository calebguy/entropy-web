import { Env } from ".";

// const proxyUrl = "https://entropyplus.xyz/users";
const proxyUrl = null;

const env: Env = {
  app: { name: "[LOCAL] E+" },
  api: { baseUrl: "http://localhost:8000" },
};

if (proxyUrl) {
  env.api.baseUrl = proxyUrl;
}

export default env;

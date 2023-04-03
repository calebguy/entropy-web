import { Env } from ".";

const proxyUrl = "https://www.entropyplus.xyz";
// const proxyUrl = null;

const env: Env = {
  app: { name: "[LOCAL] E+" },
  api: { baseUrl: "https://entropyplus.xyz" },
};

if (proxyUrl) {
  env.api.baseUrl = proxyUrl;
}

export default env;

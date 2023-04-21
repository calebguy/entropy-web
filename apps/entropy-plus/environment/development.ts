import { Env } from ".";

// const proxyUrl = "http://localhost:8000";
const proxyUrl = null;

const env: Env = {
  app: { name: "[LOCAL] E+" },
  api: { baseUrl: "https://api.entropyplus.xyz" },
};

if (proxyUrl) {
  env.api.baseUrl = proxyUrl;
}

export default env;

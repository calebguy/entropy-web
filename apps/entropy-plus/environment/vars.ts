import { objectKeys } from "utils";

enum AppEnv {
  Production = "PRODUCTION",
  Staging = "STAGING",
  Development = "DEVELOPMENT",
}

interface Vars {
  AppEnv: AppEnv;
}

export const vars: Vars = {
  AppEnv: process.env.NEXT_PUBLIC_APP_ENV as AppEnv,
};

const assertVars = () => {
  const publicKeys = objectKeys(vars).filter((key) => {
    const t = key as string;
    return t.includes("NEXT_PUBLIC");
  });
  const privateKeys = objectKeys(vars).filter((key) => {
    return !publicKeys.includes(key);
  });

  let keysToValidate = publicKeys;
  if (typeof window === "undefined") {
    keysToValidate = privateKeys;
  }

  keysToValidate.forEach((key) => {
    if (vars[key] === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  });
};
assertVars();

export const isProd = () => vars.AppEnv === AppEnv.Production;
export const isStaging = () => vars.AppEnv === AppEnv.Staging;
export const isDev = () =>
  process.env.NODE_ENV === "development" && vars.AppEnv === AppEnv.Development;

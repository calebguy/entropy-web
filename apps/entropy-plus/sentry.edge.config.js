import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://558f2858f3cb4cbea6c60fbe238b9186@o1085152.ingest.sentry.io/6095625",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

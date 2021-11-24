import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://0c0822e240fa49b8b8a391f7b295848e@o1075895.ingest.sentry.io/6076932",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
function log(error) {
  Sentry.captureException(error);
}

const logger = {
  init,
  log,
};
export default logger;

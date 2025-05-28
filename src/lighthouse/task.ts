import { Flags, RunnerResult } from "lighthouse";
import {
  computeCategories,
  computeAudits,
  compareWithThresholds,
} from "./helpers.js";
import { LighthouseConfig } from "../types.js";
import { getDebugPort } from "./port-storage.js";

export const lighthouse =
  (callback: (results: RunnerResult) => void) =>
  async ({
    url,
    thresholds,
    opts = {},
    config,
  }: LighthouseConfig & { url: string; opts: Flags }) => {
    // Get the debugging port from our module-level storage
    const port = getDebugPort();

    if (port) {
      // Convert port to number since Lighthouse expects a number
      opts.port = parseInt(port, 10);

      if (!opts.onlyCategories) {
        opts.onlyCategories = Object.keys(thresholds ?? {});
      }

      if (opts.disableStorageReset === undefined) {
        opts.disableStorageReset = true;
      }

      // Use dynamic import for 'lighthouse'
      const lighthouse = (await import("lighthouse")).default;

      return lighthouse(url, opts, config).then((results) => {
        if (!results) return;
        if (callback) {
          callback(results);
        }

        const computedAudits = computeAudits(results.lhr.audits);
        const computedCategories = computeCategories(results.lhr.categories);

        const allMetrics = { ...computedAudits, ...computedCategories };

        return compareWithThresholds(
          allMetrics,
          thresholds as Record<string, number>,
        );
      });
    }

    throw new Error(
      "The Cypress port could not be resolved. Have you setup the project following this guide: https://github.com/mfrachet/cypress-audit/blob/master/packages/lighthouse/README.md#preparing-the-server-configuration ?",
    );
  };

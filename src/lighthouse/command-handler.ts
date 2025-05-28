import { Flags } from "lighthouse";
import {
  LighthouseConfig,
  LighthouseResult,
  LighthouseThresholds,
} from "../types.js";

const defaultThresholds = {
  performance: 0,
  accessibility: 0,
  "best-practices": 0,
  seo: 0,
} as const satisfies LighthouseThresholds;

const VALID_BROWSERS: Record<string, boolean> = {
  Chrome: true,
  Chromium: true,
  Canary: true,
};

const lighthouseCommandHandler = (
  thresholds?: LighthouseThresholds,
  opts?: Flags,
  config?: LighthouseConfig,
): Cypress.Chainable => {
  if (!VALID_BROWSERS[Cypress.browser.displayName]) {
    return cy.log(
      "cy.lighthouse()",
      `${Cypress.browser.displayName} is not supported. Skipping...`,
    );
  }

  return cy.url().then((url) => {
    // Handling the default value in cypress.json for "thresholds", "config" and "options"
    // Use type assertion to handle custom config property
    const lighthouseConfig = Cypress.env("lighthouse") as
      | LighthouseConfig
      | undefined;

    const configThresholds = lighthouseConfig
      ? lighthouseConfig.thresholds
      : undefined;

    const globalOptions = lighthouseConfig
      ? lighthouseConfig.options
      : undefined;

    const globalConfig = lighthouseConfig ? lighthouseConfig.config : undefined;

    if (!thresholds && !configThresholds) {
      cy.log(
        "cypress-audit",
        "It looks like you have not set thresholds yet. The test will be based on the 100 score for every metrics. Refer to https://github.com/mfrachet/cypress-audit to have more information and set thresholds by yourself :).",
      );
    }

    cy.log("-------- cy.lighthouse --------");
    return cy
      .task<LighthouseResult>("lighthouse", {
        url,
        thresholds: thresholds || configThresholds || defaultThresholds,
        opts: opts || globalOptions,
        config: config || globalConfig,
      })
      .then((lighthouseResult) => {
        if (!lighthouseResult) {
          throw new Error(
            "For an unexpected reason, lighthouse did not manage to run correctly. It might be related to lighthouse itself.",
          );
        }

        const { errors, results } = lighthouseResult;
        results.forEach((res) => {
          cy.log(res);
        });
        cy.log("-----------------------------");

        return cy.wrap(errors);
      })
      .then((errors) => {
        if (errors && errors.length > 0) {
          // Convert JQuery<string[]> to string[] if needed
          const errorArray = Array.isArray(errors) ? errors : errors.toArray();
          const formatedErrors = `\n\n${errorArray.join("\n")}`;

          const label =
            errorArray.length === 1
              ? `cy.lighthouse - A threshold has been crossed.${formatedErrors}`
              : `cy.lighthouse - Some thresholds have been crossed.${formatedErrors}`;
          throw new Error(label);
        }
      });
  });
};

export default lighthouseCommandHandler;

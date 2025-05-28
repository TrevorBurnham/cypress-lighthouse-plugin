import lighthouseCommandHandler from "./lighthouse/command-handler.js";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to run Lighthouse audit on the current page
       * @param thresholds - Performance thresholds to test against
       * @param opts - Lighthouse options
       * @param config - Lighthouse configuration
       */
      lighthouse(
        thresholds?: Record<string, number>,
        opts?: Record<string, unknown>,
        config?: Record<string, unknown>,
      ): Chainable<void>;
    }
  }
}

Cypress.Commands.add("lighthouse", lighthouseCommandHandler);

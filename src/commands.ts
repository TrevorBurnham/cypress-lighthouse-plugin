import lighthouseCommandHandler from "./lighthouse/command-handler.js";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to run Lighthouse audit on the current page
       * @param thresholds - Performance thresholds to test against
       * @param opts - Lighthouse options
       * @param config - Lighthouse configuration
       * @param identifier - Optional identifier to distinguish reports
       */
      lighthouse(
        thresholds?: Record<string, number>,
        opts?: Record<string, unknown>,
        config?: Record<string, unknown>,
        identifier?: string,
      ): Chainable<void>;
    }
  }
}

Cypress.Commands.add("lighthouse", lighthouseCommandHandler);

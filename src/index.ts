import { prepareAudit } from "./lighthouse/prepare-audit.js";
import { lighthouse } from "./lighthouse/task.js";

// Re-export all types from the types file
export type * from "./types.js";

// Export main functions
export { lighthouse, prepareAudit };

// Global Cypress command declarations for backward compatibility
// with older TypeScript configurations that don't understand exports field
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

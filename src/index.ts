import { prepareAudit } from "./lighthouse/prepare-audit.js";
import { lighthouse } from "./lighthouse/task.js";

// Re-export all types from the types file
export type * from "./types.js";

// Export main functions
export { lighthouse, prepareAudit };

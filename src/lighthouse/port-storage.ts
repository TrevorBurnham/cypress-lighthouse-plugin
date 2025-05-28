/**
 * A module to store and retrieve the Chrome debugging port
 * This avoids using global variables while still allowing sharing
 * between the prepare-audit and task modules
 */

// Module-level variable to store the port
let debugPort: string | null = null;

/**
 * Set the Chrome debugging port
 * @param port - The Chrome debugging port
 */
export const setDebugPort = (port: string): void => {
  debugPort = port;
};

/**
 * Get the Chrome debugging port
 * @returns The Chrome debugging port or null if not set
 */
export const getDebugPort = (): string | null => {
  return debugPort;
};

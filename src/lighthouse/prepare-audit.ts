import { LaunchOptions } from "../types.js";
import { setDebugPort } from "./port-storage.js";

/**
 * Prepares the environment for a Lighthouse audit
 * @param launchOptions - Browser launch options containing remote debugging port
 */
const prepareAudit = (launchOptions: LaunchOptions): void => {
  const remoteDebugging = launchOptions.args.find((config) =>
    config.startsWith("--remote-debugging-port"),
  );

  if (remoteDebugging) {
    // Extract the port number from the remote debugging argument
    const portMatch = remoteDebugging.split("=")[1];
    if (portMatch) {
      // Store the port in our module-level storage
      setDebugPort(portMatch);
    }
  } else {
    console.error(
      `[cypress-audit]: Woops, something went wrong when trying to get the browser port. Are sure you run your tests in a chromium based browser?

			npx cypress run --browser=chrome
		`,
    );
  }
};

export { prepareAudit };

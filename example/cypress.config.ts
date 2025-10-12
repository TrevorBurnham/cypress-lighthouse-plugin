import { defineConfig } from "cypress";
import { writeFile } from "node:fs/promises";
import { LaunchOptions, lighthouse, prepareAudit } from "../dist/index.js";

export default defineConfig({
  e2e: {
    specPattern: "cypress/**/*.cy.ts",
    defaultBrowser: "chrome",
    setupNodeEvents(on) {
      on("before:browser:launch", (_, launchOptions: LaunchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(async (lighthouseResult, identifier) => {
          const filename = identifier
            ? `lighthouse-report-${identifier}.json`
            : "lighthouse-report.json";
          await writeFile(filename, lighthouseResult.report);
          console.log(`Saved Lighthouse report as ${filename}.`);
        }),
      });
    },
  },
});

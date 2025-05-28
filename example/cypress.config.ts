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
        lighthouse: lighthouse(async (lighthouseResult) => {
          await writeFile("lighthouse-report.json", lighthouseResult.report);
          console.log("Saved Lighthouse report as lighthouse-report.json.");
        }),
      });
    },
  },
});

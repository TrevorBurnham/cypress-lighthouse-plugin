# cypress-lighthouse-plugin

This plugin integrates Google Lighthouse with Cypress, allowing you to run performance, accessibility, best practices, and SEO audits as part of your Cypress test suite.

## Installation

```bash
npm install cypress-lighthouse-plugin
```

The [lighthouse](https://www.npmjs.com/package/lighthouse) package should be installed automatically as a peer dependency.

## Setup

### 1. Update your Cypress configuration

In your `cypress.config.ts`:

```ts
import { defineConfig } from "cypress";
import { writeFile } from "node:fs/promises";
import { lighthouse, prepareAudit } from "cypress-lighthouse-plugin";

export default defineConfig({
  e2e: {
    specPattern: "cypress/**/*.cy.ts",
    defaultBrowser: "chrome", // Lighthouse only works with Chrome/Chromium
    setupNodeEvents(on) {
      // Set up the plugin before launching the browser
      on("before:browser:launch", (_, launchOptions) => {
        prepareAudit(launchOptions);
      });

      // Register the lighthouse task
      on("task", {
        lighthouse: lighthouse(async (lighthouseResult) => {
          // Optional: Save the lighthouse report to a file
          await writeFile("lighthouse-report.json", lighthouseResult.report);
          console.log("Saved Lighthouse report as lighthouse-report.json.");
        }),
      });
    },
  },
});
```

### 2. Import the commands in your support file

In your `cypress/support/e2e.ts`:

```ts
// Import the lighthouse command
import "cypress-lighthouse-plugin/commands";
```

## Usage

Now you can use the `cy.lighthouse()` command in your tests:

```ts
describe("Lighthouse", () => {
  it("should audit the page", () => {
    cy.visit("https://example.com");
    cy.lighthouse();
  });
});
```

### Custom thresholds

You can specify custom thresholds for your Lighthouse audit to exceed. If your score falls below any of these thresholds, you'll get a test failure:

```ts
cy.lighthouse({
  performance: 85,
  accessibility: 90,
  "best-practices": 85,
  seo: 80,
});
```

All thresholds are set to 0 by default.

### Custom Lighthouse options

You can pass custom options to the Lighthouse audit:

```ts
cy.lighthouse(
  // Thresholds
  {
    performance: 85,
    accessibility: 90,
  },
  // Lighthouse options
  {
    formFactor: "desktop",
    screenEmulation: { disabled: true },
  },
);
```

### Custom Lighthouse configuration

You can also pass a custom Lighthouse configuration:

```ts
cy.lighthouse(
  // Thresholds
  {
    performance: 85,
    accessibility: 90,
  },
  // Lighthouse options
  {
    formFactor: "desktop",
  },
  // Lighthouse configuration
  {
    extends: "lighthouse:default",
    settings: {
      onlyCategories: ["performance", "accessibility"],
    },
  },
);
```

## Global Configuration

You can set global thresholds, options, and configuration in your `cypress.config.ts`:

```ts
import { defineConfig } from "cypress";
import { lighthouse, prepareAudit } from "cypress-lighthouse-plugin";

export default defineConfig({
  e2e: {
    // ...other config
    setupNodeEvents(on) {
      // ...setup as shown above
    },
  },
  env: {
    lighthouse: {
      thresholds: {
        performance: 85,
        accessibility: 90,
        "best-practices": 85,
        seo: 80,
      },
      options: {
        formFactor: "desktop",
        screenEmulation: { disabled: true },
      },
      config: {
        extends: "lighthouse:default",
        settings: {
          onlyCategories: ["performance", "accessibility"],
        },
      },
    },
  },
});
```

## Credits

This package is adapted from the Lighthouse audit feature in Marvin Frachet's [cypress-audit](https://github.com/mfrachet/cypress-audit) package. It's been updated to support newer versions of Cypress and Lighthouse.

## License

MIT

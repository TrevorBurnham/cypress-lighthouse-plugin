declare namespace Cypress {
  interface ConfigOptions {
    lighthouse?: {
      thresholds?: Record<string, number>;
      options?: Record<string, unknown>;
      config?: Record<string, unknown>;
    };
  }

  interface ResolvedConfigOptions {
    lighthouse?: {
      thresholds?: Record<string, number>;
      options?: Record<string, unknown>;
      config?: Record<string, unknown>;
    };
  }
}

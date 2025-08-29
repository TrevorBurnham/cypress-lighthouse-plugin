/**
 * Types for cypress-lighthouse-plugin
 */

// Re-export types from lighthouse module
import type {
  Flags,
  RunnerResult,
  Config,
  SharedFlagsSettings,
} from "lighthouse";
export type { Flags, RunnerResult, Config, SharedFlagsSettings };

// Browser launch options
export interface LaunchOptions {
  args: string[];
}

// Lighthouse thresholds for different categories
export interface LighthouseThresholds {
  performance?: number;
  accessibility?: number;
  "best-practices"?: number;
  seo?: number;
  pwa?: number;
  [key: string]: number | undefined;
}

// Configuration for Lighthouse
export interface LighthouseConfig {
  thresholds?: LighthouseThresholds;
  options?: SharedFlagsSettings;
  config?: Config;
}

// Result of a Lighthouse comparison
export interface ComparisonResult {
  errors: string[];
  results: string[];
}

// Metrics with score (for categories)
export interface MetricWithScore {
  score: number;
  numericValue?: never;
}

// Metrics with numeric value (for audits)
export interface MetricWithNumericValue {
  numericValue: number;
  score?: never;
}

// Combined metric type
export type Metric = MetricWithScore | MetricWithNumericValue;

// Result of a Lighthouse audit
export interface LighthouseResult {
  errors: string[];
  results: string[];
  report?: string;
}

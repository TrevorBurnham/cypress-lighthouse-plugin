import { ComparisonResult, Metric, MetricWithNumericValue, MetricWithScore } from "../types.js";

/**
 * Compute the general categories of lighthouse
 * - performances
 * - accessiblity
 * - best-practices
 * - seo
 * - pwa
 */
const computeCategories = (
  categories: Record<string, { score?: number | null }>,
): Record<string, MetricWithScore> => {
  return Object.keys(categories).reduce(
    (metrics, curr) => {
      const category = categories[curr];
      if (category && typeof category.score === "number") {
        return {
          ...metrics,
          [curr]: { score: category.score * 100 },
        };
      }
      return metrics;
    },
    {} as Record<string, MetricWithScore>,
  );
};

/**
 * Compute the different audit informations such as
 * - first-contentful-paint
 * - largest-contentful-paint
 * - first-meaningful-paint
 * - etc...
 */
const computeAudits = (
  audits: Record<string, { numericValue?: number }>,
): Record<string, MetricWithNumericValue> => {
  return Object.keys(audits).reduce(
    (metrics, curr) => {
      const auditValue = audits[curr];
      if (auditValue && typeof auditValue.numericValue === "number") {
        return {
          ...metrics,
          [curr]: { numericValue: auditValue.numericValue },
        };
      }
      return metrics;
    },
    {} as Record<string, MetricWithNumericValue>,
  );
};

const compareWithThresholds = (
  metrics: Record<string, Metric>,
  thresholds: Record<string, number>,
): ComparisonResult => {
  const errors: string[] = [];
  const results: string[] = [];

  Object.keys(thresholds).forEach((key) => {
    const actualTreshold = thresholds[key];
    const actualMetric = metrics[key];

    if (!actualMetric) {
      errors.push(`Metric ${key} not found in lighthouse report`);
      return;
    }

    if (actualTreshold === undefined) {
      errors.push(`Threshold for ${key} is not defined`);
      return;
    }

    // Audits have a numericValue field that often corresponds to the time spend for the actual audit
    // On the other hand, categories (like performances, best-practices, accessibility etc...) owns a score.
    // When dealing with numericValue, we always want to lighthouse report to be lower than the thresholds
    // On the other hand, when dealing with scores, we always want the lighthouse report to be over that threshold
    if (
      "numericValue" in actualMetric &&
      actualMetric.numericValue !== undefined
    ) {
      if (actualTreshold < actualMetric.numericValue) {
        errors.push(
          `${key} record is ${actualMetric.numericValue} and is over the ${actualTreshold} threshold`,
        );
      } else {
        results.push(
          `${key} record is ${actualMetric.numericValue} and threshold was ${actualTreshold}`,
        );
      }
    } else if ("score" in actualMetric) {
      if (actualTreshold > actualMetric.score) {
        errors.push(
          `${key} record is ${actualMetric.score} and is under the ${actualTreshold} threshold`,
        );
      } else {
        results.push(
          `${key} record is ${actualMetric.score} and threshold was ${actualTreshold}`,
        );
      }
    }
  });

  return { errors, results };
};

export { computeCategories, computeAudits, compareWithThresholds };

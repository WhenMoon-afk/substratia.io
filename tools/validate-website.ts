#!/usr/bin/env npx tsx
/**
 * Website Quality Validator
 *
 * Proactive validation tool that catches issues before users see them.
 * Run after any website changes to ensure quality.
 *
 * Usage:
 *   npx tsx tools/validate-website.ts [options]
 *
 * Options:
 *   --url URL      Base URL to test (default: http://localhost:3000)
 *   --pages        Comma-separated pages to test (default: /,/start-here,/tools)
 *   --json         Output as JSON
 *   --fix          Attempt to fix common issues
 */

import { chromium, Browser, Page, ConsoleMessage } from "playwright";

interface ValidationResult {
  url: string;
  status: "pass" | "fail" | "warn";
  consoleErrors: string[];
  consoleWarnings: string[];
  networkErrors: string[];
  cspViolations: string[];
  brokenImages: string[];
  accessibilityIssues: string[];
  performanceMetrics: {
    ttfb: number;
    domContentLoaded: number;
    loadTime: number;
  };
}

interface ValidationReport {
  timestamp: string;
  baseUrl: string;
  overallStatus: "pass" | "fail" | "warn";
  results: ValidationResult[];
  summary: {
    totalPages: number;
    passed: number;
    failed: number;
    warnings: number;
    totalConsoleErrors: number;
    totalNetworkErrors: number;
  };
}

const DEFAULT_PAGES = [
  "/",
  "/start-here",
  "/tools",
  "/reviews",
  "/research",
  "/blog",
  "/docs",
  "/faq",
  "/memory-tools",
  "/privacy",
  "/terms",
];

async function validatePage(
  browser: Browser,
  baseUrl: string,
  path: string,
): Promise<ValidationResult> {
  const page = await browser.newPage();
  const url = `${baseUrl}${path}`;

  const consoleErrors: string[] = [];
  const consoleWarnings: string[] = [];
  const networkErrors: string[] = [];
  const cspViolations: string[] = [];
  const brokenImages: string[] = [];

  // Capture console messages
  page.on("console", (msg: ConsoleMessage) => {
    const text = msg.text();
    if (msg.type() === "error") {
      // Filter out CSP violations (tracked separately)
      if (text.includes("Content Security Policy")) {
        cspViolations.push(text);
      } else {
        consoleErrors.push(text);
      }
    } else if (msg.type() === "warning") {
      consoleWarnings.push(text);
    }
  });

  // Capture network failures
  page.on("requestfailed", (request) => {
    const failure = request.failure();
    networkErrors.push(
      `${request.url()}: ${failure?.errorText || "Unknown error"}`,
    );
  });

  // Capture page errors
  page.on("pageerror", (error) => {
    consoleErrors.push(`Page error: ${error.message}`);
  });

  let performanceMetrics = { ttfb: 0, domContentLoaded: 0, loadTime: 0 };

  try {
    const startTime = Date.now();
    const response = await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    const loadTime = Date.now() - startTime;

    // Get performance timing
    const timing = await page.evaluate(() => {
      const perf = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;
      return {
        ttfb: perf.responseStart - perf.requestStart,
        domContentLoaded: perf.domContentLoadedEventEnd - perf.startTime,
      };
    });

    performanceMetrics = {
      ttfb: Math.round(timing.ttfb),
      domContentLoaded: Math.round(timing.domContentLoaded),
      loadTime,
    };

    // Check for broken images
    const images = await page.$$eval("img", (imgs) =>
      imgs
        .filter((img) => !img.complete || img.naturalHeight === 0)
        .map((img) => img.src),
    );
    brokenImages.push(...images);

    // Basic accessibility check - missing alt text
    const imagesWithoutAlt = await page.$$eval("img:not([alt])", (imgs) =>
      imgs.map((img) => img.src),
    );
    const accessibilityIssues = imagesWithoutAlt.map(
      (src) => `Missing alt text: ${src}`,
    );

    // Check for empty links
    const emptyLinks = await page.$$eval(
      'a:not([href]), a[href=""], a[href="#"]',
      (links) => links.map((a) => a.textContent || "(empty)"),
    );
    accessibilityIssues.push(
      ...emptyLinks.map((text) => `Empty/invalid link: ${text}`),
    );

    // Determine status
    let status: "pass" | "fail" | "warn" = "pass";
    if (
      consoleErrors.length > 0 ||
      networkErrors.length > 0 ||
      cspViolations.length > 0 ||
      brokenImages.length > 0
    ) {
      status = "fail";
    } else if (consoleWarnings.length > 0 || accessibilityIssues.length > 0) {
      status = "warn";
    }

    return {
      url,
      status,
      consoleErrors,
      consoleWarnings,
      networkErrors,
      cspViolations,
      brokenImages,
      accessibilityIssues,
      performanceMetrics,
    };
  } catch (error) {
    return {
      url,
      status: "fail",
      consoleErrors: [`Failed to load page: ${error}`],
      consoleWarnings,
      networkErrors,
      cspViolations,
      brokenImages,
      accessibilityIssues: [],
      performanceMetrics,
    };
  } finally {
    await page.close();
  }
}

async function runValidation(
  baseUrl: string,
  pages: string[],
): Promise<ValidationReport> {
  const browser = await chromium.launch({ headless: true });
  const results: ValidationResult[] = [];

  for (const path of pages) {
    process.stdout.write(`Validating ${path}...`);
    const result = await validatePage(browser, baseUrl, path);
    results.push(result);
    console.log(` ${result.status.toUpperCase()}`);
  }

  await browser.close();

  const passed = results.filter((r) => r.status === "pass").length;
  const failed = results.filter((r) => r.status === "fail").length;
  const warnings = results.filter((r) => r.status === "warn").length;

  return {
    timestamp: new Date().toISOString(),
    baseUrl,
    overallStatus: failed > 0 ? "fail" : warnings > 0 ? "warn" : "pass",
    results,
    summary: {
      totalPages: results.length,
      passed,
      failed,
      warnings,
      totalConsoleErrors: results.reduce(
        (sum, r) => sum + r.consoleErrors.length + r.cspViolations.length,
        0,
      ),
      totalNetworkErrors: results.reduce(
        (sum, r) => sum + r.networkErrors.length,
        0,
      ),
    },
  };
}

function printReport(report: ValidationReport, json: boolean) {
  if (json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log("\n" + "=".repeat(60));
  console.log("WEBSITE VALIDATION REPORT");
  console.log("=".repeat(60));
  console.log(`Base URL: ${report.baseUrl}`);
  console.log(`Timestamp: ${report.timestamp}`);
  console.log(
    `Overall Status: ${report.overallStatus.toUpperCase()} ${report.overallStatus === "pass" ? "✅" : report.overallStatus === "warn" ? "⚠️" : "❌"}`,
  );
  console.log("-".repeat(60));
  console.log("Summary:");
  console.log(`  Total Pages: ${report.summary.totalPages}`);
  console.log(`  Passed: ${report.summary.passed} ✅`);
  console.log(`  Failed: ${report.summary.failed} ❌`);
  console.log(`  Warnings: ${report.summary.warnings} ⚠️`);
  console.log(`  Console Errors: ${report.summary.totalConsoleErrors}`);
  console.log(`  Network Errors: ${report.summary.totalNetworkErrors}`);

  // Show details for failed/warned pages
  for (const result of report.results) {
    if (result.status !== "pass") {
      console.log("\n" + "-".repeat(60));
      console.log(
        `${result.url} - ${result.status.toUpperCase()} ${result.status === "fail" ? "❌" : "⚠️"}`,
      );

      if (result.consoleErrors.length > 0) {
        console.log("\n  Console Errors:");
        result.consoleErrors.forEach((e) => console.log(`    ❌ ${e}`));
      }

      if (result.cspViolations.length > 0) {
        console.log("\n  CSP Violations:");
        result.cspViolations.forEach((e) => console.log(`    🔒 ${e}`));
      }

      if (result.networkErrors.length > 0) {
        console.log("\n  Network Errors:");
        result.networkErrors.forEach((e) => console.log(`    🌐 ${e}`));
      }

      if (result.brokenImages.length > 0) {
        console.log("\n  Broken Images:");
        result.brokenImages.forEach((e) => console.log(`    🖼️ ${e}`));
      }

      if (result.accessibilityIssues.length > 0) {
        console.log("\n  Accessibility Issues:");
        result.accessibilityIssues.forEach((e) => console.log(`    ♿ ${e}`));
      }

      if (result.consoleWarnings.length > 0) {
        console.log("\n  Warnings:");
        result.consoleWarnings.forEach((e) => console.log(`    ⚠️ ${e}`));
      }
    }
  }

  console.log("\n" + "=".repeat(60));
}

// Parse arguments
const args = process.argv.slice(2);
const baseUrl =
  args.find((a) => a.startsWith("--url="))?.split("=")[1] ||
  "http://localhost:3000";
const pagesArg = args.find((a) => a.startsWith("--pages="))?.split("=")[1];
const pages = pagesArg ? pagesArg.split(",") : DEFAULT_PAGES;
const json = args.includes("--json");

// Run validation
console.log(`\nValidating website at ${baseUrl}...\n`);

runValidation(baseUrl, pages)
  .then((report) => {
    printReport(report, json);
    process.exit(report.overallStatus === "fail" ? 1 : 0);
  })
  .catch((error) => {
    console.error("Validation failed:", error);
    process.exit(1);
  });

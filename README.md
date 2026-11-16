# Playwright TypeScript Automation Reference Framework

An enterprise-grade end-to-end UI and API test automation framework built with **Playwright** and **TypeScript**. Designed to demonstrate scalable test architecture, low-maintenance abstractions, fast root-cause analysis, and tiered CI/CD quality gates.

---

## Architectural Principles & Engineering Standards

* **Page Object Model (POM):** Isolates UI locators and page-level interactions inside dedicated TypeScript classes (`src/pages/`), ensuring UI changes require updates in a single location rather than across test specs.
* **Custom Fixture Dependency Injection:** Extends Playwright's base `test` runner (`src/fixtures/base.fixture.ts`) to instantiate and inject Page Objects on demand, eliminating repetitive `beforeEach` boilerplate and guaranteeing test isolation during parallel runs.
* **Data-Driven & API-Ready Testing:** Separates test payloads from test logic (`src/data/`) and leverages Playwright's native `APIRequestContext` (`tests/api/`) to validate backend health and support fast API-driven test data setup.
* **Zero-Flake Execution & Trace Debugging:** Enforces web-first auto-retrying assertions over hard sleeps and configures `trace: 'on-first-retry'` to capture interactive DOM snapshots, network logs, and console errors on CI failures without slowing down passing runs.

---

## Project Structure

```text
playwright-reference-framework/
├── .github/workflows/
│   └── playwright.yml         # Tiered GitHub Actions CI/CD pipeline
├── src/
│   ├── data/
│   │   └── users.json         # Externalized test data payloads
│   ├── fixtures/
│   │   └── base.fixture.ts    # Custom fixtures for POM dependency injection
│   └── pages/
│       ├── login.page.ts      # Authentication page locators & actions
│       └── inventory.page.ts  # Product catalog locators & actions
├── tests/
│   ├── api/
│   │   └── health.spec.ts     # REST API integration checks
│   └── ui/
│       ├── login.spec.ts      # Authentication & negative login flows
│       └── cart.spec.ts       # Shopping cart state verification
├── package.json               # Tag-based test execution scripts
└── playwright.config.ts       # Global timeouts, baseURL, retries, and reporters
```

---

## Tiered CI/CD Execution Strategy

Configured via **GitHub Actions** (`.github/workflows/playwright.yml`) to balance developer velocity with thorough regression coverage:

* **Developer Check-In & Pull Requests (`push` / `pull_request`):** Executes fast `@smoke` tests (`npm run test:smoke`) to provide rapid feedback and block regressions prior to merge.
* **Scheduled Nightly Regression (`cron`):** Executes the full UI and API suite (`npm test`) every weekday overnight so daytime engineering workflows remain uninterrupted.
* **On-Demand Execution (`workflow_dispatch`):** Supports manual pipeline triggers directly from GitHub Actions.
* **Artifact Retention:** Automatically publishes downloadable HTML reports and failure trace recordings (`playwright-report`) on every run for rapid triage.

---

## Getting Started Locally

### Prerequisites
* Node.js (v20+ LTS)
* npm

### Installation & Execution
```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps

# Run all tests
npm test

# Run fast smoke suite only
npm run test:smoke

# Run regression suite (excluding smoke)
npm run test:regression

# Open interactive HTML test report
npm run report
```

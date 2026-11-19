# Testing Guide

This guide explains how to plan, write, run, and maintain tests for a frontend
project. It is framework-independent, so commands and tool names can be
adapted to the project's test runner.

## Testing Goals

Good tests should:

- Verify that real user-facing behavior works.
- Detect regressions quickly and reliably.
- Give clear failure information.
- Run quickly and deterministically.
- Test behavior instead of implementation details.
- Be easy to understand and maintain.

## Testing Pyramid

Use the testing pyramid as a guide for the test mix:

```text
        End-to-End Tests
       /               \
  Integration Tests
     /             \
  Unit Tests
```

- **Unit tests**: Fast, isolated tests for functions, components, calculations,
  validation rules, and state transitions.
- **Integration tests**: Tests for interactions between components or modules,
  including API mocks and state management.
- **End-to-end (E2E) tests**: High-level browser tests for complete user flows
  such as login, checkout, or submitting a form.

Write many unit tests, fewer integration tests, and only the E2E tests needed
for critical journeys.

## Types of Testing

| Type | Purpose | Typical scope |
| --- | --- | --- |
| Unit testing | Verify one small unit in isolation | Function or component |
| Integration testing | Verify that modules work together | Components, APIs, services |
| End-to-end testing | Verify complete behavior in a browser | Critical user journeys |
| Smoke testing | Confirm that a build is usable | Key application paths |
| Regression testing | Check that existing behavior remains intact | Previously failing or affected features |
| Acceptance testing | Confirm that requirements are met | Product/business scenarios |
| Accessibility testing | Check usability for people using assistive technology | Keyboard navigation, screen readers, WCAG |
| Performance testing | Detect slow rendering or unstable resource usage | Load, stress, render time, bundle size |
| Security testing | Find security weaknesses | Input handling, authentication, authorization |
| Usability testing | Evaluate clarity and ease of use | User experience and workflows |
| Visual regression testing | Detect unintended UI changes | Layout, styling, responsive views |
| Exploratory testing | Discover risks without a predefined script | Unknown or complex behavior |

## Suggested Test Layers

### Functional Testing

Verify expected behavior for:

- Normal/expected input.
- Empty and missing values.
- Invalid values and boundary conditions.
- Loading, success, and error states.
- Disabled, pending, expired, and unauthorized states.
- Keyboard and pointer interactions.
- Desktop and mobile layouts.

### Non-Functional Testing

Include checks for:

- Accessibility.
- Responsive behavior.
- Page load and interaction performance.
- Network failure and retry behavior.
- Browser compatibility.
- Security and privacy.
- Localization and text expansion.

## Recommended Project Structure

```text
tests/
  unit/
  integration/
  e2e/
  fixtures/
  helpers/
src/
  components/
  services/
  utils/
```

Keep test files close to the code when that improves discoverability, or use a
single `tests/` directory for a consistent E2E convention. Do not mix both
patterns unnecessarily.

## Writing a Good Test

Use the Arrange, Act, Assert pattern:

1. **Arrange**: Set up input, state, and mocks.
2. **Act**: Perform the action being tested.
3. **Assert**: Verify the observable result.

Example test name:

```text
displays an error message when an email is invalid
```

Avoid tests that:

- Depend on random values or the current date without control.
- Sleep for an arbitrary delay.
- Use brittle CSS paths for DOM selection.
- Duplicate the same assertion repeatedly.
- Assert implementation details instead of user-visible behavior.
- Depend on network calls or shared test data.
- Leave asynchronous work unfinished.

Prefer stable selectors such as accessible names, roles, labels, or explicitly
assigned test IDs.

## Test Data

- Use realistic but non-sensitive sample data.
- Create isolated data for each test.
- Clean up records and external state after tests.
- Mock third-party services only where the integration is not under test.
- Keep secrets in environment variables or a secret manager.
- Never commit passwords, access tokens, API keys, or personal data.

## Running Tests

Add scripts to the project's package manager once a test runner is configured.
Example scripts might include:

```json
{
  "scripts": {
    "test": "run-unit-and-integration-tests",
    "test:watch": "run-tests-in-watch-mode",
    "test:e2e": "run-end-to-end-tests",
    "test:coverage": "run-tests-and-report-coverage"
  }
}
```

Replace the example command values with the commands supported by the selected
framework. Common development workflows are:

```powershell
npm test
npm run test:watch
npm run test:e2e
npm run test:coverage
```

Run the smallest relevant test suite while developing, then run the full suite
before merging or releasing.

## Coverage

Coverage indicates which lines or branches execute during tests. It does not
prove test quality.

Useful metrics include:

- Statement coverage.
- Branch coverage.
- Function coverage.
- Line coverage.

Set a practical coverage threshold for changed code and prioritize meaningful
behavior over increasing a percentage.

## Debugging Failed Tests

When a test fails:

1. Read the complete assertion and stack trace.
2. Reproduce it locally.
3. Identify whether the failure is a product defect or a test defect.
4. Confirm the test is isolated and deterministic.
5. Fix the root cause.
6. Add or update a focused regression test.
7. Re-run the failing test and the relevant suite.

Capture screenshots, videos, browser logs, API responses, and request IDs for
intermittent or environment-dependent failures.

## CI/CD Testing

A CI pipeline should commonly:

1. Install dependencies with a locked package version set.
2. Run linting and formatting checks.
3. Run unit and integration tests.
4. Build the application.
5. Run critical E2E tests.
6. Upload test reports and coverage.
7. Block merging or deployment if required checks fail.

For pull requests, run fast checks before expensive browser suites. Keep
production-deployment smoke tests available as a final safety net.

## Browser and Device Coverage

Test a representative mix based on the supported audience, for example:

- Latest Chrome, Edge, Firefox, and Safari.
- Common mobile and desktop screen sizes.
- Narrow text and zoom levels.
- Touch and keyboard-only navigation.
- Reduced-motion settings.
- Offline or unreliable network conditions.

Do not attempt to test every browser-device combination if the supported
matrix is small.

## Accessibility Checklist

- All controls are reachable and usable by keyboard.
- Focus order is logical and visible.
- Dialogs move and restore focus correctly.
- Images have appropriate alternative text.
- Form inputs have visible labels and accessible error text.
- Status and validation messages are announced when needed.
- Color contrast meets applicable WCAG requirements.
- Meaning is not communicated by color alone.
- The page remains usable with zoom and text scaling.

## Bug Report Template

```text
Title:
Environment:
Build/version:
Browser and device:
Steps to reproduce:
Expected result:
Actual result:
Reproducibility:
Logs/screenshots/video:
Possible impact:
```

## Definition of Done

A change is test-ready when:

- Acceptance criteria are covered.
- Happy paths and relevant edge cases are tested.
- Regression risks are addressed.
- Tests are deterministic and isolated.
- No new secrets or sensitive data are committed.
- The CI suite passes.
- Accessibility and responsive behavior are considered.
- Test reports are available for failures.

## Maintenance

- Remove obsolete tests.
- Refactor duplicated setup.
- Replace brittle selectors.
- Investigate flaky tests immediately.
- Review failing tests instead of skipping or disabling them silently.
- Keep dependencies and browser binaries updated.
- Document environment-specific setup in this README.
#  Process
node-test - create simple node app
npm init -y
export signifies that the method can be used by other files also
export const should be included in curly braces 
export default should not be included in curly braces

---
name: coverage
description: "Run code coverage, show area breakdown, identify low-coverage gaps, and report test status"
user_invocable: true
---

# Code Coverage Report

Run the full test suite with coverage, parse the output, and present a structured summary.

## Project Selection

This skill supports multiple projects. The project is determined by the skill args:

- **No args** or `assetsflow` → `C:/Users/victo/Projects/assetsflow` (default)
- `acreford` → `C:/Users/victo/Projects/acreford.com/functions`

### Project Configs

| Project | Path | Test command | Coverage format | Source dir |
|---------|------|-------------|----------------|------------|
| assetsflow | `C:/Users/victo/Projects/assetsflow` | `npx vitest run --coverage` | V8 (`coverage/coverage-final.json`, uses `s`/`statementMap`/`fnMap`/`branchMap`) | `src/` |
| acreford | `C:/Users/victo/Projects/acreford.com/functions` | `npx jest --coverage` | Istanbul (`coverage/coverage-summary.json`, uses `lines`/`statements`/`functions`/`branches`) | `src/` |

If the target project has no test framework configured (no `vitest.config.*`, `jest.config.*`, or test script in `package.json`), report that the project has no test infrastructure and **stop** — do not attempt to run tests or generate coverage.

## Steps

### 1. Determine Project

Parse the skill args to select the project. If args are empty or "assetsflow", use assetsflow. If args are "acreford", use acreford. For any other value, error with the list of supported projects.

### 2. Check Test Infrastructure

Before running tests, verify the project has a test framework:
- assetsflow: check for `vitest.config.*` or `"test"` script in `package.json`
- acreford: check for `jest.config.*` or `"test"` script in `package.json`

If missing, report and stop.

### 3. Run Tests with Coverage

For **assetsflow**:
```bash
cd C:/Users/victo/Projects/assetsflow && npx vitest run --coverage 2>&1
```

For **acreford**:
```bash
cd C:/Users/victo/Projects/acreford.com/functions && npx jest --coverage 2>&1
```

If any tests fail, report the failure count and **stop** — do not proceed to coverage analysis with a red suite.

### 4. Parse Coverage Report

**For assetsflow (V8 format):**
Read `coverage/coverage-final.json`. For each file in `src/`, extract:
- `total` = number of keys in `s` object (statement count)
- `covered` = number of keys in `s` where value > 0
- Coverage % = covered / total × 100

**For acreford (Istanbul format):**
Read `coverage/coverage-summary.json`. For each file in `src/`, extract:
- `lines.total` (lines found)
- `lines.covered` (lines hit)
- Coverage % = covered / total × 100

### 5. Group by Area

Group files by their directory under `src/`:

| Group | Path pattern |
|-------|-------------|
| Types | `src/types/**` |
| Schemas | `src/schemas/**` |
| Repositories | `src/repositories/**` |
| Services | `src/services/**` |
| Stores | `src/stores/**` |
| Hooks | `src/lib/hooks/**` |
| Utils | `src/lib/utils/**` |
| Agents | `src/agents/**` |
| Integrations | `src/integrations/**` |
| Shared | `src/shared/**` |
| Cloud Functions | `src/cloud-functions/**` |
| Components | `src/components/**` |
| Screens | `src/screens/**` |
| Config | `src/config/**` |
| Other | Everything else in `src/` |

Only include groups that have files. For each group, calculate:
- Number of files
- Total lines/statements found (sum of total)
- Total lines/statements hit (sum of covered)
- Coverage percentage

### 6. Output Format

Present the report in this exact format:

---

**Project:** [project name]

**Test Suite:** X passed, Y failed, Z total

**Overall Coverage:** XX.X% (covered / total across N files)

#### Coverage by Area

| Area | Files | Lines | Hit | Coverage |
|------|------:|------:|----:|--------:|
| (sorted by coverage %, highest first) | | | | |

#### Lowest Coverage Files (top 15, min 10 statements)

| File | Lines | Hit | Coverage |
|------|------:|----:|--------:|
| (sorted by coverage %, lowest first) | | | |

#### Recommendations

Based on the low-coverage files, suggest 3-5 specific files where adding tests would have the most impact. Prioritize:
1. Services with low coverage (no UI dependency, pure logic)
2. Utils with low coverage (pure functions, easy to test)
3. Large files with near-0% coverage

---

### 7. Do NOT

- Do not create or modify any source files (except test files if needed to fix a failing test before re-running)
- Do not deploy anything
- If the test suite has failures, report them and stop — do not analyze coverage from a red suite

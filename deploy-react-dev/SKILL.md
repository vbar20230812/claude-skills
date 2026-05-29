---
name: deploy-react-dev
description: "Deploy AssetFlow React user app to development environment (assetflow-react-dev.web.app). Runs commit check, version bump, tests, Vite build, and Firebase deploy with browser verification. Triggers on: deploy dev, deploy to dev, ship to dev, dev deploy, /deploy-react-dev."
---

# Deploy React User App to Development

**Announce at start:** "Deploying AssetFlow React user app to development environment."

The deploy script (`scripts/deploy-react.sh`) handles everything atomically under a cross-session lock: lock acquisition, env flip, build, deploy, env restore, lock release.

## Step 0: Read Task Tracker (MANDATORY)

**Before any deploy, read the task tracker to know what's been fixed across sessions:**

Read `C:\Users\victo\.claude\projects\C--Users-victo-Projects-assetsflow\tasks.md`

Report the "Active Tasks" and any unarchived items to the user as part of the deployment summary.

## Step 1: Commit All Changes (MANDATORY)

```bash
cd C:/Users/victo/Projects/assetsflow && git status --short
```

If uncommitted changes exist, ask user to commit before proceeding.

## Step 2: Version Check

```bash
grep '"version"' C:/Users/victo/Projects/assetsflow/package.json | head -1
```

**Ask user:** "Should I bump the version for this deployment?"

## Step 3: Deploy

```bash
cd C:/Users/victo/Projects/assetsflow && bash scripts/deploy-react.sh dev
```

The script performs ALL steps atomically:
- Acquires deploy lock (blocks if another deploy is running)
- Sets VITE_ENV=DEV
- Builds
- Validates build output
- Deploys to Firebase
- Restores .env to original
- Releases lock

If the script exits with an error, check the output for which gate failed.

## Step 4: Auto-Verify in Browser (MANDATORY, no user permission needed)

**Use browser-harness to verify the deployment automatically. Do NOT ask the user for permission.**

```bash
browser-harness -c '
new_tab("https://assetflow-react-dev.web.app")
wait_for_load()
print(page_info())
capture_screenshot("C:/tmp/dev-deploy-verify.png")
'
```

Then read the screenshot and verify:
- [ ] Page loads (title contains "AssetFlow")
- [ ] No blank page or error screen
- [ ] Report the page state (splash/login/dashboard) in the final output

If browser-harness fails (CDP connection), verify via curl:
```bash
curl -sL --ssl-no-revoke -o /dev/null -w "%{http_code}" https://assetflow-react-dev.web.app
```

## Step 5: Auto-Run Tests (MANDATORY, no user permission needed)

```bash
cd C:/Users/victo/Projects/assetsflow && npm test
```

**Report results** as part of the final output. If tests fail, list the failures but do NOT roll back the deployment.

## Final Output

**After successful deploy, archive completed tasks in tasks.md:**
- Move all "Active Tasks" items to a new "Completed (vX.Y.Z — date)" section
- Clear the active tasks section
- Update the version in MEMORY.md to match

```
═══════════════════════════════════════════════════════════
  ✅ REACT USER APP DEV DEPLOYMENT COMPLETE
═══════════════════════════════════════════════════════════

Platform: React 19 + Vite
URL: https://assetflow-react-dev.web.app
Firebase Project: assetflow-dev-f6fa5

Tasks from this deploy:
[list items from Active Tasks section]

Changed files: [list key file names]
```

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| "BLOCKED: Deploy lock is held" | Another session is deploying | Wait or `rm -rf .deploy-lock` |
| "Build failed" | Compilation error | Fix the error, re-run |

## Important Notes

- Build output: `dist/` (Vite)
- **NEVER deploy to `assetflow-backend-2024` without explicit user approval**
- **The script is the single source of truth** — do NOT manually flip .env or build outside the script

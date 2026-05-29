---
name: deploy-react-green-prod
description: "Deploy AssetFlow React user app to GREEN production slot (assetsflow-green-work.web.app). Runs commit check, version bump, tests, Vite build, and Firebase deploy with browser verification. Triggers on: deploy green, deploy to green production, ship to green, green deploy, /deploy-react-green-prod."
---

# Deploy React User App to GREEN Production

**Announce at start:** "Deploying AssetFlow React user app to GREEN production."

The deploy script (`scripts/deploy-react.sh`) handles everything atomically under a cross-session lock: lock acquisition, version bump, env flip, tests, build, deploy, env restore, lock release.

## Step 1: Commit All Changes (MANDATORY)

```bash
cd C:/Users/victo/Projects/assetsflow && git status --short
```

If uncommitted changes exist, ask user to commit before proceeding.

## Step 2: Version Bump (MANDATORY for PRODUCTION)

```bash
grep '"version"' C:/Users/victo/Projects/assetsflow/package.json | head -1
```

**Ask user:** "Should I bump the version? Every production deployment MUST have a version bump."

If yes, the script handles the actual bump. Just confirm with the user.

## Step 3: Deploy

```bash
cd C:/Users/victo/Projects/assetsflow && bash scripts/deploy-react.sh prod-green
```

The script performs ALL steps atomically:
- Acquires deploy lock (blocks if another deploy is running)
- Bumps version (patch)
- Sets VITE_ENV=PROD
- Runs tests
- Builds
- Validates build output (PROD env + correct API key)
- Deploys to Firebase
- Restores VITE_ENV=DEV
- Releases lock

If the script exits with an error, check the output for which gate failed.

## Step 4: Auto-Verify in Browser (MANDATORY, no user permission needed)

**Use browser-harness to verify the deployment automatically. Do NOT ask the user for permission.**

```bash
browser-harness -c '
new_tab("https://assetsflow-green-work.web.app")
wait_for_load()
print(page_info())
capture_screenshot("C:/tmp/green-prod-deploy-verify.png")
'
```

Then read the screenshot and verify:
- [ ] Page loads (title contains "AssetFlow")
- [ ] No blank page or error screen
- [ ] Report the page state (splash/login/dashboard) in the final output

If browser-harness fails (CDP connection), verify via curl:
```bash
curl -sL --ssl-no-revoke -o /dev/null -w "%{http_code}" https://assetsflow-green-work.web.app
```

## Final Output

```
═══════════════════════════════════════════════════════════
  ✅ REACT APP GREEN PROD DEPLOYMENT COMPLETE
═══════════════════════════════════════════════════════════

URL: https://assetsflow-green-work.web.app
Firebase Project: assetflow-backend-2024
Slot: GREEN

⚠️ Use /switch-react-prod-traffic to route users to this slot.
```

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| "BLOCKED: Deploy lock is held" | Another session is deploying | Wait or `rm -rf .deploy-lock` |
| "VITE_ENV=DEV but target requires PROD" | .env wasn't flipped | Script handles this — shouldn't happen |
| "Build environment is NOT PROD" | Wrong build in dist/ | Script cleans and rebuilds — shouldn't happen |
| "Tests failed" | Test suite failure | Fix tests, re-run |

## Important Notes

- **This is PRODUCTION** — affects real users after traffic switch
- Blue/green deployment: deploy to slot, then switch traffic
- **NEVER deploy without explicit user approval**
- **The script is the single source of truth** — do NOT manually flip .env, build, or deploy outside the script

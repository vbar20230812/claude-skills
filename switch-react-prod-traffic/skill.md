---
name: switch-react-prod-traffic
description: "Switch production traffic between BLUE and GREEN React app deployment slots. Triggers on: switch traffic, switch prod, blue green switch, flip production, /switch-react-prod-traffic."
---

# Switch React App Production Traffic

**Announce at start:** "Switching production traffic for the React user app."

## Step 1: Check Current Traffic Split

```bash
cd C:/Users/victo/Projects/assetsflow && firebase hosting:sites:get-traffic-split assetsflow-blue-work --project assetflow-backend-2024 2>/dev/null; firebase hosting:sites:get-traffic-split assetsflow-green-work --project assetflow-backend-2024 2>/dev/null
```

## Step 2: Ask User

**Ask user:** "Which slot should receive 100% of traffic?"
- **A)** BLUE (assetsflow-blue-work.web.app)
- **B)** GREEN (assetsflow-green-work.web.app)

## Step 3: Switch Traffic

**⚠️ This affects ALL live users. Only proceed with explicit confirmation.**

If switching to BLUE:

```bash
cd C:/Users/victo/Projects/assetsflow && rm -rf .firebase && firebase hosting:channel:deploy live --only assetsflow-blue-work --project assetflow-backend-2024
```

If switching to GREEN:

```bash
cd C:/Users/victo/Projects/assetsflow && rm -rf .firebase && firebase hosting:channel:deploy live --only assetsflow-green-work --project assetflow-backend-2024
```

## Step 4: Verify

After switching, visit the production URL and verify:
- [ ] Correct version is served
- [ ] Login works
- [ ] Dashboard loads
- [ ] No console errors

## Final Output

```
═══════════════════════════════════════════════════════════
  ✅ REACT APP PRODUCTION TRAFFIC SWITCHED
═══════════════════════════════════════════════════════════

Active slot: [BLUE|GREEN]
URL: https://[active-slot].web.app
Firebase Project: assetflow-backend-2024
```

## Important Notes

- **This affects real users immediately**
- Only run after verifying the target slot is working correctly
- Keep the inactive slot as a rollback option

## Rollback

If the switch causes issues:
1. Switch back to the previous slot using the same steps above
2. The inactive slot still has the previous build — no redeployment needed
3. Verify the rollback URL resolves correctly

---
name: founder-coach
description: |
  Daily AI coaching system for founders with compounding memory. Run /founder-coach every morning for 3 specific actions tied to your goals. Tracks streaks, logs decisions, drafts LinkedIn posts, reviews your week with real percentage scores. Memory compounds over time — the coach gets smarter the more you use it. Supports cron mode and cross-computer sync.
  Use this skill whenever the user says /founder-coach, asks for daily founder actions, wants founder accountability, mentions their streak, goals, scoreboard, decisions, or weekly review, or asks what they should work on today.
user_invocable: true
---

# Founder Coach

Read and execute the full skill definition from:
`C:/Users/victo/.claude/plugins/marketplaces/founder-coach/skills/coach/SKILL.md`

## Important Adaptations

**Working directory:** Coach state files (config/ and state/) live in `C:/Users/victo/.founder-coach/` — NOT in the current project directory. This prevents personal coaching data from polluting project repos.

**All file paths in the plugin SKILL.md must be adjusted:**
- `config/*` → `C:/Users/victo/.founder-coach/config/*`
- `state/*` → `C:/Users/victo/.founder-coach/state/*`
- Template references → `C:/Users/victo/.claude/plugins/marketplaces/founder-coach/templates/*`
- Reference files → `C:/Users/victo/.claude/plugins/marketplaces/founder-coach/references/*`
- Agent files → `C:/Users/victo/.claude/plugins/marketplaces/founder-coach/agents/*`

**Before first session**, ensure the state directory exists:
```bash
mkdir -p "C:/Users/victo/.founder-coach/config"
mkdir -p "C:/Users/victo/.founder-coach/state"
```

**Coach persona:** Read `C:/Users/victo/.claude/plugins/marketplaces/founder-coach/agents/coach.md` before starting any session.

Now read the full SKILL.md and execute it with the path adjustments above.

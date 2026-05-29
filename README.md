# Claude Code Skills

Custom skills for AssetFlow development with Claude Code.

## Skills

| Skill | Description |
|-------|-------------|
| backup-firebase | Backup Firebase Firestore production data to local file and Firebase Storage |
| brand-guidelines | Apply Anthropic's official brand colors and typography |
| caveman | Ultra-compressed communication mode (~75% token reduction) |
| community-post | Generate marketing posts for Facebook (Hebrew) and LinkedIn (English) |
| context-mode-kill-switch | Emergency on/off toggle for context-mode's tool interception |
| coverage | Run code coverage, identify low-coverage gaps |
| deploy-react-blue-prod | Deploy AssetFlow React app to BLUE production |
| deploy-react-dev | Deploy AssetFlow React app to development |
| deploy-react-green-prod | Deploy AssetFlow React app to GREEN production |
| dev-browser | Browser automation with persistent page state |
| devils-advocate | Self-refine technique for critical thinking |
| founder-coach | Daily AI coaching system for founders with compounding memory |
| frontend-design | Create production-grade frontend interfaces with high design quality |
| impeccable | UI/UX audit, polish, and optimization |
| reality-check | Deep code audit detecting misleading patterns |
| simplify | Code review and cleanup |
| switch-react-prod-traffic | Switch production traffic between BLUE and GREEN slots |
| universal-skills-manager | Install and manage skills across AI tools |

## Usage

Copy any skill directory to `~/.claude/skills/`:

```bash
cp -r <skill-name> ~/.claude/skills/
```

Or install the entire collection:

```bash
git clone https://github.com/vbar20230812/claude-skills.git
cp -r claude-skills/*/ ~/.claude/skills/
```

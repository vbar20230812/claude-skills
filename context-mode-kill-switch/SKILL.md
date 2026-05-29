---
name: context-mode-kill-switch
description: Immediately disable or re-enable context-mode's tool interception and routing. Use when context-mode breaks your workflow, intercepts tools incorrectly, or causes unexpected behavior. Triggers on "kill context-mode", "disable context-mode", "stop context-mode", "context-mode off", "context-mode kill switch", "enable context-mode", "context-mode on".
---

# Context Mode Kill Switch

Emergency on/off toggle for context-mode's tool interception.

## What this does

Context-mode intercepts your Bash, Read, Grep, and WebFetch tool calls and redirects them to its sandbox tools. This is useful for context window management but can break workflows when:

- curl/wget redirects block legitimate commands
- WebFetch is denied when you need it
- Build tool commands are intercepted incorrectly
- The routing guidance is adding noise to your session

This skill creates or removes a **marker file** at `~/.claude/context-mode-disabled`. The pretooluse hook checks this file before intercepting any tool call.

## Usage

### Kill (disable interception)

Say any of:
- "kill context-mode"
- "disable context-mode"
- "context-mode off"

This will:
1. Create the marker file `~/.claude/context-mode-disabled`
2. Context-mode's hooks will immediately stop intercepting tools
3. All native Bash, Read, Grep, WebFetch calls work normally
4. The MCP tools (ctx_execute, ctx_search, etc.) still work if you call them manually

### Revive (re-enable interception)

Say any of:
- "enable context-mode"
- "context-mode on"

This will:
1. Remove the marker file
2. Context-mode's hooks resume intercepting tools on the next call

### Status check

Say "context-mode status" to check whether the kill switch is active.

## Implementation

When the user asks to kill/disable context-mode:

```bash
touch ~/.claude/context-mode-disabled
```

Then confirm: "Context-mode interception is now DISABLED. Native tool calls (Bash, Read, Grep, WebFetch) will work normally. Use 'enable context-mode' to re-enable."

When the user asks to enable context-mode:

```bash
rm -f ~/.claude/context-mode-disabled
```

Then confirm: "Context-mode interception is now ENABLED. Tools will be routed through the context-mode sandbox as usual. Use 'kill context-mode' to disable."

When the user asks about status:

```bash
test -f ~/.claude/context-mode-disabled && echo "DISABLED" || echo "ENABLED"
```

## Important notes

- This only affects the PreToolUse interception hooks. The MCP server itself keeps running.
- The kill switch persists across sessions until you explicitly re-enable.
- The SessionStart hook may still inject context — but no tool calls will be redirected.
- If context-mode is causing severe issues, you can also fully disable the plugin: `claude plugin disable context-mode@context-mode`

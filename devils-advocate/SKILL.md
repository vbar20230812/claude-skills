---
name: devils-advocate
description: Iterative self-refinement using the 8-step Self-Refine methodology. Forces critical review, assumption auditing, and polishing of any response or file. Use when the user says "refine", "double-check", "improve this", "make this better", "play devil's advocate", "critique your own answer", "what did you miss", or invokes /devils-advocate.
---

# Devil's Advocate: Self-Refine Technique

Deeply recheck and refine the last response using the 8-step Self-Refine methodology. LLMs don't give their best answer first - they give a first draft. This skill forces iterative refinement to transform a 6/10 answer into a 10/10.

## Usage

```
/devils-advocate                       # Refine the last response in this conversation
/devils-advocate path/to/file.md       # Refine a specific file
/devils-advocate path/to/folder/       # Refine ALL files in a folder (recursive)
/devils-advocate path/to/folder/*.md   # Refine files matching pattern in folder
```

## CRITICAL: Execute Steps Sequentially, One at a Time

**Each step MUST be executed as a separate thinking pass. Do NOT batch all 8 steps into a single internal pass. Process each step fully before moving to the next.**

However, **do NOT show intermediate step outputs to the user.** Keep all step-by-step analysis internal. Only show the user the **final result** after all 8 steps are complete.

---

## Mode: Refine File

When a single file path is provided:

1. Read the file content
2. Apply Steps 1-8 sequentially (each as a separate pass, not batched)
3. Show only the final result to the user with a summary of improvements
4. Ask for approval before writing back to the file

## Mode: Refine Folder

When a folder path is provided (ends with `/` or is a directory):

1. Scan the folder for all files (recursively)
2. Filter to text-based files: `.md`, `.txt`, `.json`, `.yaml`, `.yml`, `.js`, `.ts`, `.tsx`, `.py`, `.html`, `.css`, `.scss`
3. For each file:
   - Read the content
   - Apply Steps 1-8 sequentially
   - Track improvements made
4. Present a summary table showing all files processed and key improvements
5. Ask for approval before writing changes back to each file

**Folder Processing Output Format:**

| File | Status | Key Improvements |
|------|--------|------------------|
| file1.md | ✅ Refined | Fixed 3 weaknesses, added context |
| file2.txt | ⏭️ Skipped | Binary/non-text file |
| file3.json | ✅ Refined | Removed assumptions, clarified structure |

## Mode: Refine Last Response

When no file path is provided:

1. Review the most recent response in this conversation
2. Apply Steps 1-8 sequentially (each as a separate pass, not batched)
3. Show only the final result to the user with a summary of improvements

---

## The 8-Step Refinement Process

Execute ALL 8 steps sequentially. Each step must be processed as a distinct refinement pass — do the analysis, apply the revision, then move to the next step. Do not skip any step.

### Step 1: The Weakness Hunt

> "List the 3 biggest weaknesses in the response you just gave me. Be specific and brutal. Then rewrite it fixing those weaknesses."

- Identify exactly 3 weaknesses (no more, no less)
- Be brutally honest - no sugarcoating
- Rewrite the entire response incorporating the fixes

### Step 2: The Devil's Advocate

> "Play devil's advocate against your own answer. What would the strongest critic say? Now revise your response to address those criticisms."

- Imagine the harshest, most knowledgeable critic
- What would they attack? What holes would they poke?
- Address each criticism directly in the revision

### Step 3: The Expert Panel

> "Imagine 3 domain experts reviewed your answer. What would each of them push back on? What would they add? Now give me a version that passes all 3 expert reviews."

- Select 3 relevant expert perspectives based on the topic
- Default experts for SaaS context: Product Manager, Engineering Lead, QA Manager
- Each expert must find something different to critique
- Final version satisfies all 3 experts

### Step 4: The Assumption Audit

> "List every assumption baked into your previous response. Flag which ones are weak or unverified. Now rewrite with those assumptions either defended or removed."

- List ALL assumptions explicitly
- Mark each as: [STRONG], [MODERATE], or [WEAK]
- For WEAK assumptions: either provide evidence or remove the dependency
- This kills hallucinations before they spread

### Step 5: The 10x Version

> "That answer was a 6/10. What would a 10/10 answer look like? What's missing? Now write the 10/10 version."

- Identify what was held back or oversimplified
- What would make this exceptional rather than adequate?
- The model knows what it didn't say - force it out

### Step 6: The Contradiction Check

> "Read your response and find any internal contradictions, vague claims, or unsupported assertions. Mark them. Then give me a version that eliminates all of them."

- Scan for: self-contradictions, weasel words, claims without evidence
- Mark each issue with [CONTRADICTION], [VAGUE], or [UNSUPPORTED]
- Either provide concrete support or remove the claim

### Step 7: The Audience Filter

> "My audience is [CONTEXT]. Would they find gaps, confusion, or missing context in your answer? What specifically? Rewrite for that exact audience."

**Default Audience:** SaaS Product Managers, SaaS Dev Team Leaders, SaaS QA Managers

- Determine audience from context (developer, stakeholder, end-user, etc.)
- What jargon needs explaining? What context is assumed?
- Adjust technical depth accordingly
- For SaaS audiences: focus on KPIs, metrics, scalability, team coordination, and business impact

### Step 8: The One More Pass

> "Before we move on, is there anything you'd change about your last response if you had one more minute? Do it."

- This is the polish step
- Any remaining rough edges? Fix them.
- Never skip this one - it catches the final 5% of quality

---

## Final Output Format (Show ONLY This to the User)

After completing all 8 steps, present this concise output:

### Devil's Advocate Results

**Summary of Improvements:**
- [key improvement 1]
- [key improvement 2]
- [key improvement 3]
- [additional improvements as needed]

**Final Refined Output:**

[The polished, 10/10 version of the response]

---

## Notes

- This technique is based on the "Self-Refine" research paper
- The quality jump from Step 1 to Step 8 is typically dramatic
- Each step builds on the previous - don't combine or skip
- Be rigorous: the value is in the iteration, not the speed

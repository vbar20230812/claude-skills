---
name: community-post
description: "Generate or vary marketing posts for Israeli RE investor Facebook groups (Hebrew) and LinkedIn (English). Handles templates, scheduling, variation, and outreach tracking. Always uses investor-protection framing — never 'portfolio tracker'. Triggers on: Facebook post, LinkedIn post, community post, marketing post, outreach, social media post for AssetFlow."
user_invocable: true
argument-hint: "[template-number | suggest | vary N | list | schedule | track]"
---

# Community Post Generator for AssetFlow

**Announce at start:** "Community Post Generator ready."

## Audience

Israeli RE investors, 40+, Facebook groups + LinkedIn.

## Core Messaging Rules (VALIDATE EVERY POST)

1. **NEVER** say "portfolio tracker" or "ניהול תיק"
2. **ALWAYS** frame as investor protection / verification
3. Lead with the problem, not the product
4. **No fake numbers** — if you don't have real data, reframe as a question to the audience instead of inventing stats
5. 80% value, 20% mention of AssetFlow
6. **All Hebrew body text** — only AssetFlow (brand name) and hashtags may be English
7. **Confident CTAs only** — use `מוזמנים` or direct invites, never `אם זה מעניין מישהו` (sounds apologetic)

**Validation check:** Before outputting any post, scan it for banned phrases. If found, warn the user and suggest alternative wording.

## Anti-Patterns (NEVER Do These)

- "Check out my app!" — looks like spam
- "The best portfolio tracker" — competes with Vyzer, you lose
- "Free real estate tracker" — attracts free users who never convert
- "AI-powered investment tool" — overpromising, triggers skepticism
- Long feature lists — nobody reads them in Facebook groups
- Posting without engaging first — group admins mark as spam
- Posting identical text in multiple groups — Facebook demotes duplicates

---

## Target Groups

### Tier 1 (Post weekly)
- "נדלן למשקיע הישראלי" — largest Israeli RE investor group
- "הון עצמי — השקעות נדל״ן" — focused on equity investing
- "משקיעי נדל״ן ישראל" — general RE investors
- "יזמי נדל״ן ומשקיעים" — entrepreneurs + investors

### Tier 2 (Post biweekly)
- LinkedIn — international investors, family offices, proptech
- Hebrew LinkedIn — Israeli professionals

---

## Commands

| Command | What it does |
|---------|-------------|
| `/community-post` | Shows all templates, asks which one |
| `/community-post N` | Goes directly to template N |
| `/community-post suggest` | Suggests the right template based on today's day and recent activity |
| `/community-post vary N` | Creates a variation of template N (different wording, same message) — use when posting the same template in a different group |
| `/community-post list` | Quick reference of all templates |
| `/community-post schedule` | Shows weekly posting schedule |
| `/community-post track` | Logs a post to the outreach tracker |

---

## Template Workflow

For every template request:

1. **Show the base template** with placeholders marked
2. **Ask specific questions** to fill placeholders (not "fill in the blanks" — ask concrete questions like "How many projects underperformed out of how many total?")
3. **Generate the final post** — ready to copy-paste, in a code block
4. **Offer CTA options** — let the user pick the call-to-action strength
5. **Ask if they want to track it** — if yes, run the track workflow

### CTA Options (offer after every post)

| Style | Hebrew Example | When to use |
|-------|---------------|-------------|
| **Soft** | אם מישהו רוצה לראות איך זה עובד — שיכתוב לי בפרטי | New group, first posts |
| **Medium** | אם מישהו רוצה לראות את הכלי — [לינק]. לא מוכר כלום, רק שותף מה שעזר לי. | After warming up a group |
| **Hard** | מוזמנים לנסות בחינם — [לינק]. אשמח לשמוע תגובות. | Your own posts, warm audience |

---

## Templates

### Template 1: Facebook Group Introduction Post (Hebrew)

**When to use:** First time posting in a new group

```
גיליתי משהו מעניין על ההשקעות שלי — וחשבתי שזה יעניין גם אתכם.

התחלתי לעקוב אחרי כל ההבטחות שקיבלתי מחברות ההשקעה — התשואות שהן הבטיחו vs. מה שבאמת הגיע.

התוצאה? ב-[X] מתוך [Y] פרויקטים, התשואה בפועל הייתה נמוכה ב-[Z]% ממה שהובטח. לא בגלל רמאות — בגלל עיכובים, עלויות שלא חשבתי עליהן, ושערי חליפין ש"שכחו" לציין.

בניתי כלי שעוזר לי לראות את התמונה האמיתית — כמה הובטח, כמה התקבל, ואיפה הפערים.

[CTA]
```

**Questions to ask:**
1. "כמה פרויקטים סה״כ יש לך?" (total projects, e.g., 8)
2. "בכמה מהם התשואה בפועל הייתה נמוכה מהמובטח?" (underperforming, e.g., 3)
3. "באיזה אחוז בערך היה הפער?" (gap %, e.g., 15-30)
4. "איזה CTA — soft/medium/hard?"

---

### Template 2: Problem-Agitation Post (Hebrew, No Product Mention)

**When to use:** Warming up a group before mentioning AssetFlow. Zero product mention.

```
שאלה למשקיעים פה — איך אתם עוקבים אחרי ההשקעות שלכם?

אני מדבר על:
- האם התשלומים מגיעים בזמן?
- האם התשואה שקיבלתם תואמת את מה שהובטח?
- מה קורה עם עלויות המרת מטבע שלא חשבתם עליהן?

אצלי זה היה אקסל. עד שהבנתי שאני מפספס דברים.

מעניין אותי לשמוע איך הקהל הזה מתמודד עם זה.
```

**Questions to ask:**
1. "רוצה לשנות את ה-bullet points לפי ניסיון ספציפי שלך?" (optional customization)
2. No CTA needed — this is engagement-only

---

### Template 3: Value-First Reply (Hebrew, Comment on Someone Else's Post)

**When to use:** Someone asks about tracking investments or comparing returns. This is a COMMENT, not a standalone post.

```
דבר אחד שעזר לי המון — להשוות את התשואה המובטחת מול מה שבאמת הגיע.
ברגע שראיתי את הנתונים זה ליד זה, הבנתי שב-[X] פרויקטים אני מפסיד כסף בלי לשים לב (עיכובים + עלויות המרה).

[CTA]
```

**Questions to ask:**
1. "בכמה פרויקטים גילית פערים?" (number, e.g., 2)
2. "CTA — soft (DM me) או medium (link)?"
3. "מה הפוסט המקורי שאתה עונה עליו?" (optional — helps tailor the reply)

---

### Template 4: Podcast Episode Share (Hebrew)

**When to use:** After appearing on a podcast

```
התארחתי אצל [שם המנחה] ודיברנו על משהו שכנראה קורה להרבה מאיתנו — פערים בין מה שחברות ההשקעה מבטיחות למה שבאמת מגיע.

נקודות מפתח:
- [נקודה 1 — מספר ספציפי]
- [נקודה 2 — תובנה מפתיעה]
- [נקודה 3 — טיפ אקשנבילי]

האזנה: [לינק לפרק]

שאלה — מי מכם משווה באופן קבוע בין התשואה המובטחת לבין מה שבאמת מתקבל?
```

**Questions to ask:**
1. "שם המנחה?" (host name)
2. "3 נקודות מפתח מהפרק?" (key points)
3. "קישור לפרק?" (episode link)

---

### Template 5: LinkedIn Post (English)

**When to use:** LinkedIn outreach to investors, family offices, fintech community

```
I built a tool to solve my own problem:

As a real estate investor, I kept losing track of whether companies were delivering what they promised.

Not because they were scams. Because:
→ Payment delays I didn't notice
→ FX fees eating into returns
→ "Promised 12% yield" becoming 8.5% in reality

So I built AssetFlow — an investor protection platform that compares promised vs. actual returns.

Key insight: Most investors don't verify. They trust.

3 things I learned from tracking my own portfolio:
1. [data point]
2. [insight]
3. [action]

[CTA]

#RealEstateInvesting #InvestorProtection #Proptech #Israel
```

**Questions to ask:**
1. "3 data points — a real number, a surprising insight, and an action you took?"
2. "Customize hashtags?" (default: #RealEstateInvesting #InvestorProtection #Proptech #Israel)
3. "CTA — soft (link in comments) or hard (direct link)?"

---

## Special Commands

### `/community-post suggest`

Suggest the right template based on context:
1. Check what day of the week it is → suggest from schedule
2. Ask "Have you posted in this group before?" → T1 (no) or T2 (yes)
3. Ask "Is this a comment on someone's post?" → T3
4. Ask "Did you just do a podcast?" → T4
5. Ask "Is this for LinkedIn?" → T5

### `/community-post vary N`

Create a variation of template N. The variation must:
- Keep the same core message and structure
- Change the opening line completely
- Rephrase at least 50% of the body
- Use different numbers/examples if applicable
- Pass the same messaging rules validation

Use this when posting the same template in a different group to avoid duplicate content flags.

### `/community-post schedule`

Show the weekly posting schedule:

| Day | Action | Template | Target |
|-----|--------|----------|--------|
| Mon | Comment on 2-3 posts (value only) | T3 | Primary FB group |
| Tue | Like + comment on relevant posts | T3 | All 4 Tier 1 groups |
| Wed | Original post | T1 or T2 | Rotate between groups |
| Thu | Reply to comments on your post | — | Wherever you posted |
| Fri | LinkedIn post | T5 | LinkedIn feed |
| Sun | Follow up on DMs and conversations | — | All channels |

**Time:** 30-45 minutes/day, 5 days/week

### `/community-post track`

Log a post to the tracker. Ask for:
1. Date (default: today)
2. Group/Channel name
3. Template used (T1-T5)
4. Engagement metrics (likes, comments)
5. Signups attributed

Then append to `Documents/podcast-outreach-tracker.md` in the Community Posts section:

```
| YYYY-MM-DD | [group name] | T[N] | X likes, Y comments | Z |
```

If the "Community Posts" section or table header doesn't exist yet, create it first:

```markdown
## Community Posts

| Date | Group/Channel | Template Used | Engagement | Signups |
|------|--------------|---------------|------------|---------|
```

---

## Behavior Notes

- Always output final posts in a **copyable code block**
- **Validate before output:** scan for banned phrases (portfolio tracker, ניהול תיק, check out my app, free tool). Warn if found.
- **Hebrew RTL:** if user plans to share via WhatsApp, generate an HTML file with `dir="rtl"` using the same workaround as weekly progress reports
- **Keep it short:** FB posts under 150 words, LinkedIn under 200 words
- **Real numbers only:** if user provides no data, suggest using "3 out of 8 projects" and "15-30% gap" as starting defaults, but flag these as examples
- **One template per invocation** — don't overwhelm with multiple posts at once

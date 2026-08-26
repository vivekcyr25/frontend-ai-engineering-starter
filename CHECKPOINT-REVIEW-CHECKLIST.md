# Portfolio Design Review — Checkpoint Checklist

Use this checklist to track each step of the mandatory design-review checkpoint.

---

## Phase 1 — Preparation

- [x] Portfolio is running locally (`npm run dev` → `http://localhost:3000`)
- [ ] Live portfolio deployed to production URL (Netlify / Vercel)
- [x] Live URL is known and ready to share with reviewer
- [x] Proof statement is identified and matches portfolio hero
- [x] `PORTFOLIO-REVIEW-FORM.md` template created
- [x] `REVIEWER-MESSAGE.md` message template created

---

## Phase 2 — Real Human Review

- [ ] Real reviewer identified (friend / classmate / anyone who is NOT you)
- [ ] `REVIEWER-MESSAGE.md` sent to reviewer
- [ ] Reviewer opened the live portfolio URL (not a local URL)
- [ ] 10-second "what do I do?" answer collected from real reviewer
- [ ] "Would you believe I'm good at it?" answer collected from real reviewer
- [ ] Full free-form feedback collected from real reviewer
- [ ] Feedback pasted into `PORTFOLIO-REVIEW-RESULTS.md` using exact reviewer words

---

## Phase 3 — Classify Feedback

- [ ] Every feedback item reviewed against MUST-FIX criteria
- [ ] Every feedback item reviewed against NICE-TO-HAVE criteria
- [ ] Feedback classification table created (MUST-FIX vs NICE-TO-HAVE)
- [ ] No feedback auto-classified as MUST-FIX without a real reason

---

## Phase 4 — Implement Must-Fixes

- [ ] All MUST-FIX items implemented in the correct files
- [ ] No NICE-TO-HAVE items implemented unless strong reason
- [ ] Existing visual identity preserved
- [ ] Primary CTA remains clear after fixes
- [ ] TypeScript typecheck passes (`npx tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Vitest tests pass (`npm run test`)
- [ ] Production build succeeds (`npm run build`)

---

## Phase 5 — Post-Fix Verification

- [ ] Homepage loads cleanly
- [ ] Proof statement is visible and legible
- [ ] Strongest project case study is clearly reachable
- [ ] Primary CTA ("View Case Studies →") works
- [ ] All navigation links work (`/`, `/work`, `/about`, `/contact`, `/assistant`)
- [ ] External links work (GitHub, LinkedIn, project repos, demo URLs)
- [ ] Contact form submits successfully
- [ ] Tested at **375px** mobile width
- [ ] Tested at **768px** tablet width
- [ ] Tested at **1280px** desktop width
- [ ] No browser console errors

---

## Phase 6 — Evidence & Documentation

- [ ] `MUST-FIXES-COMPLETED.md` filled with before/after evidence for every fix
- [ ] `REVIEWER-RESPONSE.md` written with honest summary of changes
- [ ] All changes committed and pushed to GitHub (`origin/master`)
- [ ] Live site re-verified after deployment

---

## Evidence Files Reference

| File | Purpose |
| :--- | :--- |
| [`PORTFOLIO-REVIEW-FORM.md`](file:///c:/Users/hp/Desktop/FL-01/PORTFOLIO-REVIEW-FORM.md) | Structured template for real reviewer to complete |
| [`REVIEWER-MESSAGE.md`](file:///c:/Users/hp/Desktop/FL-01/REVIEWER-MESSAGE.md) | Message to copy and send to real reviewer |
| [`PORTFOLIO-REVIEW-RESULTS.md`](file:///c:/Users/hp/Desktop/FL-01/PORTFOLIO-REVIEW-RESULTS.md) | Raw reviewer feedback (real quotes only) |
| [`MUST-FIXES-COMPLETED.md`](file:///c:/Users/hp/Desktop/FL-01/MUST-FIXES-COMPLETED.md) | Before/after implementation log for every MUST-FIX |
| [`REVIEWER-RESPONSE.md`](file:///c:/Users/hp/Desktop/FL-01/REVIEWER-RESPONSE.md) | Written response to reviewer summarising what changed |
| [`CHECKPOINT-REVIEW-CHECKLIST.md`](file:///c:/Users/hp/Desktop/FL-01/CHECKPOINT-REVIEW-CHECKLIST.md) | This checklist |

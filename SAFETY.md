# Safety & Privacy Documentation

## COPPA Compliance (Children's Online Privacy Protection Act)

This application is designed with COPPA compliance in mind for users under 13.

### Data Collection (Minors)
**What we collect:**
- Nickname (no real name required)
- Age (8–18)
- Position (optional)
- Goals (preset options)
- Avatar color (preset)
- Session logs (activity type, effort, mood, optional win/focus text if parent-enabled for 14+)
- Skill challenge attempts (personal bests)
- Lesson progress (quiz scores)

**What we DO NOT collect:**
- Real names
- Photos or videos
- Email addresses (child accounts)
- Phone numbers
- Physical addresses
- School names
- Geolocation data
- Social Security Numbers or other government IDs
- Behavioral tracking for advertising

### Parental Consent & Control

Parents MUST:
1. Create their own account (email + password)
2. Add child profiles under their account
3. Set permissions for each child (free-text input, training windows)

Parents CAN:
- View all child data (session logs, progress, lessons)
- Export child data as JSON (anytime)
- Hard delete child profiles (irreversible, full cascade delete)
- Enable/disable free-text input for ages 14+
- Receive weekly summary emails (opt-in)

### Age-Based Content Gating

| Feature | Ages 8–13 | Ages 14–18 |
|---------|-----------|------------|
| Free-text input (win/focus fields) | ❌ Disabled (presets only) | ✅ Parent can enable |
| Training plans | ✅ Age-appropriate drills | ✅ Age-appropriate drills |
| Lessons | ✅ Simplified content | ✅ Advanced content |
| Skill challenges | ✅ All challenges | ✅ All challenges |

### Text Filtering (Free-Text Safety)

For ages 14+ with parent-enabled free text:
- **Profanity filter:** Bad-words library removes/replaces swear words
- **Contact info blocking:** Phone numbers and email addresses replaced with `[removed]`
- **URL blocking:** All `http://`, `https://`, `www.` patterns removed
- **Max length:** 200 characters enforced (client + server)

Server-side enforcement ensures no bypassing client-side filters.

### No Social Features (MVP)

The following are explicitly excluded to minimize risks:
- ❌ Public profiles
- ❌ Direct messages (DMs)
- ❌ Comments or forums
- ❌ Public leaderboards
- ❌ Friend requests or following
- ❌ Photo/video uploads or sharing
- ❌ Real-time chat

### RBAC (Role-Based Access Control)

All server actions enforce:
1. **Parent → Child data:** Verify `child.parentId === session.user.id`
2. **Child → Own data:** Verify `session.childId === resource.childId`
3. **Free-text input:** Verify `age >= 14 AND freeTextEnabled === true`

Unauthorized access throws 403 errors and logs attempts.

### Data Retention & Deletion

**Hard Delete (Right to Erasure):**
- Parent clicks "Delete Profile" → confirmation modal → hard delete
- Cascades to: SessionLog, SkillChallengeAttempt, LessonProgress, TrainingPlan
- NO soft delete (no `deletedAt` tracking for child data)
- Full removal from database within 24 hours

**Data Export:**
- Parent can download JSON of all child data (before deletion)
- Format: `{child, sessionLogs, skillChallenges, lessonProgress}`
- Downloadable as `[nickname]-data-[timestamp].json`

### Security Best Practices

1. **Passwords:** Bcrypt hashing (12 rounds) for parent passwords
2. **Session tokens:** JWT-based sessions with NextAuth
3. **HTTPS only:** Enforced in production
4. **CSRF protection:** Built into Next.js server actions
5. **Rate limiting:** (TODO: add for production with middleware)
6. **Input validation:** Zod schemas for all API inputs
7. **SQL injection prevention:** Prisma parameterized queries

### Third-Party Services

**For MVP:**
- **None.** No third-party analytics, advertising, or tracking.

**For future (post-MVP):**
- If analytics are added, use first-party only (e.g., Vercel Analytics)
- NO Google Analytics, Facebook Pixel, or similar trackers

### Incident Response Plan

If a security issue is discovered:
1. **Report:** Email security@pitchdreams.com (or create GitHub issue if OSS)
2. **Assessment:** Evaluate severity within 24 hours
3. **Patch:** Fix critical issues within 48 hours
4. **Notification:** Notify affected parents via email if data breach occurs
5. **Post-mortem:** Document incident and update security measures

### Compliance Checklist

- [x] Minimal data collection (COPPA)
- [x] Parental consent for child accounts
- [x] Parent controls (view, export, delete)
- [x] Age-gated content (8–13 vs 14–18)
- [x] No behavioral advertising
- [x] No third-party tracking
- [x] Text filtering for safety
- [x] RBAC server-side enforcement
- [x] Hard delete with cascade
- [x] Plain-English privacy policy
- [ ] Legal review (TODO: consult attorney before launch)
- [ ] COPPA Safe Harbor certification (optional, post-MVP)

### Parent-Facing Safety Pledge

**Shown during onboarding:**

> **Our Promise to You:**
> - No ads or data selling
> - Minimal data collection (nickname + age for kids)
> - You control everything (features, export, delete)
> - No hidden social features
> - Privacy-by-design for young athletes

**Privacy Policy Link:**
Plain-English, <500 words, COPPA compliance statement

---

**Last Updated:** 2026-01-24
**Maintained by:** Pitch Dreams Team

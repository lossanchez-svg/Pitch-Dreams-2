# Decision: Vercel Single Project with Canonical Domain

## Decision

Host PitchDreams on **Vercel** using a **single project** for both domains, with `pitchdreams.com` as the **canonical domain** and `pitchdreams.soccer` redirecting to it.

## Context

We have two domains registered at Porkbun:
- `pitchdreams.com`
- `pitchdreams.soccer`

Currently hosted on Netlify. Need to migrate to a platform with better Next.js support.

## Options Considered

### Option 1: Vercel Single Project (Chosen)

Both domains point to one Vercel project. One domain is canonical, the other redirects.

| Pros | Cons |
|------|------|
| Simple deployment | Shared resource limits |
| Single set of env vars | Single analytics view |
| One codebase to manage | Can't scale independently |
| Easy to set up | |

### Option 2: Vercel Two Projects

Separate projects for marketing (pitchdreams.com) and app (pitchdreams.soccer or app.pitchdreams.com).

| Pros | Cons |
|------|------|
| Independent scaling | More complex setup |
| Separate analytics | Duplicate env vars |
| Different caching | Two deployments to manage |

### Option 3: Cloudflare Pages

| Pros | Cons |
|------|------|
| Generous free tier | Less Next.js optimization |
| Global CDN | Newer App Router support |
| Workers integration | More manual config |

## Decision Rationale

**Vercel Single Project** chosen because:

1. **Simplicity**: One project, one deploy, one set of environment variables
2. **Native Next.js**: Vercel created Next.js; best-in-class support
3. **MVP Stage**: 3-5 pilot users don't need complex architecture
4. **Free Tier**: 100GB bandwidth is plenty for pilot
5. **Easy Upgrade Path**: Can split into multiple projects later if needed

## Canonical Domain Choice

**pitchdreams.com** chosen as canonical because:

1. `.com` is universally recognized and trusted
2. Easier for users to remember and type
3. Better for SEO (established TLD authority)
4. `.soccer` becomes a memorable marketing shortcut

## Implementation

### Domain Configuration

| Domain | Role | Behavior |
|--------|------|----------|
| pitchdreams.com | Canonical | Serves all content |
| pitchdreams.soccer | Redirect | 301 → pitchdreams.com |
| www.* | Redirect | 301 → apex domain |

### Redirect Method

Use Vercel's built-in domain redirect feature (no code needed):
1. Add all domains to Vercel project
2. Set pitchdreams.com as primary
3. Configure others to redirect

### Environment Variables

```
NEXTAUTH_URL=https://pitchdreams.com
```

All auth callbacks and email links use the canonical domain.

## Future Upgrade Path

When to reconsider this decision:

- **Traffic grows significantly**: May need separate scaling
- **Team expands**: May want separate deployment pipelines
- **Marketing needs differ**: May want different caching/CDN config
- **Analytics separation**: May want distinct data per domain

### How to Split Later

1. Create new Vercel project for marketing site
2. Move landing/marketing routes to separate repo
3. Point pitchdreams.com to marketing project
4. Create app.pitchdreams.com for the main app
5. Keep pitchdreams.soccer as marketing redirect

## Consequences

### Positive

- Simple to deploy and manage
- Fast time-to-migration
- Lower cognitive overhead
- Clear canonical URL for SEO

### Negative

- Both domains share Vercel resource limits
- Can't have different build settings per domain
- Analytics combined (unless using UTM params)

### Neutral

- DNS managed at Porkbun (no transfer needed)
- SSL auto-provisioned by Vercel

## Related Documents

- [009-hosting-migration-from-netlify.md](../features/009-hosting-migration-from-netlify.md) - Full migration checklist

# 009: Hosting Migration from Netlify to Vercel

## 1. Current State

- **Domains**: Registered at Porkbun
  - `pitchdreams.com`
  - `pitchdreams.soccer`
- **Current Hosting**: Netlify
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase PostgreSQL

## 2. Target State

- **Hosting**: Vercel (single project)
- **Both domains** point to the same Vercel project
- **Canonical domain**: `pitchdreams.com`
- **Redirect**: `pitchdreams.soccer` → `pitchdreams.com` (301 permanent)
- **DNS Management**: Porkbun (no transfer needed)

### Why Single Project?

| Approach | Pros | Cons |
|----------|------|------|
| **Single Project** (chosen) | Simpler deployment, one codebase, shared env vars | Both domains share resources |
| **Separate Projects** | Independent scaling, separate analytics | More complex, duplicate config |

For MVP with 3-5 pilot users, single project is sufficient. Can split later if needed.

## 3. Domain Strategy

### Canonical Domain Decision

| Domain | Role | Behavior |
|--------|------|----------|
| `pitchdreams.com` | **Canonical** | Primary domain, all content served here |
| `pitchdreams.soccer` | **Redirect** | 301 redirect to pitchdreams.com |
| `www.pitchdreams.com` | Redirect | 301 redirect to apex (pitchdreams.com) |
| `www.pitchdreams.soccer` | Redirect | 301 redirect to pitchdreams.com |

### Rationale for pitchdreams.com as Canonical

1. `.com` is more universally recognized
2. Easier to type and remember
3. Better for SEO (established TLD)
4. `.soccer` becomes a memorable marketing redirect

### Redirect Implementation

**Option A: Vercel Project Settings (Recommended)**

In Vercel Dashboard → Project → Settings → Domains:
1. Add `pitchdreams.com` as primary
2. Add `pitchdreams.soccer` and configure redirect to `pitchdreams.com`
3. Vercel handles 301 redirects automatically

**Option B: Next.js Middleware (if more control needed)**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''

  // Redirect pitchdreams.soccer to pitchdreams.com
  if (host.includes('pitchdreams.soccer')) {
    const url = request.nextUrl.clone()
    url.host = 'pitchdreams.com'
    return NextResponse.redirect(url, 301)
  }

  // Redirect www to apex
  if (host.startsWith('www.')) {
    const url = request.nextUrl.clone()
    url.host = host.replace('www.', '')
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
```

### SEO Considerations

Add canonical tags in `app/layout.tsx`:

```tsx
export const metadata = {
  metadataBase: new URL('https://pitchdreams.com'),
  alternates: {
    canonical: '/',
  },
}
```

## 4. Migration Checklist (Minimize Downtime)

### Phase 1: Preparation

- [ ] Screenshot current Porkbun DNS records for both domains
- [ ] Document all Netlify environment variables
- [ ] List current Netlify build settings
- [ ] Verify current site works on Netlify
- [ ] Note current Netlify URL (for rollback)

### Phase 2: Vercel Setup

- [ ] Create Vercel account (or use existing)
- [ ] Connect GitHub repository to Vercel
- [ ] Import project from GitHub
- [ ] Configure environment variables:
  ```
  DATABASE_URL=postgresql://...
  DIRECT_URL=postgresql://...
  NEXTAUTH_URL=https://pitchdreams.com
  NEXTAUTH_SECRET=...
  RESEND_API_KEY=re_...
  EMAIL_FROM=PitchDreams <noreply@...>
  ```
- [ ] Trigger initial deployment
- [ ] Verify site works on `*.vercel.app` preview URL
- [ ] Test all critical paths (auth, database, email)

### Phase 3: Add Domains to Vercel

In Vercel Dashboard → Project → Settings → Domains:

1. **Add pitchdreams.com**
   - [ ] Click "Add Domain"
   - [ ] Enter `pitchdreams.com`
   - [ ] Note the DNS records Vercel provides

2. **Add www.pitchdreams.com**
   - [ ] Add `www.pitchdreams.com`
   - [ ] Configure to redirect to apex

3. **Add pitchdreams.soccer**
   - [ ] Add `pitchdreams.soccer`
   - [ ] Configure to redirect to `pitchdreams.com`

4. **Add www.pitchdreams.soccer**
   - [ ] Add `www.pitchdreams.soccer`
   - [ ] Configure to redirect to `pitchdreams.com`

### Phase 4: Update DNS at Porkbun

**For pitchdreams.com:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 300 |
| CNAME | www | cname.vercel-dns.com | 300 |

**For pitchdreams.soccer:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 300 |
| CNAME | www | cname.vercel-dns.com | 300 |

Steps:
- [ ] Log into Porkbun
- [ ] Navigate to DNS for pitchdreams.com
- [ ] Delete existing Netlify records
- [ ] Add Vercel A record for apex
- [ ] Add Vercel CNAME for www
- [ ] Repeat for pitchdreams.soccer
- [ ] Set TTL to 300 (5 minutes) initially

### Phase 5: Verify SSL

- [ ] Wait 5-10 minutes for DNS propagation
- [ ] Check Vercel dashboard for SSL certificate status
- [ ] Vercel auto-provisions Let's Encrypt certificates
- [ ] Verify HTTPS works for all four domains:
  - https://pitchdreams.com
  - https://www.pitchdreams.com (should redirect)
  - https://pitchdreams.soccer (should redirect)
  - https://www.pitchdreams.soccer (should redirect)

### Phase 6: Validate Redirects

- [ ] Visit https://pitchdreams.soccer → should 301 to https://pitchdreams.com
- [ ] Visit https://www.pitchdreams.com → should 301 to https://pitchdreams.com
- [ ] Visit https://www.pitchdreams.soccer → should 301 to https://pitchdreams.com
- [ ] Check redirect headers: `curl -I https://pitchdreams.soccer`

### Phase 7: Post-Migration Validation

- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Test login flow
- [ ] Test signup flow
- [ ] Test password reset (email delivery)
- [ ] Test child training flow
- [ ] Test parent dashboard
- [ ] Verify database connectivity
- [ ] Check Vercel analytics for errors

### Phase 8: Cleanup

- [ ] Keep Netlify site running for 48 hours (fallback)
- [ ] Monitor for any traffic still hitting Netlify
- [ ] After 48 hours with no issues:
  - [ ] Increase DNS TTL to 3600 (1 hour)
  - [ ] Optionally delete Netlify site (or keep as backup)

## 5. Rollback Plan

If critical issues arise after migration:

### Immediate Rollback (< 5 minutes)

1. Log into Porkbun
2. Revert DNS records to Netlify values:
   - Delete Vercel A/CNAME records
   - Re-add Netlify records (should have screenshots)
3. Wait for DNS propagation (5-60 minutes depending on TTL)

### Netlify Fallback Records

Keep these handy (replace with actual Netlify values):
```
# pitchdreams.com
A @ <netlify-load-balancer-ip>
CNAME www <your-site>.netlify.app

# pitchdreams.soccer
A @ <netlify-load-balancer-ip>
CNAME www <your-site>.netlify.app
```

### Partial Rollback

If only one domain has issues:
- Revert just that domain's DNS
- Debug with the other domain on Vercel

## 6. Post-Migration Validation Checklist

| Check | Status | Notes |
|-------|--------|-------|
| pitchdreams.com loads | ☐ | |
| pitchdreams.soccer redirects | ☐ | |
| SSL valid on all domains | ☐ | |
| Auth login works | ☐ | |
| Auth signup works | ☐ | |
| Password reset email sends | ☐ | |
| Database queries work | ☐ | |
| Child flow complete | ☐ | |
| Parent dashboard loads | ☐ | |
| Mobile responsive | ☐ | |
| No console errors | ☐ | |
| Vercel analytics receiving data | ☐ | |

## 7. Future Option: Split Projects

When to consider splitting into separate Vercel projects:

- Marketing site needs different caching/CDN settings
- App needs separate scaling or security config
- Teams want independent deployment pipelines
- Analytics need to be separated

### How to Split Later

1. Create new Vercel project for marketing
2. Move marketing routes to separate repo/project
3. Update pitchdreams.com to point to marketing project
4. Create app subdomain (e.g., app.pitchdreams.com) for main app
5. Keep pitchdreams.soccer redirecting to marketing

**Decision**: Not doing this now. Single project is simpler for MVP.

## Cost Considerations

### Vercel Free Tier Limits

| Resource | Limit |
|----------|-------|
| Bandwidth | 100 GB/month |
| Serverless Function Execution | 100 GB-hours/month |
| Edge Function Invocations | 1M/month |
| Build Execution | 6000 minutes/month |
| Deployments | Unlimited |

For MVP pilot (3-5 users), free tier is more than sufficient.

## References

- [Vercel Custom Domains](https://vercel.com/docs/projects/domains)
- [Vercel Redirects](https://vercel.com/docs/edge-network/redirects)
- [Porkbun DNS Management](https://kb.porkbun.com/article/63-how-to-edit-dns)
- [DNS Propagation Checker](https://dnschecker.org)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

# 009: Hosting Migration from Netlify

## Current State

- **Domains**: Registered at Porkbun
  - `pitchdreams.soccer`
  - `pitchdreams.com`
- **Current Hosting**: Netlify
- **Framework**: Next.js 14 (App Router)

## Target Options

### Option 1: Vercel (Recommended)

| Aspect | Details |
|--------|---------|
| **Pros** | Native Next.js support, zero-config deployment, edge functions, analytics |
| **Cons** | Team features require paid plan |
| **Free Tier** | 100GB bandwidth, serverless functions, edge middleware |
| **Pricing** | Free for hobby; $20/mo Pro for teams |
| **Docs** | https://vercel.com/docs |

### Option 2: Cloudflare Pages

| Aspect | Details |
|--------|---------|
| **Pros** | Generous free tier, global CDN, Workers integration |
| **Cons** | Next.js App Router support is newer, some edge cases |
| **Free Tier** | Unlimited bandwidth, 500 builds/month |
| **Pricing** | Free tier very generous; $5/mo for Workers Paid |
| **Docs** | https://developers.cloudflare.com/pages |

### Option 3: Railway

| Aspect | Details |
|--------|---------|
| **Pros** | Simple Docker-based deploys, good for full-stack |
| **Cons** | Less Next.js-specific optimization |
| **Free Tier** | $5/mo credit, then usage-based |
| **Docs** | https://docs.railway.app |

## Recommendation: Vercel

**Chosen target: Vercel**

**Rationale:**
1. Native Next.js support (Vercel created Next.js)
2. Zero-config deployment with automatic optimizations
3. Built-in preview deployments for PRs
4. Edge middleware support out of the box
5. Generous free tier for hobby projects
6. Seamless integration with GitHub

## Migration Checklist

### Pre-Migration

- [ ] Export current DNS records from Porkbun (screenshot or export)
- [ ] Document current Netlify build settings
- [ ] Ensure all environment variables are documented
- [ ] Verify current site is working on Netlify

### Vercel Setup

- [ ] Create Vercel account (if not exists)
- [ ] Import GitHub repository to Vercel
- [ ] Configure environment variables:
  - `DATABASE_URL`
  - `NEXTAUTH_URL` (update to new domain)
  - `NEXTAUTH_SECRET`
  - `RESEND_API_KEY`
  - `EMAIL_FROM`
- [ ] Trigger initial deployment
- [ ] Verify deployment works on `*.vercel.app` preview URL

### Domain Configuration

- [ ] Add `pitchdreams.soccer` to Vercel project
- [ ] Add `pitchdreams.com` to Vercel project
- [ ] Note the required DNS records from Vercel

### DNS Update at Porkbun

For apex domain (`pitchdreams.com`):
```
Type: A
Host: @
Value: 76.76.21.21
```

For www subdomain:
```
Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

Repeat for `pitchdreams.soccer`.

- [ ] Update DNS records at Porkbun
- [ ] Set TTL low initially (300 seconds) for faster propagation
- [ ] Wait for DNS propagation (check with `dig` or https://dnschecker.org)

### SSL Verification

- [ ] Vercel auto-provisions SSL certificates
- [ ] Verify HTTPS works for both domains
- [ ] Verify HTTPS works for www and apex versions

### Redirects

Configure in `vercel.json` or `next.config.js`:

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.pitchdreams.com" }],
      "destination": "https://pitchdreams.com/:path*",
      "permanent": true
    },
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.pitchdreams.soccer" }],
      "destination": "https://pitchdreams.soccer/:path*",
      "permanent": true
    }
  ]
}
```

### Post-Migration

- [ ] Keep Netlify site live until DNS fully propagates (24-48 hours)
- [ ] Test both domains on mobile and desktop
- [ ] Test all auth flows (login, signup, password reset)
- [ ] Verify database connectivity
- [ ] Check email sending works
- [ ] Monitor Vercel analytics for errors

### Cleanup

- [ ] After 48 hours, verify no traffic to Netlify
- [ ] Delete Netlify site (optional, keeps as backup)
- [ ] Increase DNS TTL back to normal (3600 seconds)

## Rollback Plan

If issues arise after migration:

1. **Immediate**: Re-point DNS at Porkbun back to Netlify
   - Netlify DNS records should still work if site not deleted
2. **Verify**: Check Netlify site is still accessible
3. **Investigate**: Debug Vercel issues without production pressure
4. **Retry**: Fix issues and re-attempt migration

## Cost Considerations

### Vercel Free Tier Limits

| Resource | Limit |
|----------|-------|
| Bandwidth | 100 GB/month |
| Serverless Function Execution | 100 GB-hours/month |
| Edge Function Invocations | 1M/month |
| Build Execution | 6000 minutes/month |
| Deployments | Unlimited |

For a youth soccer training app with 3-5 pilot users, free tier is more than sufficient.

### When to Upgrade

Consider Pro plan ($20/mo) when:
- Multiple team members need dashboard access
- Need password-protected preview deployments
- Exceed free tier limits
- Need advanced analytics

## References

- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/domains)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Porkbun DNS Management](https://kb.porkbun.com/article/63-how-to-edit-dns)
- [DNS Propagation Checker](https://dnschecker.org)

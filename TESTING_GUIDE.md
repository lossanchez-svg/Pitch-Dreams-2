# Testing the HUD Design System

## Quick Start

1. **Start the development server:**
   ```bash
   cd "/Users/lossa/Documents/Side Projects/Pitch Dreams"
   npm run dev
   ```

2. **Open in your browser:**
   - http://localhost:3000/hud-demo - **Full HUD showcase (START HERE!)**
   - http://localhost:3000/styleguide - Component library with HUD section
   - http://localhost:3000 - Homepage

## What to Test

### HUD Demo Page (`/hud-demo`)

**Visual Elements:**
- ✅ **Clipped corner frames** - Look for the angled corners on cards
- ✅ **Grid overlay** - Subtle grid pattern in background
- ✅ **Scan line animation** - Horizontal line slowly moving down cards
- ✅ **Glow effects** - Cyan/lime glows around elements
- ✅ **Pitch lines** - Football field geometry in header section

**Typography:**
- ✅ **Rajdhani font** - Display headlines (TRAINING MODE, LOCK IT IN)
- ✅ **JetBrains Mono** - Data readouts (SESSION_TIMER, REP_COUNT, etc.)
- ✅ **HUD labels** - Small uppercase cyan labels (SYSTEM METRICS, etc.)

**Interactive Elements:**
- ✅ **HUD Buttons** - Click to see lock-in animation (slight scale + glow)
- ✅ **Data chips** - Inline stat displays with icons
- ✅ **Color scheme** - Cyan (primary), Lime (success), Magenta (special)

**Animations:**
- ✅ **System online** - Content fades in on page load
- ✅ **Lock-in** - Button press animation (click any HUD button)
- ✅ **Glow pulse** - Continuous subtle pulse on some elements

### Styleguide Page (`/styleguide`)

**New HUD Section (Top of page):**
- ✅ **HUD utilities showcase** - Examples of all utility classes
- ✅ **Interactive buttons** - Test different HUD button variants
- ✅ **Font specimens** - See all three fonts in action
- ✅ **Utility class examples** - `.hud-frame`, `.hud-panel`, `.hud-grid`

### Dark Mode Testing

The HUD design is optimized for dark mode (child training mode):

1. **Enable dark mode** (if not default):
   - System: macOS System Preferences → Appearance → Dark
   - Browser DevTools: Toggle dark mode in rendering settings

2. **What to check:**
   - Background: Deep black/gray (`bg-gray-950`)
   - Text: High contrast cyan and lime on dark
   - Grid: Subtle but visible
   - Glows: More prominent in dark mode

### Reduced Motion Testing

The design respects accessibility preferences:

1. **Enable reduced motion**:
   - macOS: System Preferences → Accessibility → Display → Reduce Motion
   - Browser DevTools: Toggle "prefers-reduced-motion" in rendering settings

2. **What should happen:**
   - ❌ Scan line animation stops
   - ❌ Glow pulse stops
   - ❌ Lock-in animation disabled
   - ✅ Layout and colors remain the same
   - ✅ Functionality works normally

### Responsive Testing

**Mobile (< 768px):**
- Stats cards stack vertically
- Buttons remain 48px min height (thumb-friendly)
- HUD frames scale correctly
- Font sizes remain readable

**Tablet (768px - 1024px):**
- 2-column grid for stats
- Navigation adjusts
- Touch targets remain large

**Desktop (> 1024px):**
- Full 3-column layouts
- Optimal spacing
- Hover states visible

## Browser Testing

**Recommended:**
- ✅ Chrome/Edge (Chromium) - Best support for backdrop-filter
- ✅ Safari - Test clip-path rendering
- ✅ Firefox - Verify animations

**Known Issues:**
- Backdrop blur may not work in older browsers (graceful degradation)
- Clip-path supported in all modern browsers

## Performance Testing

**What to check:**
- Animations run at 60fps (smooth, no jank)
- Scan line doesn't cause layout shifts
- Grid pattern doesn't impact performance
- Page loads quickly (< 2s on 3G)

**Tools:**
- Chrome DevTools → Performance tab
- Lighthouse audit (target: 90+ performance score)

## Accessibility Testing

**Keyboard Navigation:**
1. Tab through all interactive elements
2. Focus rings should be visible (cyan)
3. Skip to content should work
4. No keyboard traps

**Screen Reader Testing:**
- VoiceOver (macOS): Cmd + F5
- NVDA (Windows): Free download
- Test: All buttons have labels, images have alt text

**Color Contrast:**
- Cyan on dark: 7.8:1 (Passes WCAG AA)
- Lime on dark: 9.2:1 (Passes WCAG AAA)
- All text meets minimum contrast

## Component Behavior

### HUD Button
```tsx
<Button variant="hud">Lock it in</Button>
```
- **Hover**: Cyan glow appears
- **Click**: Lock-in animation (scale + glow burst)
- **Focus**: Cyan focus ring

### HUD Card
```tsx
<Card variant="hud" className="hud-scanline">
  {/* content */}
</Card>
```
- **Frame**: Clipped corners visible
- **Grid**: Background pattern subtle
- **Scan line**: Moves top to bottom (4s cycle)

### HUD Chip
```tsx
<div className="hud-chip">
  <Icon />
  STAT_NAME: VALUE
</div>
```
- **Style**: Mono font, cyan border
- **Size**: Auto-width based on content
- **Icon**: 16x16px (h-4 w-4)

## Common Issues & Fixes

### Fonts not loading
**Problem**: Rajdhani or JetBrains Mono not showing
**Fix**: Check browser console for font loading errors, verify Google Fonts CDN access

### Animations not respecting reduced motion
**Problem**: Animations still play with reduced motion enabled
**Fix**: Check CSS `@media (prefers-reduced-motion: reduce)` rules in globals.css

### Clip-path not rendering
**Problem**: HUD frames appear as regular rectangles
**Fix**: Update to modern browser, check for browser extensions blocking CSS

### Grid pattern too bright/dark
**Problem**: Grid visibility issues
**Fix**: Adjust `--hud-grid-size` or opacity values in globals.css

## Success Criteria

✅ **Visual Design**
- [ ] HUD frames have clipped corners
- [ ] Grid pattern visible but not distracting
- [ ] Scan lines animate smoothly
- [ ] Colors match design (cyan, lime, magenta)

✅ **Typography**
- [ ] Rajdhani used for headings
- [ ] JetBrains Mono used for data/labels
- [ ] Inter used for body text
- [ ] All text readable at minimum sizes

✅ **Interactions**
- [ ] Buttons respond to hover/click
- [ ] Animations smooth (60fps)
- [ ] Touch targets minimum 48x48px
- [ ] Keyboard navigation works

✅ **Accessibility**
- [ ] Reduced motion respected
- [ ] Color contrast passes WCAG AA
- [ ] Screen reader friendly
- [ ] Keyboard accessible

✅ **Performance**
- [ ] Page loads < 2s
- [ ] No layout shifts
- [ ] Animations don't lag
- [ ] Lighthouse score 90+

## Next Steps After Testing

Once you've verified the HUD system works:

1. **Build child components** (SessionTimer, RepCounter, etc.)
2. **Create child routes** (/child/[id]/home, /training, etc.)
3. **Implement parent dashboard** (light mode, clean design)
4. **Add middleware** (route protection)
5. **Deploy to Vercel**

See `IMPLEMENTATION_STATUS.md` for detailed next steps!

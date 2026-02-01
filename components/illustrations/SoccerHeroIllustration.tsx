'use client'

// Anime-inspired soccer hero illustration for the landing page
// Features a young player in a dynamic kicking pose with HUD elements

export default function SoccerHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Anime-style illustration of a young soccer player kicking a ball"
      role="img"
    >
      {/* Background elements */}
      <defs>
        {/* Grass gradient */}
        <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0.5" />
        </linearGradient>

        {/* Sky/energy gradient */}
        <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
        </linearGradient>

        {/* Ball gradient */}
        <radialGradient id="ballGradient" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fafafa" />
          <stop offset="100%" stopColor="#d1d5db" />
        </radialGradient>

        {/* Primary accent glow */}
        <filter id="glowPrimary" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Motion blur effect */}
        <filter id="motionBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2 0" />
        </filter>
      </defs>

      {/* Background circle glow */}
      <circle cx="200" cy="200" r="180" fill="url(#energyGradient)" />

      {/* Pitch/grass element at bottom */}
      <ellipse cx="200" cy="360" rx="180" ry="40" fill="url(#grassGradient)" />
      <path d="M20 360 Q200 340 380 360" stroke="#22c55e" strokeWidth="2" strokeOpacity="0.5" fill="none" />

      {/* HUD Frame elements */}
      <g className="text-primary-500" stroke="currentColor" strokeOpacity="0.4">
        {/* Top-left bracket */}
        <path d="M30 30 L30 60 M30 30 L60 30" strokeWidth="2" />
        {/* Top-right bracket */}
        <path d="M370 30 L370 60 M370 30 L340 30" strokeWidth="2" />
        {/* Bottom-left bracket */}
        <path d="M30 370 L30 340 M30 370 L60 370" strokeWidth="2" />
        {/* Bottom-right bracket */}
        <path d="M370 370 L370 340 M370 370 L340 370" strokeWidth="2" />
      </g>

      {/* Motion lines behind player */}
      <g stroke="#06b6d4" strokeWidth="2" strokeOpacity="0.4">
        <line x1="80" y1="180" x2="120" y2="180" strokeLinecap="round" />
        <line x1="70" y1="200" x2="130" y2="200" strokeLinecap="round" />
        <line x1="80" y1="220" x2="120" y2="220" strokeLinecap="round" />
        <line x1="90" y1="240" x2="110" y2="240" strokeLinecap="round" />
      </g>

      {/* Player silhouette - anime style */}
      <g transform="translate(140, 80)">
        {/* Player body - dynamic kicking pose */}
        {/* Hair */}
        <ellipse cx="60" cy="25" rx="25" ry="20" fill="#1f2937" />
        <path d="M40 30 Q35 15 50 10 Q65 5 75 15 Q85 10 80 30" fill="#374151" />

        {/* Head */}
        <ellipse cx="60" cy="40" rx="18" ry="20" fill="#fcd9b6" />
        {/* Eyes - anime style */}
        <ellipse cx="52" cy="38" rx="4" ry="5" fill="#1f2937" />
        <ellipse cx="68" cy="38" rx="4" ry="5" fill="#1f2937" />
        <ellipse cx="53" cy="37" rx="1.5" ry="2" fill="white" />
        <ellipse cx="69" cy="37" rx="1.5" ry="2" fill="white" />
        {/* Determined expression */}
        <path d="M55 48 Q60 52 65 48" stroke="#1f2937" strokeWidth="2" fill="none" />

        {/* Jersey - primary color */}
        <path d="M35 60 Q30 65 28 90 L40 95 Q60 80 80 95 L92 90 Q90 65 85 60 Q60 55 35 60" fill="#06b6d4" />
        {/* Jersey number */}
        <text x="60" y="82" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="monospace">10</text>
        {/* Jersey collar */}
        <path d="M45 60 Q60 65 75 60" stroke="white" strokeWidth="2" fill="none" />

        {/* Arms */}
        {/* Left arm (back, bent) */}
        <path d="M28 65 Q15 75 20 95" stroke="#fcd9b6" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Right arm (forward, extended) */}
        <path d="M92 65 Q105 70 115 60" stroke="#fcd9b6" strokeWidth="10" strokeLinecap="round" fill="none" />

        {/* Shorts */}
        <path d="M40 95 L35 130 L50 130 Q60 115 70 130 L85 130 L80 95" fill="#1f2937" />

        {/* Legs */}
        {/* Standing leg (left) */}
        <path d="M42 130 L38 180 L35 220" stroke="#fcd9b6" strokeWidth="12" strokeLinecap="round" fill="none" />
        {/* Kicking leg (right) - extended back for power */}
        <path d="M75 130 Q100 150 130 140" stroke="#fcd9b6" strokeWidth="12" strokeLinecap="round" fill="none" />

        {/* Socks */}
        <rect x="30" y="185" width="15" height="35" rx="4" fill="#06b6d4" />

        {/* Cleats */}
        <ellipse cx="35" cy="225" rx="12" ry="6" fill="#1f2937" />
        {/* Kicking foot */}
        <ellipse cx="135" cy="140" rx="12" ry="8" fill="#1f2937" transform="rotate(-20 135 140)" />
      </g>

      {/* Soccer ball with motion effect */}
      <g transform="translate(310, 180)">
        {/* Motion trail */}
        <ellipse cx="-30" cy="0" rx="25" ry="20" fill="#06b6d4" fillOpacity="0.2" filter="url(#motionBlur)" />
        <ellipse cx="-15" cy="0" rx="22" ry="18" fill="#06b6d4" fillOpacity="0.3" filter="url(#motionBlur)" />

        {/* Ball */}
        <circle cx="0" cy="0" r="30" fill="url(#ballGradient)" stroke="#374151" strokeWidth="1" />
        {/* Ball pentagon pattern */}
        <path d="M0 -15 L10 -5 L6 8 L-6 8 L-10 -5 Z" fill="#1f2937" />
        <path d="M-20 -10 L-10 -5 L-15 5 L-25 0 Z" fill="#1f2937" transform="rotate(72 0 0)" />
        <path d="M-20 -10 L-10 -5 L-15 5 L-25 0 Z" fill="#1f2937" transform="rotate(144 0 0)" />
        <path d="M-20 -10 L-10 -5 L-15 5 L-25 0 Z" fill="#1f2937" transform="rotate(216 0 0)" />
        <path d="M-20 -10 L-10 -5 L-15 5 L-25 0 Z" fill="#1f2937" transform="rotate(288 0 0)" />

        {/* Ball shine */}
        <ellipse cx="-8" cy="-10" rx="6" ry="4" fill="white" fillOpacity="0.6" />
      </g>

      {/* HUD overlay elements */}
      <g filter="url(#glowPrimary)">
        {/* XP bar at top */}
        <rect x="80" y="50" width="240" height="8" rx="4" fill="#1f2937" fillOpacity="0.8" />
        <rect x="80" y="50" width="180" height="8" rx="4" fill="#06b6d4" />
        <text x="330" y="57" fill="#06b6d4" fontSize="10" fontFamily="monospace">LVL 7</text>

        {/* Stats panel - bottom left */}
        <g transform="translate(30, 280)">
          <rect x="0" y="0" width="100" height="60" rx="4" fill="#1f2937" fillOpacity="0.8" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.5" />
          <text x="10" y="18" fill="#06b6d4" fontSize="9" fontFamily="monospace">STREAK</text>
          <text x="10" y="35" fill="white" fontSize="16" fontWeight="bold" fontFamily="monospace">12 DAYS</text>
          <text x="10" y="52" fill="#22c55e" fontSize="9" fontFamily="monospace">+2 THIS WEEK</text>
        </g>

        {/* Power indicator - right side */}
        <g transform="translate(350, 120)">
          <rect x="0" y="0" width="20" height="100" rx="2" fill="#1f2937" fillOpacity="0.8" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.5" />
          <rect x="3" y="60" width="14" height="37" rx="1" fill="#22c55e" />
          <rect x="3" y="40" width="14" height="17" rx="1" fill="#eab308" />
          <text x="10" y="-5" fill="#06b6d4" fontSize="8" fontFamily="monospace" textAnchor="middle">PWR</text>
        </g>
      </g>

      {/* Decorative particles */}
      <g fill="#06b6d4" fillOpacity="0.6">
        <circle cx="290" cy="150" r="3" />
        <circle cx="320" cy="130" r="2" />
        <circle cx="340" cy="160" r="2" />
        <circle cx="300" cy="200" r="2" />
        <circle cx="335" cy="210" r="3" />
      </g>

      {/* Energy sparks around player */}
      <g stroke="#06b6d4" strokeWidth="2" strokeLinecap="round">
        <line x1="250" y1="100" x2="265" y2="90" />
        <line x1="270" y1="95" x2="280" y2="110" />
        <line x1="255" y1="280" x2="270" y2="270" />
        <line x1="275" y1="285" x2="265" y2="295" />
      </g>
    </svg>
  )
}

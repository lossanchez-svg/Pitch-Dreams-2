'use client'

// Soccer skill icons SVG set for Pitch Dreams
// Each icon represents a training category

interface IconProps {
  className?: string
  size?: number
}

// Ball Control - foot on ball with control lines
export function BallControlIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ball Control skill icon"
    >
      {/* Soccer ball */}
      <circle cx="24" cy="28" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 18 L27 23 L25 27 L21 27 L19 23 Z" fill="currentColor" fillOpacity="0.3" />
      <circle cx="24" cy="28" r="5" fill="currentColor" fillOpacity="0.2" />

      {/* Control foot outline */}
      <path
        d="M14 16 Q18 14 22 15 L24 18 Q22 20 18 19 Q14 18 14 16"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.2"
      />

      {/* Control indicator lines */}
      <path d="M10 28 L6 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M42 28 L38 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M24 44 L24 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />

      {/* Touch indicator dots */}
      <circle cx="24" cy="10" r="2" fill="currentColor" />
      <circle cx="20" cy="11" r="1.5" fill="currentColor" fillOpacity="0.6" />
      <circle cx="28" cy="11" r="1.5" fill="currentColor" fillOpacity="0.6" />
    </svg>
  )
}

// Shooting - ball flying toward goal with power lines
export function ShootingIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Shooting skill icon"
    >
      {/* Goal posts */}
      <path d="M8 40 L8 16 L40 16 L40 40" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 16 L24 8 L40 16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />

      {/* Net pattern */}
      <g stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3">
        <line x1="16" y1="16" x2="16" y2="40" />
        <line x1="24" y1="16" x2="24" y2="40" />
        <line x1="32" y1="16" x2="32" y2="40" />
        <line x1="8" y1="24" x2="40" y2="24" />
        <line x1="8" y1="32" x2="40" y2="32" />
      </g>

      {/* Soccer ball flying */}
      <circle cx="24" cy="26" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 22 L26 24 L25 27 L23 27 L22 24 Z" fill="currentColor" fillOpacity="0.4" />

      {/* Power/motion lines */}
      <line x1="8" y1="36" x2="14" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="32" x2="12" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="4" y1="38" x2="10" y2="34" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.3" />

      {/* Impact star */}
      <g transform="translate(24, 26)">
        <line x1="-10" y1="0" x2="-14" y2="0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="10" y1="0" x2="14" y2="0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
      </g>
    </svg>
  )
}

// Dribbling - ball with zigzag path
export function DribblingIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dribbling skill icon"
    >
      {/* Zigzag dribbling path */}
      <path
        d="M8 40 L16 32 L10 24 L18 16 L12 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="4 2"
      />

      {/* Cones/markers */}
      <path d="M14 32 L18 40 L10 40 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
      <path d="M12 24 L16 32 L8 32 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <path d="M16 16 L20 24 L12 24 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />

      {/* Soccer ball at end of path */}
      <circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M32 18 L35 21 L34 26 L30 26 L29 21 Z" fill="currentColor" fillOpacity="0.3" />

      {/* Speed lines */}
      <line x1="20" y1="20" x2="24" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="22" y1="18" x2="26" y2="22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.3" />

      {/* Foot/player indicator */}
      <ellipse cx="40" cy="30" rx="4" ry="6" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// Passing - ball trajectory between points
export function PassingIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Passing skill icon"
    >
      {/* Player marker A */}
      <circle cx="8" cy="36" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
      <text x="8" y="39" textAnchor="middle" fill="currentColor" fontSize="6" fontWeight="bold">A</text>

      {/* Player marker B */}
      <circle cx="40" cy="12" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
      <text x="40" y="15" textAnchor="middle" fill="currentColor" fontSize="6" fontWeight="bold">B</text>

      {/* Pass trajectory arc */}
      <path
        d="M12 34 Q24 12 36 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 2"
        fill="none"
      />

      {/* Soccer ball in motion */}
      <g transform="translate(24, 20)">
        <circle cx="0" cy="0" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M0 -3 L2 0 L1 3 L-1 3 L-2 0 Z" fill="currentColor" fillOpacity="0.4" />
      </g>

      {/* Arrow head */}
      <path d="M34 16 L38 12 L36 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Distance indicator */}
      <line x1="8" y1="44" x2="40" y2="44" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="8" y1="42" x2="8" y2="46" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="40" y1="42" x2="40" y2="46" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />

      {/* Spin indicator */}
      <path d="M28 22 Q32 20 30 16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" />
    </svg>
  )
}

// Defense - shield with ball
export function DefenseIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Defense skill icon"
    >
      {/* Shield shape */}
      <path
        d="M24 4 L40 10 L40 26 Q40 38 24 44 Q8 38 8 26 L8 10 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.1"
      />

      {/* Inner shield accent */}
      <path
        d="M24 10 L34 14 L34 24 Q34 32 24 38 Q14 32 14 24 L14 14 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.5"
        fill="none"
      />

      {/* Soccer ball inside */}
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 19 L27 22 L26 26 L22 26 L21 22 Z" fill="currentColor" fillOpacity="0.3" />

      {/* Block lines */}
      <line x1="16" y1="16" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="16" x2="28" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Defense indicator */}
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.3" fill="none" />
    </svg>
  )
}

// Game IQ - brain with soccer pattern
export function GameIQIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Game IQ skill icon"
    >
      {/* Brain outline */}
      <path
        d="M16 36 Q8 36 8 28 Q6 24 8 20 Q8 14 14 12 Q16 8 24 8 Q32 8 34 12 Q40 14 40 20 Q42 24 40 28 Q40 36 32 36"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.1"
      />

      {/* Brain center line */}
      <path d="M24 12 L24 36" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />

      {/* Brain wrinkles/folds - left */}
      <path d="M12 20 Q18 22 16 28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      <path d="M14 16 Q20 18 18 22" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.4" />

      {/* Brain wrinkles/folds - right */}
      <path d="M36 20 Q30 22 32 28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      <path d="M34 16 Q28 18 30 22" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.4" />

      {/* Soccer ball pattern overlay in center */}
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M24 20 L26 22 L25 25 L23 25 L22 22 Z" fill="currentColor" fillOpacity="0.4" />

      {/* Thought/idea sparks */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="24" y1="4" x2="24" y2="2" />
        <line x1="30" y1="6" x2="32" y2="4" />
        <line x1="18" y1="6" x2="16" y2="4" />
      </g>

      {/* Strategy dots */}
      <circle cx="14" cy="24" r="2" fill="currentColor" fillOpacity="0.6" />
      <circle cx="34" cy="24" r="2" fill="currentColor" fillOpacity="0.6" />

      {/* Connection lines representing neural paths */}
      <path d="M16 24 L22 24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <path d="M26 24 L32 24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />

      {/* Question/analysis indicator */}
      <text x="24" y="44" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold" fontFamily="monospace">IQ</text>
    </svg>
  )
}

// Export all icons with their names for the skills section
export const skillIcons = {
  ballControl: BallControlIcon,
  shooting: ShootingIcon,
  dribbling: DribblingIcon,
  passing: PassingIcon,
  defense: DefenseIcon,
  gameIQ: GameIQIcon,
}

export type SkillIconName = keyof typeof skillIcons

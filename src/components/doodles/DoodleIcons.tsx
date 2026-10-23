import React from 'react';

// ==========================================
// ACCENT DOODLES (Floating squiggles, stars, loops)
// ==========================================

export const DoodleSquiggle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-16 h-4',
  color = '#F97316',
}) => (
  <svg
    viewBox="0 0 100 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3 14C12 4 18 20 28 10C38 0 44 22 54 12C64 2 70 20 80 10C88 2 94 16 97 12"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-32 h-4',
  color = '#F59E0B',
}) => (
  <svg
    viewBox="0 0 160 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3 15C35 4 80 17 120 7C135 3 150 12 157 11"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleSparkle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#EC4899',
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 2C16 10 18 14 26 16C18 18 16 22 16 30C16 22 14 18 6 16C14 14 16 10 16 2Z"
      fill={color}
    />
  </svg>
);

export const DoodleCurlyLoop: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-12 h-12',
  color = '#8B5CF6',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 38C12 40 22 42 26 34C30 26 22 16 14 22C6 28 16 42 28 38C40 34 42 16 34 8"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleArrow: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-16 h-12',
  color = '#10B981',
}) => (
  <svg
    viewBox="0 0 70 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 38C18 36 34 28 46 16C50 12 56 8 62 10"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50 8C56 9 61 9 63 11C61 16 57 23 54 27"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleStar: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#FBBF24',
}) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M18 3L21.5 12.5L31.5 14L24 21L26 31L18 26L10 31L12 21L4.5 14L14.5 12.5L18 3Z"
      fill={color}
    />
  </svg>
);

export const DoodleCircleBadge: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-24 h-24',
  color = '#3B82F6',
}) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M40 8C58 8 72 22 71 40C70 58 56 71 38 71C20 71 8 57 9 39C10 20 25 7 43 8"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="4 6"
    />
  </svg>
);

// ==========================================
// 4 BESPOKE HAND-DRAWN DOODLE CARD ILLUSTRATIONS
// (Fixing the "AI-generated" empty arch look)
// ==========================================

/**
 * 1. Honey & Invert Sugar Dilution Doodle Illustration
 * Shows cute honey jar, dipper dripping syrup, chemical beaker dripping invert syrup, and friendly bee doodle.
 */
export const HoneyTrapDoodle: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft warm background circle */}
    <circle cx="140" cy="95" r="70" fill="#FEF3C7" opacity="0.7" />

    {/* Hand-drawn Honey Pot */}
    <path
      d="M85 75C85 68 95 62 130 62C165 62 175 68 175 75C175 80 170 84 165 88L170 142C170 152 155 158 130 158C105 158 90 152 90 142L95 88C90 84 85 80 85 75Z"
      fill="#FDE68A"
      stroke="#1E293B"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Honey pot rim */}
    <path
      d="M85 75C85 72 105 68 130 68C155 68 175 72 175 75C175 78 155 82 130 82C105 82 85 78 85 75Z"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="3"
    />
    {/* Pot label: "HONEY" with doodle heart */}
    <rect x="105" y="100" width="50" height="32" rx="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
    <text x="130" y="118" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1E293B" fontFamily="sans-serif">HONEY</text>
    <path d="M125 124C125 122 127 121 129 122C130 123 130 124 130 125C130 124 130 123 131 122C133 121 135 122 135 124C135 126 130 128 130 129C130 128 125 126 125 124Z" fill="#EF4444" />

    {/* Honey dipper on the right */}
    <g transform="rotate(25 170 50)">
      {/* Dipper stick */}
      <path d="M165 20L165 95" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
      {/* Grooves */}
      <rect x="157" y="55" width="16" height="7" rx="3.5" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
      <rect x="155" y="65" width="20" height="8" rx="4" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
      <rect x="157" y="76" width="16" height="7" rx="3.5" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
      {/* Golden drip */}
      <path d="M165 86C165 86 160 96 165 102C170 96 165 86 165 86Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
    </g>

    {/* Adulteration flask / beaker on left */}
    <g transform="translate(30, 75)">
      <path
        d="M25 15L35 15L35 25L50 55C52 59 49 64 44 64L16 64C11 64 8 59 10 55L25 25L25 15Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Liquid inside */}
      <path d="M14 55L46 55L43 60L17 60Z" fill="#F43F5E" />
      <text x="30" y="52" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#F43F5E" fontFamily="sans-serif">SYRUP</text>
      {/* Alert drop */}
      <circle cx="30" cy="72" r="3" fill="#F43F5E" />
    </g>

    {/* Cute buzzing bee doodle top right */}
    <g transform="translate(195, 30)">
      {/* Wings */}
      <ellipse cx="14" cy="8" rx="6" ry="9" transform="rotate(-30 14 8)" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2" />
      <ellipse cx="22" cy="8" rx="6" ry="9" transform="rotate(20 22 8)" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2" />
      {/* Body */}
      <ellipse cx="18" cy="18" rx="12" ry="9" fill="#FACC15" stroke="#1E293B" strokeWidth="2.5" />
      {/* Stripes */}
      <path d="M14 10L14 26" stroke="#1E293B" strokeWidth="2.5" />
      <path d="M20 10L20 26" stroke="#1E293B" strokeWidth="2.5" />
      {/* Eye & smile */}
      <circle cx="25" cy="16" r="1.5" fill="#1E293B" />
      {/* Stinger */}
      <path d="M6 18L2 18" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      {/* Flight trail dots */}
      <path d="M-8 26C-14 24 -18 32 -26 28" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
    </g>

    {/* Sparkle doodles */}
    <path d="M75 42C75 46 76 48 80 49C76 50 75 52 75 56C75 52 74 50 70 49C74 48 75 46 75 42Z" fill="#F59E0B" />
    <path d="M190 120C190 123 191 125 194 126C191 127 190 129 190 132C190 129 189 127 186 126C189 125 190 123 190 120Z" fill="#F59E0B" />
  </svg>
);

/**
 * 2. Gym Protein Washing Scam Doodle Illustration
 * Shows snapped chocolate crisp protein bar, giant cartoon asterisk `*`, gym dumbbell, and tiny "Pack of 3" alert.
 */
export const ProteinWashingDoodle: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft warm pink background circle */}
    <circle cx="140" cy="95" r="70" fill="#FCE7F3" opacity="0.7" />

    {/* Gym Dumbbell in background */}
    <g transform="translate(60, 35) rotate(-15)">
      <rect x="0" y="10" width="12" height="26" rx="4" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" />
      <rect x="12" y="13" width="8" height="20" rx="3" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
      <rect x="20" y="20" width="55" height="6" rx="2" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2.5" />
      <rect x="75" y="13" width="8" height="20" rx="3" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
      <rect x="83" y="10" width="12" height="26" rx="4" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" />
    </g>

    {/* Snapped Chocolate Protein Bar Left Half */}
    <g transform="translate(70, 75) rotate(-8)">
      <rect x="0" y="0" width="60" height="38" rx="6" fill="#78350F" stroke="#1E293B" strokeWidth="3" />
      {/* Chocolate squares */}
      <rect x="6" y="6" width="20" height="26" rx="3" fill="#92400E" stroke="#1E293B" strokeWidth="1.5" />
      <rect x="30" y="6" width="22" height="26" rx="3" fill="#92400E" stroke="#1E293B" strokeWidth="1.5" />
      {/* Jagged break on right */}
      <path d="M60 0L56 12L62 24L57 38" stroke="#1E293B" strokeWidth="3" fill="#B45309" />
    </g>

    {/* Snapped Chocolate Protein Bar Right Half */}
    <g transform="translate(138, 83) rotate(12)">
      <rect x="0" y="0" width="60" height="38" rx="6" fill="#78350F" stroke="#1E293B" strokeWidth="3" />
      {/* Chocolate squares */}
      <rect x="8" y="6" width="20" height="26" rx="3" fill="#92400E" stroke="#1E293B" strokeWidth="1.5" />
      <rect x="32" y="6" width="20" height="26" rx="3" fill="#92400E" stroke="#1E293B" strokeWidth="1.5" />
      {/* Jagged break on left */}
      <path d="M0 0L4 12L-2 24L3 38" stroke="#1E293B" strokeWidth="3" fill="#B45309" />
    </g>

    {/* Giant Playful Cartoon Asterisk Loophole Badge */}
    <g transform="translate(170, 40)">
      <circle cx="30" cy="30" r="26" fill="#F43F5E" stroke="#1E293B" strokeWidth="3" />
      {/* Asterisk character */}
      <text x="30" y="44" textAnchor="middle" fontSize="38" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">*</text>
      {/* Wobbly loop accent */}
      <path d="M54 12C60 6 68 14 62 20" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Cartoon Magnifying glass pointing to "*per 3-bar pack" */}
    <g transform="translate(95, 115)">
      {/* Bubble label */}
      <rect x="25" y="10" width="115" height="28" rx="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
      <text x="82" y="28" textAnchor="middle" fontSize="9" fontWeight="900" fill="#F43F5E" fontFamily="sans-serif">
        *NOT 1 BAR (PACK OF 3!)
      </text>
      {/* Glass pointer */}
      <circle cx="16" cy="24" r="14" fill="#E0F2FE" fillOpacity="0.6" stroke="#1E293B" strokeWidth="3" />
      <path d="M6 34L-4 44" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
      {/* Glass shine */}
      <path d="M12 16C16 14 22 16 24 20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Doodles */}
    <path d="M40 100C36 102 32 108 34 114" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M235 90C240 92 245 96 242 102" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/**
 * 3. Diabetic Maltodextrin Danger Doodle Illustration
 * Shows a sweet cookie biscuit, an alarming spiking glucose waveform doodle (GI 110!), and blood sugar meter drop.
 */
export const DiabeticMaltodextrinDoodle: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft mint green background circle */}
    <circle cx="140" cy="95" r="70" fill="#D1FAE5" opacity="0.7" />

    {/* Digestive biscuit on the left */}
    <g transform="translate(45, 60)">
      {/* Round biscuit */}
      <circle cx="45" cy="45" r="40" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
      {/* Fluted biscuit edge dots */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <circle
          key={deg}
          cx={45 + 32 * Math.cos((deg * Math.PI) / 180)}
          cy={45 + 32 * Math.sin((deg * Math.PI) / 180)}
          r="2.5"
          fill="#D97706"
        />
      ))}
      {/* Inner biscuit perforations */}
      <circle cx="35" cy="35" r="2.5" fill="#B45309" />
      <circle cx="55" cy="35" r="2.5" fill="#B45309" />
      <circle cx="35" cy="55" r="2.5" fill="#B45309" />
      <circle cx="55" cy="55" r="2.5" fill="#B45309" />
      <circle cx="45" cy="45" r="2.5" fill="#B45309" />
      {/* Text "DIGESTIVE" */}
      <text x="45" y="48" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#92400E" fontFamily="sans-serif">
        "ZERO SUGAR"
      </text>
    </g>

    {/* Blood Glucose Spike Graph (Doodle style) */}
    <g transform="translate(130, 45)">
      {/* Chart container with soft shadow */}
      <rect x="0" y="0" width="115" height="85" rx="12" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
      {/* Grid lines */}
      <line x1="12" y1="20" x2="103" y2="20" stroke="#F1F5F9" strokeWidth="1.5" />
      <line x1="12" y1="42" x2="103" y2="42" stroke="#F1F5F9" strokeWidth="1.5" />
      <line x1="12" y1="65" x2="103" y2="65" stroke="#F1F5F9" strokeWidth="1.5" />
      {/* Axis baseline */}
      <line x1="12" y1="72" x2="103" y2="72" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

      {/* Dangerous Glycemic Spike Curve */}
      <path
        d="M15 70C25 70 32 68 40 55C48 40 55 12 62 14C70 16 75 48 85 55C92 60 98 68 102 70"
        stroke="#10B981"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Danger peak pulse */}
      <circle cx="62" cy="14" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="62" cy="14" r="8" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 2" />

      {/* GI 110 Peak badge */}
      <g transform="translate(48, -12)">
        <rect x="0" y="0" width="50" height="18" rx="9" fill="#EF4444" stroke="#1E293B" strokeWidth="1.5" />
        <text x="25" y="12" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">
          GI 110!
        </text>
      </g>
    </g>

    {/* Glucose Droplet & warning badge */}
    <g transform="translate(195, 125)">
      <path
        d="M18 4C18 4 6 18 6 26C6 32 11 38 18 38C25 38 30 32 30 26C30 18 18 4 18 4Z"
        fill="#EF4444"
        stroke="#1E293B"
        strokeWidth="2.5"
      />
      {/* Exclamation */}
      <text x="18" y="29" textAnchor="middle" fontSize="13" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">!</text>
    </g>

    {/* Sparkle doodles */}
    <path d="M30 40C30 44 32 46 36 47C32 48 30 50 30 54C30 50 28 48 24 47C28 46 30 44 30 40Z" fill="#10B981" />
  </svg>
);

/**
 * 4. Shrinkflation & Stealth Hikes Doodle Illustration
 * Shows side-by-side comparison of 250g large pack vs 180g shrunken pack with dashed shrinking arrows and identical price tags.
 */
export const ShrinkflationDoodle: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft lavender background circle */}
    <circle cx="140" cy="95" r="70" fill="#EDE9FE" opacity="0.7" />

    {/* Original 250g Bag (Left - Big) */}
    <g transform="translate(50, 40)">
      {/* Chip bag outline */}
      <path
        d="M10 18C15 15 45 15 50 18L55 105C48 108 12 108 5 105L10 18Z"
        fill="#DDD6FE"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Crimp edges top and bottom */}
      <path d="M8 18L52 18" stroke="#1E293B" strokeWidth="2.5" strokeDasharray="3 2" />
      <path d="M4 105L56 105" stroke="#1E293B" strokeWidth="2.5" strokeDasharray="3 2" />
      {/* Weight badge */}
      <rect x="15" y="50" width="30" height="20" rx="4" fill="#8B5CF6" stroke="#1E293B" strokeWidth="1.5" />
      <text x="30" y="64" textAnchor="middle" fontSize="10" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">
        250g
      </text>
      {/* Price tag */}
      <text x="30" y="86" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1E293B" fontFamily="sans-serif">
        ₹60
      </text>
      <text x="30" y="122" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#6D28D9" fontFamily="sans-serif">
        BEFORE
      </text>
    </g>

    {/* Shrunken 180g Bag (Right - Small) */}
    <g transform="translate(165, 58)">
      {/* Ghost outline of original size */}
      <rect x="-2" y="-12" width="52" height="98" rx="4" fill="none" stroke="#A78BFA" strokeWidth="2" strokeDasharray="4 4" />

      {/* Actual shrunken bag */}
      <path
        d="M8 12C12 10 38 10 42 12L46 80C40 82 10 82 4 80L8 12Z"
        fill="#DDD6FE"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M6 12L44 12" stroke="#1E293B" strokeWidth="2.5" strokeDasharray="3 2" />
      <path d="M3 80L47 80" stroke="#1E293B" strokeWidth="2.5" strokeDasharray="3 2" />
      {/* Weight badge */}
      <rect x="12" y="36" width="26" height="18" rx="4" fill="#F43F5E" stroke="#1E293B" strokeWidth="1.5" />
      <text x="25" y="49" textAnchor="middle" fontSize="9" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">
        180g
      </text>
      {/* Same price! */}
      <text x="25" y="68" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1E293B" fontFamily="sans-serif">
        ₹60
      </text>
      <text x="25" y="104" textAnchor="middle" fontSize="8" fontWeight="900" fill="#DC2626" fontFamily="sans-serif">
        NOW (-28%)
      </text>
    </g>

    {/* Dotted Arrow connecting before -> after */}
    <g transform="translate(112, 75)">
      <path d="M5 10C22 0 28 15 42 8" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M36 4L43 8L39 15" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Stealth alert pill */}
    <g transform="translate(90, 135)">
      <rect x="0" y="0" width="100" height="22" rx="11" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
      <text x="50" y="14" textAnchor="middle" fontSize="8" fontWeight="900" fill="#7C3AED" fontFamily="sans-serif">
        SAME ₹60 PRICE!
      </text>
    </g>

    {/* Sparkle doodles */}
    <path d="M230 40C230 43 231 45 234 46C231 47 230 49 230 52C230 49 229 47 226 46C229 45 230 43 230 40Z" fill="#8B5CF6" />
    <path d="M35 130C35 133 36 135 39 136C36 137 35 139 35 142C35 139 34 137 31 136C34 135 35 133 35 130Z" fill="#8B5CF6" />
  </svg>
);

// ==========================================
// HERO DOODLE ILLUSTRATION
// (Warm, friendly community / family inspecting package with magnifying glass)
// ==========================================

export const HeroDoodleIllustration: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg mx-auto' }) => (
  <svg
    viewBox="0 0 520 420"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft organic pastel background blobs */}
    <path
      d="M110 90C190 20 380 40 440 120C500 200 480 320 390 370C300 420 160 410 90 340C20 270 30 160 110 90Z"
      fill="#FEF3C7"
      opacity="0.5"
    />
    <circle cx="410" cy="90" r="45" fill="#E0F2FE" opacity="0.6" />
    <circle cx="80" cy="310" r="50" fill="#FCE7F3" opacity="0.6" />

    {/* Floating playful doodles around hero */}
    <g transform="translate(420, 60)">
      <path d="M0 10C10 0 20 20 30 10C40 0 50 20 60 10" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
    </g>
    <g transform="translate(60, 110)">
      <path d="M0 20C15 5 25 35 40 20" stroke="#EC4899" strokeWidth="3.5" strokeLinecap="round" />
    </g>
    <g transform="translate(430, 260)">
      <path d="M12 2C12 8 14 11 20 12C14 13 12 16 12 22C12 16 10 13 4 12C10 11 12 8 12 2Z" fill="#FBBF24" />
    </g>
    <g transform="translate(50, 220)">
      <path d="M10 2C10 7 12 9 17 10C12 11 10 13 10 18C10 13 8 11 3 10C8 9 10 7 10 2Z" fill="#10B981" />
    </g>
    <g transform="translate(380, 340)">
      <path d="M0 0C6 14 20 18 28 8C34 -2 24 -8 16 0C8 8 14 22 28 20" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Main Character Group (Friendly consumers holding magnifying glass over product) */}

    {/* Character 1 (Left - Friendly girl with glasses and warm sweater) */}
    <g transform="translate(100, 130)">
      {/* Hair back */}
      <path d="M40 50C30 30 50 10 80 15C110 20 115 45 110 70C95 100 35 90 40 50Z" fill="#334155" />
      {/* Body / Sweater */}
      <path d="M35 120C45 95 65 90 85 90C105 90 125 95 135 120L145 220C130 225 40 225 25 220L35 120Z" fill="#F97316" stroke="#1E293B" strokeWidth="3.5" />
      {/* Collar */}
      <path d="M72 90C78 100 92 100 98 90" stroke="#1E293B" strokeWidth="3" fill="#FED7AA" />
      {/* Neck */}
      <rect x="78" y="75" width="14" height="18" fill="#FED7AA" />
      {/* Head */}
      <ellipse cx="85" cy="55" rx="26" ry="30" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
      {/* Glasses */}
      <circle cx="76" cy="54" r="9" fill="none" stroke="#1E293B" strokeWidth="3" />
      <circle cx="94" cy="54" r="9" fill="none" stroke="#1E293B" strokeWidth="3" />
      <line x1="85" y1="54" x2="85" y2="54" stroke="#1E293B" strokeWidth="3" />
      {/* Eyes & Smile */}
      <circle cx="76" cy="54" r="2.5" fill="#1E293B" />
      <circle cx="94" cy="54" r="2.5" fill="#1E293B" />
      <path d="M80 68C83 72 87 72 90 68" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="68" cy="62" rx="4" ry="2.5" fill="#F43F5E" opacity="0.6" />
      <ellipse cx="102" cy="62" rx="4" ry="2.5" fill="#F43F5E" opacity="0.6" />
      {/* Hair front bangs */}
      <path d="M60 42C75 32 95 32 110 44C100 36 80 34 60 42Z" fill="#1E293B" />
    </g>

    {/* Character 2 (Right - Friendly young man leaning in) */}
    <g transform="translate(260, 110)">
      {/* Hair */}
      <path d="M40 40C45 15 75 10 95 20C115 30 115 50 110 65C100 60 50 60 40 40Z" fill="#475569" stroke="#1E293B" strokeWidth="3" />
      {/* Body / Mint Hoodie */}
      <path d="M25 140C35 110 60 105 80 105C100 105 125 110 135 140L145 240C130 245 30 245 15 240L25 140Z" fill="#34D399" stroke="#1E293B" strokeWidth="3.5" />
      {/* Hoodie strings */}
      <line x1="72" y1="112" x2="70" y2="135" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="88" y1="112" x2="90" y2="135" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Neck */}
      <rect x="73" y="90" width="14" height="18" fill="#FDE68A" />
      {/* Head */}
      <ellipse cx="80" cy="70" rx="25" ry="28" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />
      {/* Eyes & Smile */}
      <circle cx="72" cy="68" r="2.5" fill="#1E293B" />
      <circle cx="88" cy="68" r="2.5" fill="#1E293B" />
      <path d="M75 80C80 84 85 84 90 80" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Cheerful blush */}
      <ellipse cx="65" cy="74" rx="4" ry="2.5" fill="#F43F5E" opacity="0.6" />
      <ellipse cx="95" cy="74" rx="4" ry="2.5" fill="#F43F5E" opacity="0.6" />
    </g>

    {/* Package In The Middle Being Scanned */}
    <g transform="translate(205, 185)">
      {/* Food Package / Cereal Box */}
      <rect x="0" y="0" width="105" height="145" rx="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="4" />
      {/* Top box fold */}
      <path d="M0 25L105 25" stroke="#1E293B" strokeWidth="3" />
      {/* Brand strip */}
      <rect x="10" y="8" width="85" height="10" rx="3" fill="#FBBF24" />
      {/* Front marketing slogan */}
      <text x="52" y="48" textAnchor="middle" fontSize="11" fontWeight="900" fill="#1E293B" fontFamily="sans-serif">
        100% PURE*
      </text>
      <text x="52" y="60" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#F97316" fontFamily="sans-serif">
        WHOLE GRAIN
      </text>

      {/* Mini Barcode */}
      <g transform="translate(16, 72)">
        {[0, 4, 7, 12, 16, 22, 25, 29, 35, 40, 44, 48].map((x, i) => (
          <line key={i} x1={x} y1="0" x2={x} y2="18" stroke="#1E293B" strokeWidth={i % 3 === 0 ? 3 : 1.5} />
        ))}
      </g>

      {/* Red flag sticker on the box */}
      <g transform="translate(58, 98)">
        <rect x="0" y="0" width="38" height="34" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
        <text x="19" y="14" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#EF4444" fontFamily="sans-serif">
          TRUTH:
        </text>
        <text x="19" y="24" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#DC2626" fontFamily="sans-serif">
          80% MAIDA
        </text>
      </g>
    </g>

    {/* Large Hand-Drawn Magnifying Glass with Laser Scanner Glow */}
    <g transform="translate(160, 160)">
      {/* Glass outer ring */}
      <circle cx="70" cy="70" r="54" fill="#E0F2FE" fillOpacity="0.4" stroke="#1E293B" strokeWidth="5" />
      {/* Scan beam across glass */}
      <line x1="26" y1="70" x2="114" y2="70" stroke="#F43F5E" strokeWidth="3" strokeDasharray="5 3" />
      <circle cx="70" cy="70" r="6" fill="#F43F5E" />
      {/* Handle */}
      <path d="M32 108L5 135C1 139 1 145 5 149C9 153 15 153 19 149L46 122" fill="#D97706" stroke="#1E293B" strokeWidth="4.5" strokeLinejoin="round" />
      {/* Glass shine */}
      <path d="M40 45C55 32 75 32 95 40" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    </g>

    {/* Floating "Satya" Truth Badge */}
    <g transform="translate(370, 180)">
      <rect x="0" y="0" width="115" height="55" rx="14" fill="#1E293B" stroke="#FBBF24" strokeWidth="2.5" />
      <circle cx="24" cy="28" r="10" fill="#FBBF24" />
      <text x="24" y="32" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1E293B" fontFamily="sans-serif">✓</text>
      <text x="42" y="22" fontSize="9" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">TRUTH VERIFIED</text>
      <text x="42" y="36" fontSize="8" fontWeight="bold" fill="#FBBF24" fontFamily="sans-serif">In 1.8 seconds</text>
    </g>
  </svg>
);

// ==========================================
// BANNER DOODLE ILLUSTRATION
// (Playful relaxed character enjoying healthy snack with doodle sparkles)
// ==========================================

export const BannerDoodleIllustration: React.FC<{ className?: string }> = ({ className = 'w-64 h-56' }) => (
  <svg
    viewBox="0 0 300 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Floating stars & confetti */}
    <g transform="translate(30, 20)">
      <path d="M10 2C10 7 12 9 17 10C12 11 10 13 10 18C10 13 8 11 3 10C8 9 10 7 10 2Z" fill="#FBBF24" />
    </g>
    <g transform="translate(240, 30)">
      <path d="M12 2C12 8 14 11 20 12C14 13 12 16 12 22C12 16 10 13 4 12C10 11 12 8 12 2Z" fill="#34D399" />
    </g>
    <g transform="translate(260, 140)">
      <path d="M0 10C10 0 20 20 30 10" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Relaxed Happy Character (stretching with phone/scanner) */}
    <g transform="translate(80, 50)">
      {/* Body / soft pastel yellow lounge shirt */}
      <path
        d="M40 70C20 85 10 130 20 150L130 150C140 130 130 85 110 70Z"
        fill="#FDE68A"
        stroke="#FFFFFF"
        strokeWidth="3.5"
      />
      {/* Striped pants */}
      <path d="M25 150L20 200L55 200L65 150Z" fill="#93C5FD" stroke="#FFFFFF" strokeWidth="3" />
      <path d="M85 150L95 200L130 200L125 150Z" fill="#93C5FD" stroke="#FFFFFF" strokeWidth="3" />
      {/* Neck */}
      <rect x="70" y="55" width="12" height="18" fill="#FED7AA" />
      {/* Head with joyful smile */}
      <circle cx="76" cy="40" r="24" fill="#FED7AA" stroke="#FFFFFF" strokeWidth="3" />
      {/* Curly Hair doodle */}
      <path
        d="M54 36C50 20 62 12 76 12C90 12 102 20 98 36C94 30 84 26 76 26C68 26 58 30 54 36Z"
        fill="#1E293B"
      />
      {/* Closed happy curved eyes */}
      <path d="M68 38C70 42 74 42 76 38" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M82 38C84 42 88 42 90 38" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Big smile */}
      <path d="M72 48C76 54 82 54 86 48" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Cheerful blush */}
      <circle cx="64" cy="44" r="3.5" fill="#F43F5E" opacity="0.7" />
      <circle cx="94" cy="44" r="3.5" fill="#F43F5E" opacity="0.7" />

      {/* Arm holding phone with green checkmark */}
      <g transform="translate(115, 60) rotate(15)">
        <path d="M0 25C15 20 30 35 45 30" stroke="#FED7AA" strokeWidth="12" strokeLinecap="round" />
        <rect x="42" y="10" width="22" height="38" rx="5" fill="#1E293B" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="53" cy="26" r="6" fill="#34D399" />
        <text x="53" y="30" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FFFFFF">✓</text>
      </g>
    </g>
  </svg>
);

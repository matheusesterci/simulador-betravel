import React from 'react';

interface BeTravelLogoProps {
  className?: string;
  variant?: 'blue' | 'white';
}

export const BeTravelLogo: React.FC<BeTravelLogoProps> = ({
  className = 'h-14',
  variant = 'blue',
}) => {
  const brandBlue = variant === 'white' ? '#FFFFFF' : '#47558A';
  const oceanBg = variant === 'white' ? '#47558A' : '#FFFFFF';

  return (
    <div className={`flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 520 230"
        className="h-full w-auto max-w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ======================================================== */}
        {/* 1. GLOBE WITH LATITUDE & LONGITUDE GRID LINES + AIRPLANE */}
        {/* ======================================================== */}
        <g id="globe-group">
          {/* Base Globe Circle */}
          <circle
            cx="102"
            cy="114"
            r="66"
            fill={oceanBg}
            stroke={brandBlue}
            strokeWidth="3.6"
          />

          {/* Grid: Vertical Central Meridian */}
          <line
            x1="102"
            y1="48"
            x2="102"
            y2="180"
            stroke={brandBlue}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Grid: Elliptical Meridians (Curved Longitude Lines) */}
          <ellipse
            cx="102"
            cy="114"
            rx="38"
            ry="66"
            stroke={brandBlue}
            strokeWidth="2.8"
            fill="none"
          />
          <ellipse
            cx="102"
            cy="114"
            rx="18"
            ry="66"
            stroke={brandBlue}
            strokeWidth="2.4"
            fill="none"
          />

          {/* Grid: Equator (Horizontal Line) */}
          <line
            x1="36"
            y1="114"
            x2="168"
            y2="114"
            stroke={brandBlue}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Grid: Upper Latitude (Parallel) */}
          <path
            d="M 50 82 C 68 93 136 93 154 82"
            stroke={brandBlue}
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Grid: Lower Latitude (Parallel) */}
          <path
            d="M 50 146 C 68 135 136 135 154 146"
            stroke={brandBlue}
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Orbit Ring wrapping around the Globe */}
          {/* Upper / Left segment */}
          <path
            d="M 36 142 C 20 96 48 44 98 34 C 146 24 186 60 184 108 C 182 144 156 178 120 186"
            stroke={brandBlue}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Lower segment towards plane */}
          <path
            d="M 48 162 C 62 178 80 186 104 188"
            stroke={brandBlue}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Airplane on Orbit (Bottom-Right, Angled Clockwise ~38 deg) */}
          <g transform="translate(136, 172) rotate(-38)" fill={brandBlue}>
            {/* Fuselage, Wings, Tailfin */}
            <path d="M 0 -20 L 8 -6 L 24 -1 L 24 4 L 8 2 L 6 15 L 12 21 L 12 25 L 2 23 L -2 23 L -12 25 L -12 21 L -6 15 L -8 2 L -24 4 L -24 -1 L -8 -6 Z" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* 2. "BE" (VARSITY / ATHLETIC BOLD CHAMFERED BLOCK)        */}
        {/* ======================================================== */}
        <g id="letters-be" fill={brandBlue}>
          {/* LETTER B */}
          <path
            d="M 214 38
               H 292
               L 318 64
               V 92
               L 306 103
               L 318 114
               V 142
               L 292 168
               H 214
               V 38
               Z
               M 242 62
               V 90
               H 274
               L 288 76
               V 72
               L 274 62
               H 242
               Z
               M 242 116
               V 144
               H 274
               L 288 130
               V 126
               L 274 116
               H 242
               Z"
            fillRule="evenodd"
          />

          {/* LETTER E */}
          <path
            d="M 334 38
               H 412
               L 436 62
               V 70
               H 364
               V 88
               H 410
               V 114
               H 364
               V 134
               H 436
               V 142
               L 412 168
               H 334
               V 38
               Z"
          />
        </g>

        {/* ======================================================== */}
        {/* 3. "TRAVEL" (SQUARE TECHNO GEOMETRIC ALL-CAPS)           */}
        {/* ======================================================== */}
        <g id="letters-travel" fill={brandBlue}>
          {/* T */}
          <path d="M 214 182 H 244 V 194 H 234 V 222 H 224 V 194 H 214 V 182 Z" />

          {/* R */}
          <path
            d="M 252 182
               H 274
               L 282 190
               V 199
               L 274 207
               H 263
               V 222
               H 252
               V 182
               Z
               M 263 192
               V 198
               H 271
               L 274 195
               L 271 192
               H 263
               Z"
          />
          <path d="M 271 204 L 283 222 H 272 L 261 206 H 271 Z" />

          {/* A */}
          <path
            d="M 300 182
               H 310
               L 320 222
               H 310
               L 308 214
               H 302
               L 300 222
               H 290
               L 300 182
               Z
               M 304 204
               H 306
               L 305 194
               Z"
          />

          {/* V */}
          <path
            d="M 328 182
               H 338
               L 343 211
               L 348 182
               H 358
               L 349 222
               H 337
               L 328 182
               Z"
          />

          {/* E */}
          <path
            d="M 366 182
               H 396
               V 192
               H 377
               V 197
               H 392
               V 207
               H 377
               V 212
               H 396
               V 222
               H 366
               V 182
               Z"
          />

          {/* L */}
          <path
            d="M 404 182
               H 415
               V 212
               H 436
               V 222
               H 404
               V 182
               Z"
          />
        </g>
      </svg>
    </div>
  );
};

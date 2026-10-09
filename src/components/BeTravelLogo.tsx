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
        {/* 1. GLOBE WITH CONTINENTS, ORBIT & AIRPLANE               */}
        {/* ======================================================== */}
        <g id="globe-group">
          {/* Globe Boundary (White Ocean Base with Blue Ring) */}
          <circle
            cx="102"
            cy="114"
            r="67"
            fill={oceanBg}
            stroke={brandBlue}
            strokeWidth="3.6"
          />

          {/* Continents (Filled with Brand Blue #47558A) */}
          <g fill={brandBlue}>
            {/* North America (Top-Left) */}
            <path d="M 48 64 C 54 50 68 44 82 42 C 92 42 98 48 94 56 C 89 66 76 72 68 82 C 60 88 46 80 48 64 Z" />
            <path d="M 78 40 C 82 34 94 36 96 42 C 94 46 86 46 80 44 Z" />

            {/* South America (Bottom-Left) */}
            <path d="M 58 100 C 66 94 78 100 76 114 C 73 130 62 152 52 154 C 47 154 48 140 51 126 C 54 114 52 106 58 100 Z" />

            {/* Europe / Eurasia (Top-Right) */}
            <path d="M 104 38 C 116 32 138 34 152 46 C 160 56 166 70 162 82 C 154 78 148 76 140 80 C 130 86 128 96 118 94 C 110 92 108 80 106 66 C 104 52 98 44 104 38 Z" />

            {/* Africa (Center-Right to Bottom-Right) */}
            <path d="M 98 84 C 108 80 124 88 126 102 C 128 118 120 136 110 148 C 104 154 96 144 98 130 C 101 118 94 110 96 98 C 97 92 97 86 98 84 Z" />
          </g>

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
          {/* Starts at X=214, Width=104, Height=130 (Y: 38 to 168) */}
          {/* Chamfers: top-right and bottom-right 26px cut, center waist notch */}
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
          {/* Starts at X=334, Width=102, Height=130 (Y: 38 to 168) */}
          {/* Chamfers: top-right and bottom-right 26px cut, shorter middle bar */}
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
        {/* Y: 182 to 222 (Height = 40px), Span from X=214 to X=436   */}
        <g id="letters-travel" fill={brandBlue}>
          {/* T (X=214 to 244) */}
          <path d="M 214 182 H 244 V 194 H 234 V 222 H 224 V 194 H 214 V 182 Z" />

          {/* R (X=252 to 282) */}
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
          {/* R right diagonal leg */}
          <path d="M 271 204 L 283 222 H 272 L 261 206 H 271 Z" />

          {/* A (X=290 to 320) */}
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

          {/* V (X=328 to 358) */}
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

          {/* E (X=366 to 396) */}
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

          {/* L (X=404 to 436) */}
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

import React, { useState } from 'react';

interface BeTravelLogoProps {
  className?: string;
  variant?: 'blue' | 'white';
}

export const BeTravelLogo: React.FC<BeTravelLogoProps> = ({
  className = 'h-14',
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  // Try loading real official image file from public folder first
  if (!imageFailed) {
    return (
      <div className={`flex items-center select-none ${className}`}>
        <img
          src="./logo.png"
          alt="BE TRAVEL"
          className="h-full w-auto max-w-[240px] object-contain"
          onError={() => {
            // If logo.png not found, try be-travel.png
            const imgEl = document.querySelector('img[alt="BE TRAVEL"]') as HTMLImageElement;
            if (imgEl && !imgEl.src.includes('be-travel.png')) {
              imgEl.src = './be-travel.png';
            } else {
              setImageFailed(true);
            }
          }}
        />
      </div>
    );
  }

  // High-fidelity vector fallback based on official brand manual
  const brandBlue = '#4F5D8E';

  return (
    <div className={`flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 520 230"
        className="h-full w-auto max-w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ======================================================== */}
        {/* GLOBE WITH CONTINENTS, ORBIT & AIRPLANE (OFFICIAL RATIO) */}
        {/* ======================================================== */}
        <g id="globe">
          {/* Base Globe Circle (White with blue stroke) */}
          <circle cx="100" cy="114" r="66" fill="#FFFFFF" stroke={brandBlue} strokeWidth="3.5" />

          {/* Continents in Brand Blue */}
          <g fill={brandBlue}>
            {/* North America */}
            <path d="M 44 68 C 48 54 62 44 80 44 C 94 44 102 52 98 62 C 92 72 78 78 70 88 C 62 94 46 84 44 68 Z" />
            <path d="M 76 42 C 80 36 90 38 92 44 C 90 48 82 48 76 44 Z" />

            {/* South America */}
            <path d="M 54 104 C 64 96 76 102 74 116 C 70 132 58 152 48 154 C 44 154 44 142 48 128 C 52 116 48 110 54 104 Z" />

            {/* Europe / Eurasia */}
            <path d="M 102 40 C 114 34 136 36 150 48 C 158 58 164 72 160 84 C 152 80 146 78 138 82 C 128 88 126 98 116 96 C 108 94 106 82 104 68 C 102 54 96 46 102 40 Z" />

            {/* Africa */}
            <path d="M 96 86 C 106 82 122 90 124 104 C 126 120 118 138 108 150 C 102 156 94 146 96 132 C 99 120 92 112 94 100 C 95 94 95 88 96 86 Z" />
          </g>

          {/* Orbit swoop line around globe */}
          <path
            d="M 34 144 C 18 98 46 46 96 36 C 144 26 184 62 182 110 C 180 146 154 180 118 188"
            stroke={brandBlue}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Airplane on orbit */}
          <g transform="translate(138, 172) rotate(-35)" fill={brandBlue}>
            <path d="M 0 -18 L 7 -6 L 22 -1 L 22 3 L 7 1 L 5 14 L 11 19 L 11 23 L 2 21 L -2 21 L -11 23 L -11 19 L -5 14 L -7 1 L -22 3 L -22 -1 L -7 -6 Z" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* "BE" ATHLETIC BLOCK TYPOGRAPHY                           */}
        {/* ======================================================== */}
        <g id="be-text" fill={brandBlue}>
          {/* B */}
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

          {/* E */}
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
        {/* "TRAVEL" DIRECTLY UNDER "BE"                             */}
        {/* ======================================================== */}
        <g id="travel-text" fill={brandBlue}>
          <path d="M 214 182 H 244 V 194 H 234 V 222 H 224 V 194 H 214 V 182 Z" />
          <path d="M 252 182 H 274 L 282 190 V 199 L 274 207 H 263 V 222 H 252 V 182 Z M 263 192 V 198 H 271 L 274 195 L 271 192 H 263 Z" />
          <path d="M 271 204 L 283 222 H 272 L 261 206 H 271 Z" />
          <path d="M 300 182 H 310 L 320 222 H 310 L 308 214 H 302 L 300 222 H 290 L 300 182 Z M 304 204 H 306 L 305 194 Z" />
          <path d="M 328 182 H 338 L 343 211 L 348 182 H 358 L 349 222 H 337 L 328 182 Z" />
          <path d="M 366 182 H 396 V 192 H 377 V 197 H 392 V 207 H 377 V 212 H 396 V 222 H 366 V 182 Z" />
          <path d="M 404 182 H 415 V 212 H 436 V 222 H 404 V 182 Z" />
        </g>
      </svg>
    </div>
  );
};

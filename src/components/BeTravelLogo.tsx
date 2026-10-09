import React, { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';

interface BeTravelLogoProps {
  className?: string;
  variant?: 'blue' | 'white';
  clickable?: boolean;
}

const STORAGE_KEY_LOGO = 'betravel_official_logo_v3';

// Potential paths where the user might have uploaded the file on GitHub/Vercel
const CANDIDATE_PATHS = [
  './logo.png',
  '/logo.png',
  './be travel.png',
  '/be travel.png',
  './be-travel.png',
  '/be-travel.png',
  './be%20travel.png',
  '/be%20travel.png',
  './logo.PNG',
  '/logo.PNG',
];

export const BeTravelLogo: React.FC<BeTravelLogoProps> = ({
  className = 'h-14',
  variant = 'blue',
  clickable = true,
}) => {
  const [activeLogoSrc, setActiveLogoSrc] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_LOGO) || null;
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Probe server paths in background without breaking UI
  useEffect(() => {
    if (activeLogoSrc && activeLogoSrc.startsWith('data:')) {
      return; // Already have user's uploaded official image in memory
    }

    let isCancelled = false;

    const testPath = (path: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(path);
        img.onerror = () => reject();
        img.src = path;
      });
    };

    const findWorkingPath = async () => {
      for (const path of CANDIDATE_PATHS) {
        try {
          const valid = await testPath(path);
          if (!isCancelled) {
            setActiveLogoSrc(valid);
            return;
          }
        } catch {
          // continue checking next path
        }
      }
    };

    findWorkingPath();

    const handleStorageChange = () => {
      const saved = localStorage.getItem(STORAGE_KEY_LOGO);
      if (saved) setActiveLogoSrc(saved);
    };

    window.addEventListener('logo-updated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      isCancelled = true;
      window.removeEventListener('logo-updated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [activeLogoSrc]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        localStorage.setItem(STORAGE_KEY_LOGO, dataUrl);
        setActiveLogoSrc(dataUrl);
        window.dispatchEvent(new Event('logo-updated'));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogoClick = () => {
    if (clickable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // If real official image exists (either loaded from server or selected by user), render it!
  if (activeLogoSrc) {
    return (
      <div
        onClick={handleLogoClick}
        className={`flex items-center select-none group relative ${className} ${
          clickable ? 'cursor-pointer' : ''
        }`}
        title={clickable ? 'Clique para substituir por outro arquivo da logo' : 'BE TRAVEL'}
      >
        <img
          src={activeLogoSrc}
          alt="BE TRAVEL"
          className="h-full w-auto max-w-[240px] object-contain transition-transform group-hover:scale-[1.02]"
        />
        {clickable && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        )}
      </div>
    );
  }

  // Fallback: Elegant SVG with 1-click file selector on click so the user can easily load their exact be travel.png
  const brandBlue = variant === 'white' ? '#FFFFFF' : '#4F5D8E';

  return (
    <div
      onClick={handleLogoClick}
      className={`flex items-center select-none group relative ${className} ${
        clickable ? 'cursor-pointer' : ''
      }`}
      title={clickable ? 'Clique aqui para carregar seu arquivo "be travel.png" oficial' : 'BE TRAVEL'}
    >
      <svg
        viewBox="0 0 520 230"
        className="h-full w-auto max-w-full transition-transform group-hover:scale-[1.02]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Globe with Continents, Orbit & Plane */}
        <g id="globe">
          <circle cx="100" cy="114" r="66" fill="#FFFFFF" stroke={brandBlue} strokeWidth="3.6" />
          <g fill={brandBlue}>
            {/* North America */}
            <path d="M 44 68 C 48 54 62 44 80 44 C 94 44 102 52 98 62 C 92 72 78 78 70 88 C 62 94 46 84 44 68 Z" />
            <path d="M 76 42 C 80 36 90 38 92 44 C 90 48 82 48 76 44 Z" />
            {/* South America */}
            <path d="M 54 104 C 64 96 76 102 74 116 C 70 132 58 152 48 154 C 44 154 44 142 48 128 C 52 116 48 110 54 104 Z" />
            {/* Europe */}
            <path d="M 102 40 C 114 34 136 36 150 48 C 158 58 164 72 160 84 C 152 80 146 78 138 82 C 128 88 126 98 116 96 C 108 94 106 82 104 68 C 102 54 96 46 102 40 Z" />
            {/* Africa */}
            <path d="M 96 86 C 106 82 122 90 124 104 C 126 120 118 138 108 150 C 102 156 94 146 96 132 C 99 120 92 112 94 100 C 95 94 95 88 96 86 Z" />
          </g>
          <path
            d="M 34 144 C 18 98 46 46 96 36 C 144 26 184 62 182 110 C 180 146 154 180 118 188"
            stroke={brandBlue}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          <g transform="translate(138, 172) rotate(-35)" fill={brandBlue}>
            <path d="M 0 -18 L 7 -6 L 22 -1 L 22 3 L 7 1 L 5 14 L 11 19 L 11 23 L 2 21 L -2 21 L -11 23 L -11 19 L -5 14 L -7 1 L -22 3 L -22 -1 L -7 -6 Z" />
          </g>
        </g>

        {/* BE Block Typography */}
        <g id="be-text" fill={brandBlue}>
          <path
            d="M 214 38 H 292 L 318 64 V 92 L 306 103 L 318 114 V 142 L 292 168 H 214 V 38 Z M 242 62 V 90 H 274 L 288 76 V 72 L 274 62 H 242 Z M 242 116 V 144 H 274 L 288 130 V 126 L 274 116 H 242 Z"
            fillRule="evenodd"
          />
          <path d="M 334 38 H 412 L 436 62 V 70 H 364 V 88 H 410 V 114 H 364 V 134 H 436 V 142 L 412 168 H 334 V 38 Z" />
        </g>

        {/* TRAVEL Underneath */}
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

      {clickable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      )}
    </div>
  );
};

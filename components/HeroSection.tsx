export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-pale via-ivory to-pink-soft" />
      
      {/* Wedding Illustration Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Wedding Rings - Center */}
          <g transform="translate(600, 350)" opacity="0.5">
            {/* Outer Ring */}
            <circle
              cx="0"
              cy="0"
              r="120"
              fill="none"
              stroke="#D4A5A5"
              strokeWidth="6"
            />
            {/* Middle Ring */}
            <circle
              cx="0"
              cy="0"
              r="90"
              fill="none"
              stroke="#D4A5A5"
              strokeWidth="5"
            />
            {/* Inner Ring */}
            <circle
              cx="0"
              cy="0"
              r="60"
              fill="none"
              stroke="#D4A5A5"
              strokeWidth="4"
            />
            {/* Center Gem */}
            <circle
              cx="0"
              cy="0"
              r="10"
              fill="#D4A5A5"
            />
          </g>

          {/* Wedding Bouquet - Left */}
          <g transform="translate(200, 500)" opacity="0.45">
            {/* Stem */}
            <rect x="-4" y="0" width="8" height="80" fill="#D4A5A5" rx="4" />
            {/* Flowers */}
            <circle cx="0" cy="0" r="25" fill="#D4A5A5" />
            <circle cx="-20" cy="-10" r="18" fill="#D4A5A5" />
            <circle cx="20" cy="-10" r="18" fill="#D4A5A5" />
            <circle cx="0" cy="-25" r="15" fill="#D4A5A5" />
            <circle cx="-15" cy="-20" r="12" fill="#D4A5A5" />
            <circle cx="15" cy="-20" r="12" fill="#D4A5A5" />
          </g>

          {/* Wedding Cake - Right */}
          <g transform="translate(1000, 450)" opacity="0.45">
            {/* Bottom Layer */}
            <rect x="-60" y="0" width="120" height="40" fill="#D4A5A5" rx="5" />
            {/* Middle Layer */}
            <rect x="-45" y="-50" width="90" height="35" fill="#D4A5A5" rx="5" />
            {/* Top Layer */}
            <rect x="-30" y="-90" width="60" height="30" fill="#D4A5A5" rx="5" />
            {/* Decorative Hearts */}
            <path
              d="M-20,10 C-20,5 -15,0 -10,0 C-5,0 0,5 0,10 C0,15 -5,20 -10,20 C-15,20 -20,15 -20,10 Z"
              fill="#D4A5A5"
              opacity="0.8"
            />
            <path
              d="M20,10 C20,5 25,0 30,0 C35,0 40,5 40,10 C40,15 35,20 30,20 C25,20 20,15 20,10 Z"
              fill="#D4A5A5"
              opacity="0.8"
            />
          </g>

          {/* Hearts - Scattered */}
          <g transform="translate(150, 200)" opacity="0.5">
            <path
              d="M0,0 C0,-25 -25,-35 -35,-25 C-35,-15 -25,0 0,25 C25,0 35,-15 35,-25 C35,-35 15,-25 0,0 Z"
              fill="#D4A5A5"
            />
          </g>
          <g transform="translate(1050, 180)" opacity="0.5">
            <path
              d="M0,0 C0,-25 -25,-35 -35,-25 C-35,-15 -25,0 0,25 C25,0 35,-15 35,-25 C35,-35 15,-25 0,0 Z"
              fill="#D4A5A5"
            />
          </g>
          <g transform="translate(300, 150)" opacity="0.4">
            <path
              d="M0,0 C0,-18 -18,-25 -25,-18 C-25,-10 -18,0 0,18 C18,0 25,-10 25,-18 C25,-25 10,-18 0,0 Z"
              fill="#D4A5A5"
            />
          </g>
          <g transform="translate(900, 250)" opacity="0.4">
            <path
              d="M0,0 C0,-18 -18,-25 -25,-18 C-25,-10 -18,0 0,18 C18,0 25,-10 25,-18 C25,-25 10,-18 0,0 Z"
              fill="#D4A5A5"
            />
          </g>

          {/* Decorative Swirls */}
          <path
            d="M100,100 Q300,200 500,100 T900,100"
            fill="none"
            stroke="#D4A5A5"
            strokeWidth="4"
            opacity="0.3"
          />
          <path
            d="M100,700 Q300,600 500,700 T900,700"
            fill="none"
            stroke="#D4A5A5"
            strokeWidth="4"
            opacity="0.3"
          />

          {/* Floral Accents */}
          <g transform="translate(80, 400)" opacity="0.4">
            <circle cx="0" cy="0" r="12" fill="#D4A5A5" />
            <circle cx="20" cy="-8" r="10" fill="#D4A5A5" />
            <circle cx="-20" cy="-8" r="10" fill="#D4A5A5" />
            <circle cx="0" cy="-18" r="8" fill="#D4A5A5" />
          </g>
          <g transform="translate(1120, 300)" opacity="0.4">
            <circle cx="0" cy="0" r="12" fill="#D4A5A5" />
            <circle cx="20" cy="-8" r="10" fill="#D4A5A5" />
            <circle cx="-20" cy="-8" r="10" fill="#D4A5A5" />
            <circle cx="0" cy="-18" r="8" fill="#D4A5A5" />
          </g>
        </svg>
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/60 via-ivory/40 to-ivory/60" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
        <div className="space-y-6 md:space-y-8">
          {/* Main Title - 손이가 웨딩 (가장 강조) */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-pink-dusty drop-shadow-lg">
            손이가 웨딩
          </h1>
          
          {/* Subtitle */}
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 leading-tight">
              손쉬운 결혼준비
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-gray-700 leading-relaxed">
              자꾸 손이 가는 웨딩 비교견적 플랫폼
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

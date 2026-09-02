import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Orbit, 
  Flame, 
  Sun, 
  Radio, 
  ChevronRight,
  Shield,
  Zap,
  Lock,
  Hexagon
} from 'lucide-react';

export type LogoArchetype = 'gold' | 'emerald' | 'saturn' | 'crimson' | 'sunset' | 'hologram';

export interface LogoStyleConfig {
  id: LogoArchetype;
  name: string;
  badge: string;
  primaryColor: string;
  secondaryColor: string;
  accentGlow: string;
  ringClass: string;
  bgGradient: string;
}

export const LOGO_STYLES: LogoStyleConfig[] = [
  {
    id: 'gold',
    name: 'Imperial Gold Apex',
    badge: 'STYLE 1: GOLD ARMOR',
    primaryColor: '#D4AF37',
    secondaryColor: '#CCFF00',
    accentGlow: 'rgba(212, 175, 55, 0.45)',
    ringClass: 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)]',
    bgGradient: 'from-[#FFF4D0] via-[#E5C158] to-[#AA7C11]',
  },
  {
    id: 'emerald',
    name: 'Matrix Jade Core',
    badge: 'STYLE 2: JADE MATRIX',
    primaryColor: '#00E676',
    secondaryColor: '#10B981',
    accentGlow: 'rgba(0, 230, 118, 0.45)',
    ringClass: 'border-[#00E676] shadow-[0_0_20px_rgba(0,230,118,0.5)]',
    bgGradient: 'from-[#A7F3D0] via-[#10B981] to-[#047857]',
  },
  {
    id: 'saturn',
    name: 'Cosmic Saturn Orbit',
    badge: 'STYLE 3: SATURN ORBIT',
    primaryColor: '#C084FC',
    secondaryColor: '#A855F7',
    accentGlow: 'rgba(168, 85, 247, 0.45)',
    ringClass: 'border-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.5)]',
    bgGradient: 'from-[#F3E8FF] via-[#C084FC] to-[#7E22CE]',
  },
  {
    id: 'crimson',
    name: 'Crimson Laser Fire',
    badge: 'STYLE 4: LASER FIRE',
    primaryColor: '#FF453A',
    secondaryColor: '#DC2626',
    accentGlow: 'rgba(239, 68, 68, 0.5)',
    ringClass: 'border-[#EF4444] shadow-[0_0_20px_rgba(239,68,68,0.5)]',
    bgGradient: 'from-[#FECACA] via-[#EF4444] to-[#991B1B]',
  },
  {
    id: 'sunset',
    name: 'Sunset Starburst Flare',
    badge: 'STYLE 5: SUNSET FLARE',
    primaryColor: '#FB923C',
    secondaryColor: '#F97316',
    accentGlow: 'rgba(249, 115, 22, 0.5)',
    ringClass: 'border-[#F97316] shadow-[0_0_20px_rgba(249,115,22,0.5)]',
    bgGradient: 'from-[#FFEDD5] via-[#FB923C] to-[#C2410C]',
  },
  {
    id: 'hologram',
    name: 'Holographic Radial 5D',
    badge: 'STYLE 6: HOLOGRAM 5D',
    primaryColor: '#38BDF8',
    secondaryColor: '#EC4899',
    accentGlow: 'rgba(56, 189, 248, 0.5)',
    ringClass: 'border-[#38BDF8] shadow-[0_0_25px_rgba(236,72,153,0.5)]',
    bgGradient: 'from-[#38BDF8] via-[#EC4899] to-[#EAB308]',
  }
];

interface AngkorLogoProps {
  size?: number | string;
  className?: string;
  showText?: boolean;
  activeStyle?: LogoArchetype;
  onStyleChange?: (style: LogoArchetype) => void;
  showStyleSelector?: boolean;
  subtext?: string;
}

export const AngkorLogo: React.FC<AngkorLogoProps> = ({
  size = 54,
  className = '',
  showText = false,
  activeStyle,
  onStyleChange,
  showStyleSelector = true,
  subtext = 'FORTRESS ARMOR 5D'
}) => {
  const [internalStyle, setInternalStyle] = useState<LogoArchetype>('gold');
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentStyleId = activeStyle || internalStyle;
  const currentConfig = LOGO_STYLES.find(s => s.id === currentStyleId) || LOGO_STYLES[0];

  const handleSelectStyle = (styleId: LogoArchetype) => {
    setInternalStyle(styleId);
    if (onStyleChange) {
      onStyleChange(styleId);
    }
  };

  const handleNextStyle = () => {
    const currentIndex = LOGO_STYLES.findIndex(s => s.id === currentStyleId);
    const nextIndex = (currentIndex + 1) % LOGO_STYLES.length;
    handleSelectStyle(LOGO_STYLES[nextIndex].id);
  };

  // Auto cycle effect if toggled
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      handleNextStyle();
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoCycling, currentStyleId]);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 select-none group/logo ${className}`}
    >
      <div className="flex items-center gap-3.5">
        {/* Interactive Logo Crest Container with click-to-cycle */}
        <button
          type="button"
          onClick={handleNextStyle}
          title="Click to cycle next logo style (6 Styles Available)"
          className="relative flex items-center justify-center shrink-0 group cursor-pointer transition-all duration-300 active:scale-95 focus:outline-none"
          style={{ width: size, height: size }}
        >
          {/* Ambient Glow Aura */}
          <div 
            className="absolute inset-[-6px] rounded-2xl blur-lg transition-all duration-500 pointer-events-none opacity-80 group-hover:opacity-100"
            style={{ 
              background: `radial-gradient(circle, ${currentConfig.accentGlow} 0%, rgba(0,0,0,0) 75%)` 
            }}
          />

          {/* Dynamic Orbit Ring for Saturn/Hologram Archetypes */}
          {(currentStyleId === 'saturn' || currentStyleId === 'hologram') && (
            <div className="absolute inset-[-4px] rounded-full border border-purple-400/40 animate-spin pointer-events-none" style={{ animationDuration: '8s' }} />
          )}

          {/* Futuristic 5D Quantum Hexagonal Cyber Shield SVG */}
          <svg
            viewBox="0 0 400 400"
            width="100%"
            height="100%"
            className="w-full h-full relative z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] transition-all duration-500"
          >
            <defs>
              {/* Dynamic Gradient 1 */}
              <linearGradient id={`gradMain-${currentStyleId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                {currentStyleId === 'gold' && (
                  <>
                    <stop offset="0%" stopColor="#FBF0B9" />
                    <stop offset="25%" stopColor="#D4AF37" />
                    <stop offset="60%" stopColor="#AA7C11" />
                    <stop offset="85%" stopColor="#F5D98E" />
                    <stop offset="100%" stopColor="#875E00" />
                  </>
                )}
                {currentStyleId === 'emerald' && (
                  <>
                    <stop offset="0%" stopColor="#D1FAE5" />
                    <stop offset="25%" stopColor="#00E676" />
                    <stop offset="60%" stopColor="#10B981" />
                    <stop offset="85%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#064E3B" />
                  </>
                )}
                {currentStyleId === 'saturn' && (
                  <>
                    <stop offset="0%" stopColor="#FAF5FF" />
                    <stop offset="25%" stopColor="#C084FC" />
                    <stop offset="60%" stopColor="#A855F7" />
                    <stop offset="85%" stopColor="#E9D5FF" />
                    <stop offset="100%" stopColor="#4A0E4E" />
                  </>
                )}
                {currentStyleId === 'crimson' && (
                  <>
                    <stop offset="0%" stopColor="#FFE4E6" />
                    <stop offset="25%" stopColor="#FF453A" />
                    <stop offset="60%" stopColor="#DC2626" />
                    <stop offset="85%" stopColor="#FCA5A5" />
                    <stop offset="100%" stopColor="#7F1D1D" />
                  </>
                )}
                {currentStyleId === 'sunset' && (
                  <>
                    <stop offset="0%" stopColor="#FFF7ED" />
                    <stop offset="25%" stopColor="#FB923C" />
                    <stop offset="60%" stopColor="#EA580C" />
                    <stop offset="85%" stopColor="#FED7AA" />
                    <stop offset="100%" stopColor="#7C2D12" />
                  </>
                )}
                {currentStyleId === 'hologram' && (
                  <>
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="35%" stopColor="#EC4899" />
                    <stop offset="70%" stopColor="#EAB308" />
                    <stop offset="100%" stopColor="#818CF8" />
                  </>
                )}
              </linearGradient>

              {/* Dynamic Gradient 2: Light Highlighting */}
              <linearGradient id={`gradLight-${currentStyleId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="60%" stopColor={currentConfig.primaryColor} />
                <stop offset="100%" stopColor={currentConfig.secondaryColor} />
              </linearGradient>

              {/* Dark Metallic Texture Background */}
              <linearGradient id="darkArmorBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#181520" />
                <stop offset="50%" stopColor="#0B0910" />
                <stop offset="100%" stopColor="#040306" />
              </linearGradient>

              {/* Radial Backdrop */}
              <radialGradient id={`sunburst-${currentStyleId}`} cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor={currentConfig.primaryColor} stopOpacity="0.35" />
                <stop offset="60%" stopColor={currentConfig.secondaryColor} stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Outer Hexagon Shield Frame */}
            <polygon
              points="200,16 364,110 364,290 200,384 36,290 36,110"
              fill="url(#darkArmorBase)"
              stroke={`url(#gradMain-${currentStyleId})`}
              strokeWidth="5"
            />

            <polygon
              points="200,32 348,118 348,282 200,368 52,282 52,118"
              fill="none"
              stroke={currentConfig.primaryColor}
              strokeOpacity="0.3"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />

            {/* Radiant Core Aura */}
            <circle cx="200" cy="200" r="130" fill={`url(#sunburst-${currentStyleId})`} />

            {/* Inner Cyber Shield Geometry */}
            <g id="cyber-shield-core">
              {/* Outer Energy Chevron */}
              <path
                d="M 200 65 L 310 130 L 310 240 L 200 325 L 90 240 L 90 130 Z"
                fill="none"
                stroke={`url(#gradMain-${currentStyleId})`}
                strokeWidth="3.5"
              />

              {/* Inner Apex Core */}
              <polygon
                points="200,95 285,145 285,230 200,295 115,230 115,145"
                fill={`url(#gradMain-${currentStyleId})`}
                fillOpacity="0.25"
                stroke={`url(#gradLight-${currentStyleId})`}
                strokeWidth="2.5"
              />

              {/* Central Quantum Lock Element */}
              <path
                d="M 200 135 L 250 170 L 250 220 L 200 255 L 150 220 L 150 170 Z"
                fill={`url(#gradLight-${currentStyleId})`}
              />

              {/* Center Tech Circuit Dots */}
              <circle cx="200" cy="195" r="8" fill="#040306" />
              <circle cx="200" cy="195" r="4" fill="#FFFFFF" />

              {/* Ray Lines */}
              <line x1="200" y1="65" x2="200" y2="95" stroke={currentConfig.primaryColor} strokeWidth="3" />
              <line x1="310" y1="130" x2="285" y2="145" stroke={currentConfig.primaryColor} strokeWidth="3" />
              <line x1="310" y1="240" x2="285" y2="230" stroke={currentConfig.primaryColor} strokeWidth="3" />
              <line x1="200" y1="325" x2="200" y2="295" stroke={currentConfig.primaryColor} strokeWidth="3" />
              <line x1="90" y1="240" x2="115" y2="230" stroke={currentConfig.primaryColor} strokeWidth="3" />
              <line x1="90" y1="130" x2="115" y2="145" stroke={currentConfig.primaryColor} strokeWidth="3" />
            </g>

            {/* Engraved Brand Banner */}
            <g id="brand-banner" transform="translate(0, 245)">
              <path
                d="M 60 40 Q 200 25 340 40 L 330 95 Q 200 105 70 95 Z"
                fill="url(#darkArmorBase)"
                stroke={`url(#gradMain-${currentStyleId})`}
                strokeWidth="3.5"
              />

              <text
                x="200"
                y="68"
                fontFamily="'JetBrains Mono', 'Cinzel', monospace, sans-serif"
                fontSize="22"
                fontWeight="900"
                textAnchor="middle"
                fill={`url(#gradLight-${currentStyleId})`}
                letterSpacing="4"
              >
                ANGKOR
              </text>

              <text
                x="200"
                y="88"
                fontFamily="'JetBrains Mono', monospace, sans-serif"
                fontSize="12"
                fontWeight="800"
                textAnchor="middle"
                fill={currentConfig.primaryColor}
                letterSpacing="7"
              >
                EMPEROR 5D
              </text>
            </g>
          </svg>

          {/* Interactive Style Indicator Pill Badge */}
          <div 
            className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-black border z-20 transition-colors shadow-md"
            style={{ 
              backgroundColor: '#0A0A0A',
              borderColor: currentConfig.primaryColor,
              color: currentConfig.primaryColor
            }}
          >
            5D
          </div>
        </button>

        {/* Brand Typography (Clean English) */}
        {showText && (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 
                className={`text-lg sm:text-xl font-black font-mono tracking-wider bg-gradient-to-r ${currentConfig.bgGradient} bg-clip-text text-transparent`}
                style={{ filter: `drop-shadow(0 2px 8px ${currentConfig.accentGlow})` }}
              >
                ANGKOR EMPEROR
              </h1>
              <span 
                className="text-[9px] font-mono font-bold text-black px-2 py-0.5 rounded tracking-widest uppercase transition-all"
                style={{ 
                  backgroundColor: currentConfig.primaryColor,
                  boxShadow: `0 0 10px ${currentConfig.accentGlow}` 
                }}
              >
                5D ARMOR
              </span>
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <span 
                className="text-[10px] font-mono tracking-[0.25em] font-bold uppercase transition-colors"
                style={{ color: currentConfig.primaryColor }}
              >
                ZERO-TRUST CONSOLE
              </span>
              <span 
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: currentConfig.secondaryColor }}
              />
              <span className="text-[9px] font-mono text-white/50 tracking-wider">
                {subtext}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 6 LOGO STYLES INTERACTIVE SELECTOR BAR */}
      {showStyleSelector && (
        <div 
          className={`transition-all duration-300 transform ${
            isHovered 
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto shadow-2xl' 
              : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
          } flex items-center gap-1.5 p-1 bg-[#100D09]/95 border rounded-xl backdrop-blur-xl z-30`}
          style={{
            borderColor: `${currentConfig.primaryColor}80`,
            boxShadow: `0 0 20px ${currentConfig.accentGlow}`
          }}
        >
          <div 
            className="px-2 py-1 text-[8px] font-mono font-black uppercase tracking-widest hidden md:block"
            style={{ color: currentConfig.primaryColor }}
          >
            THEMES:
          </div>

          <div className="flex items-center gap-1">
            {LOGO_STYLES.map((style, idx) => {
              const isSelected = style.id === currentStyleId;
              return (
                <button
                  key={style.id}
                  onClick={() => handleSelectStyle(style.id)}
                  title={`${style.name} (${style.badge})`}
                  className={`px-2 py-1 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                    isSelected 
                      ? 'border scale-105 shadow-md' 
                      : 'bg-black/50 text-white/40 hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                  style={{
                    backgroundColor: isSelected ? '#1A1610' : undefined,
                    borderColor: isSelected ? style.primaryColor : undefined,
                    color: isSelected ? style.primaryColor : undefined,
                    boxShadow: isSelected ? `0 0 12px ${style.accentGlow}` : undefined,
                  }}
                >
                  <span 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ backgroundColor: style.primaryColor }} 
                  />
                  <span>{idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Auto Cycle Button */}
          <button
            onClick={() => setIsAutoCycling(!isAutoCycling)}
            title={isAutoCycling ? "Auto-cycling is ACTIVE (changes every 3s)" : "Click to auto-cycle all 6 styles"}
            className={`px-2 py-1 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
              isAutoCycling 
                ? 'bg-[#CCFF00] text-black shadow-[0_0_12px_#CCFF00]' 
                : 'bg-black/60 text-white/50 hover:text-white border border-white/10'
            }`}
          >
            <Sparkles className={`w-3 h-3 ${isAutoCycling ? 'animate-spin' : ''}`} />
            <span className="hidden xl:inline">{isAutoCycling ? 'CYCLE ON' : 'PLAY 6'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

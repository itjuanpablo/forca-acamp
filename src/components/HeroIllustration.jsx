export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg"
      style={{ width:'min(340px,92vw)', display:'block', margin:'0 auto', position:'relative', zIndex:1 }}>

      {/* ─── Crack lines calçada ─── */}
      <line x1="80"  y1="80"  x2="180" y2="200" stroke="#ABABAB" strokeWidth="1.2" opacity=".5"/>
      <line x1="280" y1="60"  x2="160" y2="210" stroke="#ABABAB" strokeWidth=".9"  opacity=".4"/>
      <line x1="30"  y1="140" x2="120" y2="215" stroke="#ABABAB" strokeWidth=".7"  opacity=".35"/>
      <line x1="310" y1="150" x2="230" y2="215" stroke="#ABABAB" strokeWidth=".7"  opacity=".35"/>

      {/* ─── Pingo solo esquerdo ─── */}
      <circle cx="68"  cy="148" r="5.5" fill="#FF1A8C" />
      <circle cx="52"  cy="160" r="3.5" fill="#FF6EC7" />
      <circle cx="288" cy="155" r="5"   fill="#FF1A8C" />
      <circle cx="305" cy="143" r="3.5" fill="#FF6EC7" />

      {/* ─── Tênis ESQUERDO (verde-ciano, vista de cima) ─── */}
      {/* solado */}
      <rect x="18" y="42" width="110" height="16" rx="5" fill="#D0D0CC" stroke="#999" strokeWidth="1.2"/>
      {/* corpo do tênis */}
      <path d="M20 25 Q22 14 35 12 L115 12 Q128 12 130 25 L130 44 Q80 50 20 44Z" fill="#00BFC8" stroke="#007A80" strokeWidth="1.5"/>
      {/* detalhe lateral */}
      <path d="M25 28 Q40 18 70 16 Q90 15 110 20 L118 30 Q90 26 60 28 Q40 30 25 38Z" fill="#4AE8EE" opacity=".55"/>
      {/* biqueira */}
      <ellipse cx="34" cy="30" rx="18" ry="12" fill="#00D0D8" stroke="#007A80" strokeWidth="1"/>
      {/* cadarços */}
      <line x1="60" y1="14" x2="58" y2="22" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="72" y1="13" x2="70" y2="21" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="84" y1="13" x2="82" y2="21" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="58" y1="18" x2="82" y2="16" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
      {/* meia */}
      <rect x="48" y="0" width="38" height="15" rx="4" fill="#FAFAFA" stroke="#DDD" strokeWidth="1"/>

      {/* ─── Tênis DIREITO (verde-ciano, invertido) ─── */}
      <rect x="232" y="38" width="110" height="16" rx="5" fill="#D0D0CC" stroke="#999" strokeWidth="1.2"/>
      <path d="M232 22 Q234 10 248 9 L330 9 Q343 9 342 22 L342 40 Q290 47 232 40Z" fill="#00BFC8" stroke="#007A80" strokeWidth="1.5"/>
      <path d="M238 24 Q255 15 285 13 Q305 12 328 18 L336 28 Q308 23 278 25 Q255 27 238 35Z" fill="#4AE8EE" opacity=".55"/>
      <ellipse cx="328" cy="26" rx="17" ry="11" fill="#00D0D8" stroke="#007A80" strokeWidth="1"/>
      <line x1="258" y1="11" x2="256" y2="19" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="270" y1="10" x2="268" y2="18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="282" y1="10" x2="280" y2="18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="256" y1="15" x2="280" y2="13" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="272" y="0" width="38" height="13" rx="4" fill="#FAFAFA" stroke="#DDD" strokeWidth="1"/>

      {/* ─── SPLASH PRINCIPAL ─── */}
      {/* sombra */}
      <ellipse cx="182" cy="196" rx="98" ry="13" fill="#C06090" opacity=".18"/>
      {/* corpo do splash */}
      <path d="
        M95 184
        Q84 168 76 174  Q67 160 82 153
        Q72 138 93 148
        Q100 127 116 146
        Q126 122 132 142
        Q146 116 150 140
        Q165 112 170 138
        Q178 114 185 140
        Q196 118 204 142
        Q214 126 220 148
        Q234 136 230 156
        Q248 146 242 164
        Q258 158 250 174
        Q262 174 252 184
        Q258 192 246 191
        L98 191
        Q88 196 95 184Z
      " fill="#FF1A8C"/>

      {/* highlight/brilho no splash */}
      <path d="M130 150 Q155 135 175 148 Q165 138 145 140Z" fill="#FF8CC8" opacity=".5"/>

      {/* pingos ao redor */}
      <ellipse cx="92"  cy="193" rx="8"  ry="11" fill="#FF1A8C"/>
      <ellipse cx="252" cy="191" rx="7"  ry="9"  fill="#FF1A8C"/>
      <ellipse cx="138" cy="196" rx="5"  ry="8"  fill="#FF1A8C"/>
      <ellipse cx="208" cy="195" rx="5"  ry="7"  fill="#FF1A8C"/>
      <circle  cx="268" cy="178" r="6"   fill="#FF1A8C"/>
      <circle  cx="72"  cy="172" r="5"   fill="#FF1A8C"/>
      <circle  cx="280" cy="192" r="4.5" fill="#FF1A8C"/>
      <circle  cx="60"  cy="183" r="3.5" fill="#FF6EC7"/>
      <circle  cx="292" cy="165" r="3"   fill="#FF6EC7"/>

      {/* ─── CASQUINHA ─── */}
      {/* corpo cônico */}
      <polygon points="182,72 148,175 216,175" fill="#EAC84A" stroke="#B8901A" strokeWidth="2"/>
      {/* waffle horizontal */}
      {[92,108,124,140,156,170].map((y,i) => (
        <line key={i} x1={148+(i*1.8)} y1={y} x2={216-(i*1.5)} y2={y} stroke="#B8901A" strokeWidth="1" opacity=".55"/>
      ))}
      {/* waffle vertical */}
      <line x1="166" y1="74" x2="162" y2="173" stroke="#B8901A" strokeWidth=".9" opacity=".45"/>
      <line x1="180" y1="72" x2="178" y2="174" stroke="#B8901A" strokeWidth=".9" opacity=".45"/>
      <line x1="194" y1="74" x2="192" y2="173" stroke="#B8901A" strokeWidth=".9" opacity=".45"/>
      {/* brilho casquinha */}
      <polygon points="162,85 170,75 175,95" fill="#F0DC80" opacity=".45"/>

      {/* ─── BOLA DE SORVETE ─── */}
      <ellipse cx="182" cy="82" rx="32" ry="28" fill="#FF6EC7" stroke="#FF1A8C" strokeWidth="2.2"/>
      {/* highlight */}
      <ellipse cx="170" cy="72" rx="12" ry="9" fill="#FFB3E3" opacity=".55"/>
      {/* drips na casquinha */}
      <path d="M158 106 Q150 118 153 132 Q155 137 159 134 Q162 137 161 124 Q164 113 161 106Z" fill="#FF1A8C"/>
      <path d="M204 110 Q211 122 208 135 Q206 140 202 137 Q200 140 202 128 Q200 118 203 110Z" fill="#FF6EC7"/>
      {/* drip frontal */}
      <path d="M178 108 Q174 122 176 134 Q178 138 182 136 Q186 138 184 124 Q184 112 180 108Z" fill="#FF1A8C"/>
    </svg>
  )
}

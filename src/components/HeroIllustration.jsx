export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 'min(320px, 88vw)', display: 'block', margin: '0 auto' }}>

      {/* ── Tênis esquerdo ── */}
      <rect x="30" y="18" width="95" height="18" rx="4" fill="#00C4CC" stroke="#007A80" strokeWidth="1.8" />
      <ellipse cx="55" cy="25" rx="20" ry="13" fill="#4AE8EE" stroke="#007A80" strokeWidth="1.5" />
      <rect x="26" y="33" width="103" height="13" rx="3" fill="#E0E0E0" stroke="#999" strokeWidth="1" />
      {/* cadarços esq */}
      <line x1="58" y1="19" x2="56" y2="24" stroke="#fff" strokeWidth="1.5" />
      <line x1="68" y1="18" x2="66" y2="23" stroke="#fff" strokeWidth="1.5" />
      <line x1="78" y1="18" x2="76" y2="23" stroke="#fff" strokeWidth="1.5" />
      <line x1="56" y1="22" x2="76" y2="20" stroke="#fff" strokeWidth="1" />
      {/* meia esq */}
      <rect x="45" y="5" width="34" height="16" rx="3" fill="#fff" stroke="#ddd" strokeWidth="1" />

      {/* ── Tênis direito ── */}
      <rect x="214" y="16" width="95" height="18" rx="4" fill="#00C4CC" stroke="#007A80" strokeWidth="1.8" />
      <ellipse cx="284" cy="23" rx="20" ry="13" fill="#4AE8EE" stroke="#007A80" strokeWidth="1.5" />
      <rect x="210" y="31" width="103" height="13" rx="3" fill="#E0E0E0" stroke="#999" strokeWidth="1" />
      {/* cadarços dir */}
      <line x1="235" y1="17" x2="233" y2="22" stroke="#fff" strokeWidth="1.5" />
      <line x1="245" y1="16" x2="243" y2="21" stroke="#fff" strokeWidth="1.5" />
      <line x1="255" y1="16" x2="253" y2="21" stroke="#fff" strokeWidth="1.5" />
      <line x1="233" y1="20" x2="253" y2="18" stroke="#fff" strokeWidth="1" />
      {/* meia dir */}
      <rect x="255" y="3" width="34" height="16" rx="3" fill="#fff" stroke="#ddd" strokeWidth="1" />

      {/* ── Splash de sorvete no chão ── */}
      <ellipse cx="170" cy="182" rx="95" ry="16" fill="#FF2D9B" opacity=".22" />
      <path d="M88 180 Q78 165 70 172 Q62 163 78 157 Q68 143 88 151 Q94 132 108 148 Q118 126 124 143 Q137 121 142 142 Q158 118 162 140 Q178 120 184 142 Q195 125 200 144 Q210 131 212 148 Q226 139 223 156 Q240 148 236 163 Q250 158 244 172 Q256 172 248 182 Q254 189 244 188 L92 188 Q84 192 88 180Z" fill="#FF2D9B" />
      {/* pingos extras */}
      <ellipse cx="100" cy="190" rx="7" ry="10" fill="#FF2D9B" />
      <ellipse cx="240" cy="189" rx="6" ry="9" fill="#FF2D9B" />
      <ellipse cx="140" cy="192" rx="5" ry="8" fill="#FF2D9B" />
      <ellipse cx="200" cy="191" rx="4" ry="7" fill="#FF2D9B" />
      <circle cx="258" cy="178" r="5" fill="#FF2D9B" />
      <circle cx="74" cy="170" r="4" fill="#FF2D9B" />
      <circle cx="268" cy="168" r="3.5" fill="#FF6EC7" />
      <circle cx="60" cy="162" r="3" fill="#FF6EC7" />
      <circle cx="278" cy="184" r="4" fill="#FF2D9B" />

      {/* ── Casquinha ── */}
      <polygon points="170,72 138,168 202,168" fill="#E8C55A" stroke="#C4922A" strokeWidth="2" />
      {/* grid waffle */}
      {[95, 110, 125, 140, 155].map(y => (
        <line key={y} x1="140" y1={y} x2="200" y2={y} stroke="#C4922A" strokeWidth=".9" opacity=".6" />
      ))}
      {[157, 170, 183].map(x => (
        <line key={x} x1={x} y1="74" x2={x - 3} y2="167" stroke="#C4922A" strokeWidth=".9" opacity=".5" />
      ))}

      {/* ── Bola de sorvete (derretendo) ── */}
      <ellipse cx="170" cy="80" rx="30" ry="26" fill="#FF6EC7" stroke="#FF2D9B" strokeWidth="2" />
      <ellipse cx="158" cy="73" rx="11" ry="8" fill="#FFB3E3" opacity=".6" />
      {/* gotas na casquinha */}
      <path d="M152 99 Q145 110 147 122 Q149 128 153 125 Q156 127 155 116 Q158 107 155 99Z" fill="#FF2D9B" />
      <path d="M188 102 Q194 113 192 124 Q190 130 186 127 Q184 130 185 119 Q183 110 186 102Z" fill="#FF6EC7" />
    </svg>
  )
}

const PINS: { n: number; x: number; y: number }[] = [
  { n: 1, x: 40, y: 41 },   // strange noises (vents)
  { n: 2, x: 204, y: 62 },  // error codes / lockouts (display)
  { n: 3, x: 62, y: 150 },  // pressure keeps dropping (left dial)
  { n: 4, x: 122, y: 284 }, // drips or damp (pipes)
  { n: 5, x: 40, y: 224 },  // black marks / soot (casing)
  { n: 6, x: 190, y: 150 }, // slow or uneven heating (right dial)
];

/** Flat illustration of a wall-mounted combi boiler in the brand colours, with numbered pins that match the "signs" list. */
export function BoilerIllustration({ className = "", pins = false }: { className?: string; pins?: boolean }) {
  const navy = "#1a2332";
  return (
    <svg
      viewBox="0 0 260 330"
      role="img"
      aria-label="Illustration of a wall-mounted combi boiler"
      className={className}
    >
      {/* pipes */}
      {[
        [58, "#c8793a"],
        [90, "#158090"],
        [122, "#ffc107"],
        [154, "#c8793a"],
        [186, "#158090"],
      ].map(([x, c]) => (
        <g key={String(x)}>
          <rect x={Number(x)} y="250" width="12" height="56" fill={String(c)} stroke={navy} strokeWidth="2.5" />
          <rect x={Number(x) - 3} y="246" width="18" height="9" fill={navy} />
          <rect x={Number(x) - 3} y="302" width="18" height="8" fill={navy} />
        </g>
      ))}
      {/* casing: hard shadow, then body */}
      <rect x="34" y="24" width="200" height="226" rx="14" fill={navy} />
      <rect x="26" y="16" width="200" height="226" rx="14" fill="#fff" stroke={navy} strokeWidth="3" />
      {/* vent slots */}
      {[34, 41, 48].map((y) => (
        <line key={y} x1="60" y1={y} x2="192" y2={y} stroke="#d8d2c2" strokeWidth="3" strokeLinecap="round" />
      ))}
      {/* display */}
      <rect x="52" y="62" width="148" height="62" fill={navy} />
      <path
        transform="translate(72 96) scale(1.5)"
        d="M0 -12 C 7 -5, 9 2, 5 8 C 3 12, -3 12, -5 8 C -9 2, -3 -3, 0 -12 Z"
        fill="#ffc107"
      />
      <text x="144" y="106" textAnchor="middle" fontSize="42" fontWeight="800" fill="#ffc107" className="font-display">
        65°
      </text>
      {/* dials */}
      {[88, 164].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="172" r="24" fill="#f5f2ea" stroke={navy} strokeWidth="3" />
          <line x1={cx} y1="172" x2={cx + (i ? -11 : 11)} y2="155" stroke="#158090" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx={cx} cy="172" r="4" fill={navy} />
        </g>
      ))}
      {/* buttons */}
      {[64, 98, 132, 166].map((x, i) => (
        <rect key={x} x={x} y="210" width="28" height="14" rx="3" fill={i === 3 ? "#ffc107" : "#fff"} stroke={navy} strokeWidth="2.5" />
      ))}
      {/* numbered pins */}
      {pins &&
        PINS.map((p) => (
          <g key={p.n} transform={`translate(${p.x} ${p.y})`}>
            <circle r="15" fill="#ffc107" stroke={navy} strokeWidth="3" />
            <text y="7" textAnchor="middle" fontSize="20" fontWeight="800" fill={navy} className="font-display">
              {p.n}
            </text>
          </g>
        ))}
    </svg>
  );
}

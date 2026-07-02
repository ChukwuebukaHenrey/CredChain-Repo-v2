/**
 * Faint network topology background — thin interconnected node lines at
 * 4% opacity, diamond-shaped anchor points in `var(--brand-purple-dim)`.
 * Used as an infrastructure texture behind hero sections.
 *
 * No animation, no parallax, no glow — purely static visual scaffolding.
 */
export default function NetworkTopologyBg({ className = "" }: { className?: string }) {
  // Pre-computed nodes (deterministic — no randomness, so the topology is
  // consistent and reviewable). Positions are in a 1200×600 viewBox.
  const nodes: Array<[number, number]> = [
    [80, 90], [220, 60], [380, 130], [540, 80], [720, 110], [880, 70], [1040, 140], [1150, 90],
    [120, 240], [300, 200], [460, 270], [620, 220], [800, 250], [960, 210], [1100, 280],
    [60, 380], [240, 360], [420, 410], [580, 360], [760, 400], [940, 360], [1080, 420],
    [180, 510], [360, 470], [540, 530], [720, 480], [900, 520], [1060, 500],
  ];

  // Edges defined by index pairs into the nodes array. Picked by hand so
  // the topology reads as a mesh — not random, not symmetric.
  const edges: Array<[number, number]> = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
    [0, 8], [1, 9], [2, 9], [3, 11], [4, 12], [5, 13], [6, 14], [7, 14],
    [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14],
    [8, 15], [9, 16], [10, 17], [11, 18], [12, 19], [13, 20], [14, 21],
    [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21],
    [15, 22], [16, 23], [17, 24], [18, 24], [19, 25], [20, 26], [21, 27],
    [22, 23], [23, 24], [24, 25], [25, 26], [26, 27],
    [2, 10], [4, 11], [6, 13], [10, 18], [12, 19], [18, 25],
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 0.04 }}
    >
      {/* Edges first so nodes sit on top */}
      <g stroke="var(--brand-purple-dim)" strokeWidth="0.6" fill="none">
        {edges.map(([a, b], i) => {
          const [x1, y1] = nodes[a];
          const [x2, y2] = nodes[b];
          return <line key={`e-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      {/* Diamond anchor points */}
      <g fill="var(--brand-purple-dim)">
        {nodes.map(([x, y], i) => (
          <rect
            key={`n-${i}`}
            x={x - 3}
            y={y - 3}
            width="6"
            height="6"
            transform={`rotate(45 ${x} ${y})`}
          />
        ))}
      </g>
    </svg>
  );
}

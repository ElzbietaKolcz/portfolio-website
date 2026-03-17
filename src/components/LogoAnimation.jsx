// LogoAnimation.jsx
//
// Animation sequence:
//   Phase 1 (simultaneous):  /  I  K   — clip-path top → bottom
//   Phase 2 (after phase 1): O         — stroke draws CW from 9 o'clock (left → right)
//   Phase 3 (simultaneous):  Z-góra (right→left)  Z-dół (left→right)
//                            C — SVG mask with animated arc reveals the
//                                original filled path from top → bottom
//
// C uses the original filled <path> (horizontal gap edges = pixel-perfect
// bar junction). An SVG <mask> containing a wide-stroke arc draws from
// the top gap CCW to the bottom gap, progressively revealing C.
//
// Loop: 5.5 s  |  0-1s phase1  |  1-1.8s phase2  |  1.8-3.5s phase3
//              |  3-4.5s hold  |  4.5-3.5s fade+blank+restart

export default function LogoAnimation({ size } = /** @type {any} */({})) {
  const css = `
    .laf { fill: #f7931e; }

    /* ── Phase 1: /, I, K  (0% → 18%)  clip top → bottom ─── */

    .la-slash, .la-i, .la-k {
      animation: la-p1 3.5s infinite;
    }
    @keyframes la-p1 {
      0%         { clip-path: inset(0 0 100% 0); animation-timing-function: ease-out; }
      18%        { clip-path: inset(0 0 0    0); }
      82%        { clip-path: inset(0 0 0    0); animation-timing-function: step-end; }
      89%, 100%  { clip-path: inset(0 0 100% 0); }
    }

    /* ── Phase 2: O  (18% → 33%)  stroke draw ────────────── */

    .la-o {
      stroke-dasharray: 100;
      animation: la-p2 3.5s infinite;
    }
    @keyframes la-p2 {
      0%, 18%    { stroke-dashoffset: 100; animation-timing-function: ease-in; }
      33%        { stroke-dashoffset: 0; }
      82%        { stroke-dashoffset: 0;   animation-timing-function: step-end; }
      89%, 100%  { stroke-dashoffset: 100; }
    }

    /* ── Phase 3a: Z-góra  (33% → 55%)  clip right → left ── */

    .la-zgora { animation: la-p3rl 3.5s infinite; }
    @keyframes la-p3rl {
      0%, 33%    { clip-path: inset(0 0 0 100%); animation-timing-function: ease-out; }
      55%        { clip-path: inset(0 0 0 0   ); }
      82%        { clip-path: inset(0 0 0 0   ); animation-timing-function: step-end; }
      89%, 100%  { clip-path: inset(0 0 0 100%); }
    }

    /* ── Phase 3b: Z-dół  (33% → 55%)  clip left → right ─── */

    .la-zdol { animation: la-p3lr 3.5s infinite; }
    @keyframes la-p3lr {
      0%, 33%    { clip-path: inset(0 100% 0 0); animation-timing-function: ease-out; }
      55%        { clip-path: inset(0 0    0 0); }
      82%        { clip-path: inset(0 0    0 0); animation-timing-function: step-end; }
      89%, 100%  { clip-path: inset(0 100% 0 0); }
    }

    /* ── Phase 3c: C mask arc  (33% → 55%) ──────────────── */
    /*    The mask contains a wide-stroke arc (sw=50) at the  */
    /*    C mid-radius. stroke-dashoffset draws it CCW from   */
    /*    the top gap to the bottom gap, revealing the filled */
    /*    C path underneath.                                   */

    .la-cmask-arc {
      stroke-dasharray: 100;
      animation: la-p3c 3.5s infinite;
    }
    @keyframes la-p3c {
      0%, 33%    { stroke-dashoffset: 100; animation-timing-function: ease-out; }
      55%        { stroke-dashoffset: 0; }
      82%        { stroke-dashoffset: 0;   animation-timing-function: step-end; }
      89%, 100%  { stroke-dashoffset: 100; }
    }

    /* ── group fade ──────────────────────────────────────── */

    .la-group { animation: la-gfade 3.5s linear infinite; }
    @keyframes la-gfade {
      0%, 82%  { opacity: 1; }
      87%      { opacity: 0; }
      100%     { opacity: 0; }
    }

    /* ── reduced motion ──────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .la-slash, .la-i, .la-k,
      .la-zgora, .la-zdol, .la-group {
        animation: none; clip-path: none; opacity: 1;
      }
      .la-o, .la-cmask-arc {
        animation: none; stroke-dashoffset: 0;
      }
    }
  `;

  return (
    <div className="flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 470.8 494.68"
        className={size === "small" ? "w-28 h-auto sm:w-36 md:w-44" : "w-40 h-auto sm:w-52 md:w-64"}

        aria-hidden="true"
        focusable="false"
      >
        <style>{css}</style>

        <defs>
          {/* Mask for C: arc at mid-radius (235.34) with wide stroke (70)
              covers the full C thickness plus safety margin.
              Arc extends ~8° past each gap for full coverage at junctions.
              White stroke = visible area in mask. */}
          <mask
            id="la-cmask"
            maskUnits="userSpaceOnUse"
            x="0" y="0" width="470.8" height="494.68"
          >
            <path
              className="la-cmask-arc"
              d="M470,141.24 L457.44,141.24 L440.59,113.00 A235.34,235.34 0 1 0 468.05,329.14"
              pathLength="100"
              fill="none"
              stroke="white"
              strokeWidth="70"
            />
          </mask>
        </defs>

        <g className="la-group">

          {/* ── Phase 1: /, I, K ──────────────────────────── */}

          <g className="la-slash">
            <polygon className="laf" points="53.63 358.94 86.51 359.94 473.5 140.28 447.09 140.24 53.63 359.94"/>
          </g>

          <g className="la-i">
            <path className="laf" d="M219.72,369.39s1.87.43,4,.83c1.59.31,3.31.59,4.41.75,1.6.23,4.16.58,6.18.79l3,.29V128.19s-1.15.08-2.38.2c-.77.07-1.66.19-2.14.25-1.12.13-3.18.41-4.26.55l-1.75.27c-1,.15-2.09.39-2.76.51-1.09.19-4.28.87-4.28.87Z"/>
          </g>

          <g className="la-k">
            <polygon className="laf" points="274.26 250.52 260.47 258.34 359.08 359.94 380.69 359.94 274.26 250.52"/>
            <polygon className="laf" points="372.69 372.56 372.75 372.61 372.8 372.56 372.69 372.56"/>
          </g>

          {/* ── Phase 2: O ────────────────────────────────── */}

          <circle
            className="la-o"
            cx="246.76" cy="250.12" r="114.74"
            pathLength="100"
            fill="none" stroke="#f7931e" strokeWidth="15.14"
            transform="scale(-1,1) translate(-493.52, 0) rotate(280, 246.76, 250.12)"
          />

          {/* ── Phase 3: C (masked), then bars on top ─────── */}

          {/* C: original filled path revealed by the animated mask.
              Horizontal gap edges at y=141.24 and y=358.93 are
              preserved exactly → pixel-perfect bar junction. */}
          <g mask="url(#la-cmask)">
            <path className="laf" d="M440.94,358.93a223.33,223.33,0,0,1-193.6,111.91c-123.44,0-223.51-100.08-223.51-223.5S123.9,23.83,247.34,23.83A223.46,223.46,0,0,1,444.09,141.24H470.8C431.08,57.73,346,0,247.34,0,110.74,0,0,110.74,0,247.34S110.74,494.68,247.34,494.68c96.43,0,179.91-55.22,220.71-135.74Z"/>
          </g>

          {/* Bars render ON TOP of C → cover any mask edge
              artifacts at the junction points */}
          <g className="la-zgora">
            <path className="laf" d="M30.87,127.63h-.11v.19Z"/>
            <path className="laf" d="M48.59,142.54h397.5q-3.76,-7.76,-8,-15.12H56.65C53.82,132.35,51.11,137.37,48.59,142.54Z"/>
          </g>

          <g className="la-zdol">
            <path className="laf" d="M60.18,372.66H434.41c3,-4.91,5.86,-9.99,8.54,-15.12H51.65C54.33,362.70,57.19,367.76,60.18,372.66Z"/>
            <path className="laf" d="M34,372.43v.09H34Z"/>
          </g>

        </g>
      </svg>
    </div>
  );
}

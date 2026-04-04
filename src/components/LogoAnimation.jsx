// LogoAnimation.jsx
//
// Animation sequence:
//   Phase 1 (simultaneous):  /  I  K   — clip-path top → bottom
//   Phase 2 (after phase 1): O         — stroke draws from ~9 o'clock (left → right)
//   Phase 3 (simultaneous):  Z-góra (right→left)  Z-dół (left→right)
//                            C — stroke-dashoffset draws from top gap to bottom gap
//
// Loop: 3.5 s  |  0-18% phase1  |  18-33% phase2  |  33-55% phase3
//              |  55-82% hold   |  82-89% fade     |  89-100% blank

export default function LogoAnimation({ size } = /** @type {any} */({})) {
  const css = `
    .laf { fill: #FA5705; }

    /* ── Phase 1: /, I, K  (0% → 18%)  clip top → bottom ─── */

    .la-slash, .la-i, .la-k {
      animation: la-p1 3.5s infinite;
    }
    @keyframes la-p1 {
      0%         { clip-path: inset(0 0 100% 0) view-box; animation-timing-function: ease-out; }
      18%        { clip-path: inset(0 0 0    0) view-box; }
      82%        { clip-path: inset(0 0 0    0) view-box; animation-timing-function: step-end; }
      89%, 100%  { clip-path: inset(0 0 100% 0) view-box; }
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
      0%, 33%    { clip-path: inset(0 0 0 100%) view-box; animation-timing-function: ease-out; }
      55%        { clip-path: inset(0 0 0 0   ) view-box; }
      82%        { clip-path: inset(0 0 0 0   ) view-box; animation-timing-function: step-end; }
      89%, 100%  { clip-path: inset(0 0 0 100%) view-box; }
    }

    /* ── Phase 3b: Z-dół  (33% → 55%)  clip left → right ─── */

    .la-zdol { animation: la-p3lr 3.5s infinite; }
    @keyframes la-p3lr {
      0%, 33%    { clip-path: inset(0 100% 0 0) view-box; animation-timing-function: ease-out; }
      55%        { clip-path: inset(0 0    0 0) view-box; }
      82%        { clip-path: inset(0 0    0 0) view-box; animation-timing-function: step-end; }
      89%, 100%  { clip-path: inset(0 100% 0 0) view-box; }
    }

    /* ── Phase 3c: C  (33% → 55%)  stroke draw top → bottom ─ */
    /*    Path starts at top-right gap, ends at bottom-right gap */

    .la-c {
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
        animation: none; clip-path: inset(0 0 0 0) view-box; opacity: 1;
      }
      .la-o, .la-c {
        animation: none; stroke-dashoffset: 0;
      }
    }
  `;

  return (
    <div className="flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 70 75"
        className={size === "small" ? "w-28 h-auto sm:w-36 md:w-44" : "w-40 h-auto sm:w-52 md:w-64"}
        aria-hidden="true"
        focusable="false"
      >
        <style>{css}</style>

        <g className="la-group">

          {/* ── Phase 1: /, I, K ──────────────────────────── */}

          <g className="la-slash">
            <path className="laf" d="M69.3469 20.9582L13.4978 53.3574L8.55225 53.3574L64.1872 21.0825L69.2735 20.8317L69.3469 20.9582Z" />
          </g>

          <g className="la-i">
            <path className="laf" d="M32.2607 55.1641V19.2813C32.2607 19.2813 33.0154 19.045 33.5 18.9492C33.9846 18.8535 34.7424 18.7789 34.7424 18.7789V55.6719C34.7424 55.6719 33.9846 55.5499 33.5 55.4492C33.0154 55.3485 32.2607 55.1641 32.2607 55.1641Z" />
          </g>

          <g className="la-k">
            <path className="laf" d="M55.8623 53.3857L52.4968 53.3857L38.9401 38.5864L41.1502 37.3252L55.8623 53.3857Z" />
          </g>

          {/* ── Phase 2: O ────────────────────────────────── */}

          <circle
            className="la-o"
            cx="37.2245" cy="37.2255" r="17.2828"
            pathLength="100"
            fill="none" stroke="#FA5705" strokeWidth="2.65889"
            transform="scale(-1,1) translate(-74.449, 0) rotate(280, 37.2245, 37.2255)"
          />

          {/* ── Phase 3: C, Z-góra, Z-dół ─────────────────── */}

          {/* C: stroke path drawn from top-right gap to bottom-right gap.
              Bars render on top to cover any stroke end artifacts. */}
          <path
            className="la-c"
            d="M67.6238 21.7131C61.9036 10.378 50.7777 2.48047 37.2162 2.48047C18.0325 2.48047 2.48096 18.0354 2.48096 37.2233C2.48096 56.4113 18.0325 71.9662 37.2162 71.9662C50.0732 71.9662 61.2986 64.9794 67.3045 54.5948C67.5388 54.1896 67.6238 53.9743 67.6238 53.3539"
            pathLength="100"
            fill="none" stroke="#FA5705" strokeWidth="3.72245"
          />

          <g className="la-zgora">
            <path className="laf" d="M68 21.0949V18.6133H10.0975C10.0975 18.6133 9.79926 19.0154 9.5 19.5C9.20074 19.9846 8.54688 21.0949 8.54688 21.0949H68Z" />
          </g>

          <g className="la-zdol">
            <path className="laf" d="M68 53.3555H8.55029C8.55029 53.3555 9.19549 54.4646 9.49995 54.9492C9.80442 55.4338 10.1095 55.8371 10.1095 55.8371H68V53.3555Z" />
          </g>

        </g>
      </svg>
    </div>
  );
}

const commonSVGPath = `
<svg width='30px' height='30px' viewBox='0 0 24 24' fill='Black' xmlns='http://www.w3.org/2000/svg'>
  <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='Black'/>
  <circle cx='12' cy='10' r='3' fill='Black'/>
</svg>`;

const generateEs1SVG = (backgroundColor, strokeColor) => `
  data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${backgroundColor}' stroke='${strokeColor}'/>
  <rect x='8.0' y='27.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>
  <svg x='20' y='30'>${commonSVGPath}</svg>
  <rect x='72.5' y='27.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>
  <svg x='85' y='30'>${commonSVGPath}</svg>
</svg>`;

// Exporting the es1 SVGs
export const es1 = generateEs1SVG("%2387919a", "%23BBBFC3");
export const es1_selected = generateEs1SVG("%23ffffff", "Aqua");

const commonSVGPath2 = `
<svg width='48px' height='34px' viewBox='0 0 24 24' fill='Black' xmlns='http://www.w3.org/2000/svg'>
  <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='Black' stroke='Black' stroke-width='0' stroke-linecap='round' stroke-linejoin='round'/>
  <circle cx='12' cy='10' r='3' fill='Black' stroke='Black' stroke-width='0' stroke-linecap='round' stroke-linejoin='round'/>
</svg>`;

const generateEs2SVG = (backgroundColor, strokeColor) => `
  data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${backgroundColor}' stroke='${strokeColor}'/>
  <rect x='8.0' y='8.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>
  <svg x='15' y='5'>${commonSVGPath2}</svg>
  <rect x='72.5' y='8.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>
  <svg x='80' y='5'>${commonSVGPath2}</svg>
  <rect x='40.25' y='46.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>
  <svg x='47' y='43'>${commonSVGPath2}</svg>
</svg>`;

// Exporting the es2 SVGs
export const es2 = generateEs2SVG("%2387919a", "%23BBBFC3");
export const es2_selected = generateEs2SVG("%23ffffff", "Aqua");

const commonSVGPath3 = `
<svg width='30' height='30' viewBox='0 0 24 24' fill='Black' xmlns='http://www.w3.org/2000/svg'>
  <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z'></path>
  <circle cx='12' cy='10' r='3'></circle>
</svg>`;

const generateEs3SVG = (backgroundColor, strokeColor) => `
  data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${backgroundColor}' stroke='${strokeColor}'></rect>
  <rect x='8' y='12' width='58' height='29' rx='2' fill='%23BBBFC3'></rect>
  <svg x='25' y='12'>${commonSVGPath3}</svg>
  <rect x='8' y='49' width='58' height='29' rx='2' fill='%23BBBFC3'></rect>
  <svg x='25' y='47'>${commonSVGPath3}</svg>
  <rect x='74' y='12' width='58' height='29' rx='2' fill='%23BBBFC3'></rect>
  <svg x='90' y='12'>${commonSVGPath3}</svg>
  <rect x='74' y='49' width='58' height='29' rx='2' fill='%23BBBFC3'></rect>
  <svg x='90' y='47'>${commonSVGPath3}</svg>
</svg>`;

// Exporting the es3 SVGs
export const es3 = generateEs3SVG("%2387919a", "%23BBBFC3");
export const es3_selected = generateEs3SVG("%23ffffff", "Aqua");

const commonSVGPath4 = `
<svg width='20' height='20' viewBox='0 0 24 24' fill='Black'>
  <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z'></path>
  <circle cx='12' cy='10' r='3'></circle>
</svg>`;

const createRectWithIcon = (
  xRect,
  yRect,
  widthRect,
  heightRect,
  rxRect,
  xIcon,
  yIcon
) => `
  <rect x='${xRect}' y='${yRect}' width='${widthRect}' height='${heightRect}' rx='${rxRect}' fill='%23BBBFC3'></rect>
  <svg x='${xIcon}' y='${yIcon}'>${commonSVGPath4}</svg>
`;

const generateEs4SVG = (backgroundColor, strokeColor) => `
  data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${backgroundColor}' stroke='${strokeColor}'></rect>
  ${createRectWithIcon(8, 9.81982, 38.6231, 19.9617, 2.03279, 17, 7)}
  ${createRectWithIcon(8, 33.3873, 38.6231, 19.9617, 2.03279, 17, 32)}
  ${createRectWithIcon(8, 56.9551, 38.6231, 19.9617, 2.03279, 17, 57)}
  ${createRectWithIcon(50.6875, 9.81982, 38.6231, 19.9617, 2.03279, 60, 7)}
  ${createRectWithIcon(50.6875, 33.3873, 38.6231, 19.9617, 2.03279, 60, 32)}
  ${createRectWithIcon(50.6875, 56.9551, 38.6231, 19.9617, 2.03279, 60, 57)}
  ${createRectWithIcon(92.3594, 9.81982, 39.6395, 19.9617, 2.03279, 101, 7)}
  ${createRectWithIcon(92.3594, 33.3873, 39.6395, 19.9617, 2.03279, 101, 32)}
  ${createRectWithIcon(92.3594, 56.9551, 39.6395, 19.9617, 2.03279, 101, 57)}
</svg>`;

// Exporting the es4 SVGs
export const es4 = generateEs4SVG("%2387919a", "%23BBBFC3");
export const es4_selected = generateEs4SVG("%23ffffff", "Aqua");

const commonSVGPath5 = `
<svg width='12px' height='12px' viewBox='0 0 24 24' fill='Black' xmlns='http://www.w3.org/2000/svg'>
  <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z'></path>
  <circle cx='12' cy='10' r='3'></circle>
</svg>`;

const createRectWithIconEs5 = (
  xRect,
  yRect,
  widthRect,
  heightRect,
  rxRect,
  xIcon,
  yIcon
) => `
  <rect x='${xRect}' y='${yRect}' width='${widthRect}' height='${heightRect}' rx='${rxRect}' fill='%23BBBFC3'></rect>
  <svg x='${xIcon}' y='${yIcon}'>${commonSVGPath5}</svg>
`;

const generateEs5SVG = (backgroundColor, strokeColor) => `
  data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${backgroundColor}' stroke='${strokeColor}'></rect>
  ${createRectWithIconEs5(41.1016, 63.8228, 27.2728, 14.3541, 1.43541, 49, 63)}
  ${createRectWithIconEs5(71.1953, 29.2743, 27.9905, 14.3541, 1.43541, 79, 29)}
  ${createRectWithIconEs5(11, 29.2743, 27.2728, 14.3541, 1.43541, 19, 29)}
  ${createRectWithIconEs5(11, 12, 27.2728, 14.3541, 1.43541, 19, 12)}
  ${createRectWithIconEs5(11, 46.5486, 27.2728, 14.3541, 1.43541, 19, 46)}
  ${createRectWithIconEs5(11, 63.8228, 27.2728, 14.3541, 1.43541, 19, 63)}
  ${createRectWithIconEs5(41.1016, 29.2743, 27.2728, 14.3541, 1.43541, 49, 29)}
  ${createRectWithIconEs5(41.1016, 12, 27.2728, 14.3541, 1.43541, 49, 12)}
  ${createRectWithIconEs5(41.1016, 46.5486, 27.2728, 14.3541, 1.43541, 49, 46)}
  ${createRectWithIconEs5(71.1953, 12, 27.9905, 14.3541, 1.43541, 79, 12)}
  ${createRectWithIconEs5(102.008, 29.2743, 27.9905, 14.3541, 1.43541, 110, 29)}
  ${createRectWithIconEs5(102.008, 12, 27.9905, 14.3541, 1.43541, 110, 12)}
  ${createRectWithIconEs5(102.008, 46.5486, 27.9905, 14.3541, 1.43541, 110, 46)}
  ${createRectWithIconEs5(102.008, 63.8228, 27.9905, 14.3541, 1.43541, 110, 63)}
  ${createRectWithIconEs5(71.1953, 46.5486, 27.9905, 14.3541, 1.43541, 79, 46)}
  ${createRectWithIconEs5(71.1953, 63.8228, 27.9905, 14.3541, 1.43541, 79, 63)}
</svg>`;

// Exporting the es5 SVGs
export const es5 = generateEs5SVG("%2387919a", "%23BBBFC3");
export const es5_selected = generateEs5SVG("%23ffffff", "Aqua");

const commonSVGPath6 = `
  <svg width='12px' height='12px' viewBox='0 0 24 24' fill='Black' xmlns='http://www.w3.org/2000/svg'>
    <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='Black'/>
    <circle cx='12' cy='10' r='3' fill='Black'/>
  </svg>
`;

const createRectWithIconEs6 = (
  xRect,
  yRect,
  widthRect,
  heightRect,
  rxRect,
  xIcon,
  yIcon
) => `
  <rect x='${xRect}' y='${yRect}' width='${widthRect}' height='${heightRect}' rx='${rxRect}' fill='%23BBBFC3'></rect>
  <svg x='${xIcon}' y='${yIcon}'>${commonSVGPath6}</svg>
`;

const generateEs6SVG = (backgroundColor, strokeColor) => `
  data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${backgroundColor}' stroke='${strokeColor}'></rect>
    ${createRectWithIconEs6(57.1717, 42.7063, 24.26, 14, 1.2441, 63, 44)}
    ${createRectWithIconEs6(5, 42.7063, 23.6379, 14, 1.2441, 11, 44)}
    ${createRectWithIconEs6(5, 25.7343, 23.6379, 14, 1.2441, 11, 27)}
    ${createRectWithIconEs6(5, 8, 23.6379, 14, 1.2441, 11, 10)}
    ${createRectWithIconEs6(5, 59.6782, 23.6379, 14, 1.2441, 11, 61)}
    ${createRectWithIconEs6(31.0859, 42.7063, 23.6379, 14, 1.2441, 37, 44)}
    ${createRectWithIconEs6(31.0859, 25.7344, 23.6379, 14, 1.2441, 37, 27)}
    ${createRectWithIconEs6(31.0859, 8, 23.6379, 14, 1.2441, 37, 10)}
    ${createRectWithIconEs6(31.0859, 59.6782, 23.6379, 14, 1.2441, 37, 61)}
    ${createRectWithIconEs6(57.1717, 25.7343, 24.26, 14, 1.2441, 63, 27)}
    ${createRectWithIconEs6(57.1717, 8, 24.26, 14, 1.2441, 63, 10)}
    ${createRectWithIconEs6(83.8828, 42.7063, 24.26, 14, 1.2441, 90, 44)}
    ${createRectWithIconEs6(110.742, 42.7063, 24.26, 14, 1.2441, 117, 44)}
    ${createRectWithIconEs6(83.8828, 25.7344, 24.26, 14, 1.2441, 90, 27)}
    ${createRectWithIconEs6(83.8828, 8, 24.26, 14, 1.2441, 90, 10)}
    ${createRectWithIconEs6(110.742, 25.7344, 24.26, 14, 1.2441, 117, 27)}
    ${createRectWithIconEs6(110.742, 8, 24.26, 14, 1.2441, 117, 10)}
    ${createRectWithIconEs6(83.8828, 59.6782, 24.26, 14, 1.2441, 90, 61)}
    ${createRectWithIconEs6(110.742, 59.6782, 24.26, 14, 1.2441, 117, 61)}
    ${createRectWithIconEs6(57.1717, 59.6782, 24.26, 14, 1.2441, 63, 61)}
  </svg>
`;

// Exporting the es6 SVGs
export const es6 = generateEs6SVG("%2387919a", "%23BBBFC3");
export const es6_selected = generateEs6SVG("%23ffffff", "Aqua");

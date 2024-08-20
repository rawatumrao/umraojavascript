const commonSVGPath = `<svg x='30' y='5' width='80px' height='80px' viewBox='0 0 24 24' fill='Black' xmlns='http://www.w3.org/2000/svg'>
<path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='Black'/>
<circle cx='12' cy='10' r='3' fill='Black'/>
</svg>`;

const generateSVG = (backgroundColor, strokeColor) =>
  `data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${backgroundColor}' stroke='${strokeColor}'></rect>
  <rect x='9' y='12' width='124' height='65' rx='2' fill='%23BBBFC3'></rect>
  ${commonSVGPath}
  </svg>`;

export const sf1 = generateSVG("%2387919a", "%23BBBFC3");
export const sf1_selected = generateSVG("%23ffffff", "Aqua");

const commonSVGPath2 = `
<svg width='25px' height='25px' viewBox='0 0 24 24' fill='Black' xmlns='http://www.w3.org/2000/svg'>
  <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='Black'/>
  <circle cx='12' cy='10' r='3' fill='Black'/>
</svg>`;

const largeSVGPath2 = `
<svg width='70px' height='70px' viewBox='0 0 24 24' fill='Black' xmlns='http://www.w3.org/2000/svg'>
  <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='Black'/>
  <circle cx='12' cy='10' r='3' fill='Black'/>
</svg>`;

const generateSf2SVG = (backgroundColor, strokeColor) => `
  data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${backgroundColor}' stroke='${strokeColor}'></rect>
  <rect x='8' y='8' width='124' height='71' rx='2' fill='%23BBBFC3'></rect>
  <rect x='12' y='51' width='41' height='24' rx='2' fill='%2387919a'></rect>
  <svg x='20' y='50'>${commonSVGPath2}</svg>
  <svg x='30' y='5'>${largeSVGPath2}</svg>
</svg>`;

// Exporting the sf2 SVGs
export const sf2 = generateSf2SVG("%2387919a", "%23BBBFC3");
export const sf2_selected = generateSf2SVG("%23ffffff", "Aqua");

const commonSVGPath3 = `
<svg width='12px' height='12px' viewBox='0 0 24 24' fill='Black' xmlns='http://www.w3.org/2000/svg'>
  <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='Black'/>
  <circle cx='12' cy='10' r='3' fill='Black'/>
</svg>`;

const largeSVGPath3 = `
<svg width='50px' height='50px' viewBox='0 0 24 24' fill='Black' xmlns='http://www.w3.org/2000/svg'>
  <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='Black'/>
  <circle cx='12' cy='10' r='3' fill='Black'/>
</svg>`;

const generateSf3SVG = (backgroundColor, strokeColor) => `
  data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${backgroundColor}' stroke='${strokeColor}'></rect>
  <rect x='33' y='12.1044' width='74' height='45.3913' rx='2' fill='%23BBBFC3'></rect>
  <svg x='45' y='10'>${largeSVGPath3}</svg>
  <rect x='4' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>
  <svg x='8' y='68'>${commonSVGPath3}</svg>
  <rect x='23' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>
  <svg x='27' y='68'>${commonSVGPath3}</svg>
  <rect x='42' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>
  <svg x='46' y='68'>${commonSVGPath3}</svg>
  <rect x='61' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>
  <svg x='65' y='68'>${commonSVGPath3}</svg>
  <rect x='80' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>
  <svg x='84' y='68'>${commonSVGPath3}</svg>
  <rect x='99' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>
  <svg x='103' y='68'>${commonSVGPath3}</svg>
  <rect x='118' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>
  <svg x='122' y='68'>${commonSVGPath3}</svg>
</svg>`;

// Exporting the sf3 SVGs
export const sf3 = generateSf3SVG("%2387919a", "%23BBBFC3");
export const sf3_selected = generateSf3SVG("%23ffffff", "Aqua");

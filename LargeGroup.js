const commonSVGPathLg = (radius) => `
  <svg width='15px' height='15px' viewBox='0 0 24 24' fill='Black' xmlns='http://www.w3.org/2000/svg'>
    <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='Black'/>
    <circle cx='12' cy='10' r='${radius}' fill='Black'/>
  </svg>
`;

const createRectWithIcon = (
  rectX,
  rectY,
  rectWidth,
  rectHeight,
  iconX,
  iconY,
  iconWidth,
  iconHeight,
  rx,
  radius
) => `
  <rect x='${rectX}' y='${rectY}' width='${rectWidth}' height='${rectHeight}' rx='${rx}' fill='%23BBBFC3'></rect>
  <svg x='${iconX}' y='${iconY}' width='${iconWidth}' height='${iconHeight}'>
    ${commonSVGPathLg(radius)}
  </svg>
`;

const generateSVG = (backgroundColor, strokeColor, rects) => `
  data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${backgroundColor}' stroke='${strokeColor}'></rect>
    ${rects.join('')}
  </svg>
`;

const lg1Rects = [
  createRectWithIcon(5, 5, 63, 39, 2, 2, '15px', '15px', 2, 4),
  createRectWithIcon(72, 5, 63, 39, 70, 2, '15px', '15px', 2, 4),
  createRectWithIcon(5, 60, 20, 12, 8, 57, '15px', '15px', 2, 3),
  createRectWithIcon(5, 47, 20, 12, 8, 44, '15px', '15px', 2, 3),
  // add other rectangles as needed
];

export const lg1 = generateSVG('%2387919a', '%23BBBFC3', lg1Rects);
export const lg1_selected = generateSVG('%23ffffff', 'Aqua', lg1Rects);

const lg2Rects = [
  createRectWithIcon(8.0, 27.0, 59.5, 34.0, 18, 25, '40px', '40px', 2, 3),
  createRectWithIcon(72.5, 27.0, 59.5, 34.0, 82, 25, '40px', '40px', 2, 3),
  createRectWithIcon(8.0, 8.0, 27.25, 15.0, 14, 8, '15px', '15px', 2, 3),
  // add other rectangles as needed
];

export const lg2 = generateSVG('%2387919a', '%23BBBFC3', lg2Rects);
export const lg2_selected = generateSVG('%23ffffff', 'Aqua', lg2Rects);

const lg3Rects = [
  createRectWithIcon(8.0, 8.0, 20.8, 11.2, 11, 5, '15px', '15px', 2, 3),
  createRectWithIcon(8.0, 23.2, 20.8, 11.2, 11, 20, '15px', '15px', 2, 3),
  // add other rectangles as needed
];

export const lg3 = generateSVG('%2387919a', '%23BBBFC3', lg3Rects);
export const lg3_selected = generateSVG('%23ffffff', 'Aqua', lg3Rects);

const lg4Rects = [
  createRectWithIcon(5, 60, 20, 12, 8, 57, '15px', '15px', 2, 3),
  createRectWithIcon(5, 47, 20, 12, 8, 44, '15px', '15px', 2, 3),
  // add other rectangles as needed
];

export const lg4 = generateSVG('%2387919a', '%23BBBFC3', lg4Rects);
export const lg4_selected = generateSVG('%23ffffff', 'Aqua', lg4Rects);

const lg5Rects = [
  createRectWithIcon(40.25, 27.0, 59.5, 34.0, 50, 25, '40px', '40px', 2, 3),
  createRectWithIcon(8.0, 8.0, 27.25, 15.0, 13, 8, '15px', '15px', 2, 3),
  // add other rectangles as needed
];

export const lg5 = generateSVG('%2387919a', '%23BBBFC3', lg5Rects);
export const lg5_selected = generateSVG('%23ffffff', 'Aqua', lg5Rects);

const lg6Rects = [
  createRectWithIcon(43, 4, 55, 39, 50, 5, '40px', '40px', 2.51724, 3),
  createRectWithIcon(119, 45, 17, 12, 120, 44, '15px', '15px', 2, 3),
  // add other rectangles as needed
];

export const lg6 = generateSVG('%2387919a', '%23BBBFC3', lg6Rects);
export const lg6_selected = generateSVG('%23ffffff', 'Aqua', lg6Rects);

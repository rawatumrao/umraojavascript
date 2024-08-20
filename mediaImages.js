const createMlayoutSVG = ({
  rectFill,
  strokeColor,
  rectX,
  rectY,
  rectWidth,
  rectHeight,
  svgX,
  svgY,
  polygonPoints,
  extraRectX = 55,
  extraRectY = 5,
  extraSVGX = 70,
  extraSVGY = 8,
}) => `
  <svg width='100' height='70' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${rectFill}' stroke='${strokeColor}'></rect>
    <rect x='${rectX}' y='${rectY}' width='${rectWidth}' height='${rectHeight}' rx='8' fill='%23BBBFC3'></rect>
    <svg x='${svgX}' y='${svgY}' width='200' height='135' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <polygon points='${polygonPoints}' fill='black' opacity='0.7'/>
    </svg>
    <rect x='${extraRectX}' y='${extraRectY}' width='80' height='55' rx='8' fill='%23BBBFC3'></rect>
    <svg x='${extraSVGX}' y='${extraSVGY}' width='50' height='50' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='100' cy='100' r='100' fill='black'/>
      <path d='M100,100 L100,0 A100,100 0 0,1 180,60 Z' fill='Black' stroke='%23BBBFC3' stroke-width='5'/>
      <path d='M100,100 L180,60 A100,100 0 0,1 160,170 Z' fill='Black' stroke='%23BBBFC3' stroke-width='5'/>
    </svg>
  </svg>
`;

const createLayoutExport = (layoutConfig) => ({
  default: `data:image/svg+xml;utf8,${createMlayoutSVG(layoutConfig)}`,
  selected: `data:image/svg+xml;utf8,${createMlayoutSVG({ ...layoutConfig, rectFill: '%23ffffff', strokeColor: 'Aqua' })}`,
});

export const mlayout1 = createLayoutExport({
  rectFill: '%2387919a',
  strokeColor: '%23BBBFC3',
  rectX: 90,
  rectY: 5,
  rectWidth: 45,
  rectHeight: 30,
  svgX: 10,
  svgY: 0,
  polygonPoints: '8,4 25,12 8,20',
  extraRectX: 4,
  extraRectY: 4,
  extraSVGX: 105,
  extraSVGY: 10,
});

export const mlayout2 = createLayoutExport({
  rectFill: '%2387919a',
  strokeColor: '%23BBBFC3',
  rectX: 90,
  rectY: 30,
  rectWidth: 45,
  rectHeight: 30,
  svgX: 10,
  svgY: 0,
  polygonPoints: '8,4 25,12 8,20',
  extraRectX: 4,
  extraRectY: 4,
  extraSVGX: 105,
  extraSVGY: 35,
});

export const mlayout3 = createLayoutExport({
  rectFill: '%2387919a',
  strokeColor: '%23BBBFC3',
  rectX: 3,
  rectY: 5,
  rectWidth: 45,
  rectHeight: 30,
  svgX: 65,
  svgY: 0,
  polygonPoints: '8,4 25,12 8,20',
  extraRectX: 55,
  extraRectY: 5,
  extraSVGX: 15,
  extraSVGY: 10,
});

export const mlayout4 = createLayoutExport({
  rectFill: '%2387919a',
  strokeColor: '%23BBBFC3',
  rectX: 3,
  rectY: 30,
  rectWidth: 45,
  rectHeight: 30,
  svgX: 65,
  svgY: 0,
  polygonPoints: '8,4 25,12 8,20',
  extraRectX: 55,
  extraRectY: 5,
  extraSVGX: 15,
  extraSVGY: 35,
});

export const mlayout5 = createLayoutExport({
  rectFill: '%2387919a',
  strokeColor: '%23BBBFC3',
  rectX: 90,
  rectY: 5,
  rectWidth: 45,
  rectHeight: 30,
  svgX: 95,
  svgY: 5,
  polygonPoints: '8,4 25,12 8,20',
  extraRectX: 4,
  extraRectY: 4,
  extraSVGX: 18,
  extraSVGY: 6,
});

export const mlayout6 = createLayoutExport({
  rectFill: '%2387919a',
  strokeColor: '%23BBBFC3',
  rectX: 90,
  rectY: 30,
  rectWidth: 45,
  rectHeight: 30,
  svgX: 90,
  svgY: 30,
  polygonPoints: '10,4 22,12 10,18',
  extraRectX: 4,
  extraRectY: 4,
  extraSVGX: 18,
  extraSVGY: 6,
});

export const mlayout7 = createLayoutExport({
  rectFill: '%2387919a',
  strokeColor: '%23BBBFC3',
  rectX: 3,
  rectY: 5,
  rectWidth: 45,
  rectHeight: 30,
  svgX: 5,
  svgY: 2,
  polygonPoints: '5,0 20,8 5,20',
  extraRectX: 55,
  extraRectY: 5,
  extraSVGX: 70,
  extraSVGY: 8,
});

export const mlayout8 = createLayoutExport({
  rectFill: '%2387919a',
  strokeColor: '%23BBBFC3',
  rectX: 3,
  rectY: 30,
  rectWidth: 45,
  rectHeight: 30,
  svgX: 5,
  svgY: 30,
  polygonPoints: '7,0 20,8 7,15',
  extraRectX: 55,
  extraRectY: 5,
  extraSVGX: 70,
  extraSVGY: 8,
});

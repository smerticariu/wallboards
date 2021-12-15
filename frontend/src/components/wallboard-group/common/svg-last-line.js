import React from 'react';

const SVGLastLine = ({ svgData, ...props }) => {
  return (
    <div className="wb-group__last-line">
      <svg width={svgData.svgSize.x} height={svgData.svgSize.y} className="wb-group__last-line-svg">
        <path className="wb-group__last-line-path" d={`M ${svgData.points[0]} L ${svgData.points.slice(1)}`} />
        <g
          className="wb-group__last-line-arrow"
          transform={`translate(${svgData.arrowTranslate.x},${svgData.arrowTranslate.y}) rotate(${svgData.arrowTranslate.rotate}) scale(10)`}
        >
          <path d="M 0 0 L 1 0.5 L 0 1 L 0.25 0.5 z" />
        </g>
      </svg>
    </div>
  );
};

export default SVGLastLine;

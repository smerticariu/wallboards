export const getWallboardGroupLastSvgLineData = (containerRef, wallboardGroup, steps) => {
  const containerPosition = containerRef.current.getBoundingClientRect();
  const firstStepPosition = document.getElementById(wallboardGroup.steps[0].stepId).getBoundingClientRect();
  const lastStepPosition = document.getElementById(wallboardGroup.steps.slice(-1)[0]?.stepId).getBoundingClientRect();
  const lastElementInRowData = steps.slice(-1)[0].slice(-1)[0];
  const lastElementInRow = document.getElementById(lastElementInRowData?.stepId).getBoundingClientRect();
  const lastElementInRowEndPosition = lastElementInRow.left - containerPosition.left + lastElementInRow.width;
  const firstElementTop = firstStepPosition.top - containerPosition.top;
  const firstElementLeft = firstStepPosition.left - containerPosition.left;
  const lastElementTop = lastStepPosition.top - containerPosition.top;
  const lastElementLeft = lastStepPosition.left - containerPosition.left;
  const svgSize = {
    x: containerPosition.width + 50,
    y: containerPosition.height + 50,
  };
  let points = [];
  let svgEndPoint = [];
  let arrowTranslate;
  if (steps.length % 2 === 0) {
    points.push([lastElementLeft, lastElementTop + lastStepPosition.height / 2]);
    svgEndPoint = [firstElementLeft, firstElementTop + firstStepPosition.height / 2];
    points.push([svgEndPoint[0] - 30, points.slice(-1)[0][1]]);
    points.push([points.slice(-1)[0][0], svgEndPoint[1]]);
    arrowTranslate = {
      x: svgEndPoint[0] - 10,
      y: svgEndPoint[1] - 5,
      rotate: 0,
    };
  } else {
    points.push([lastElementLeft + lastStepPosition.width, lastElementTop + lastStepPosition.height / 2]);
    if (steps.length > 1) {
      const distanceFromLastElementInRow = lastElementInRowData.wallboardId ? 20 : 70;
      points.push([lastElementInRowEndPosition + distanceFromLastElementInRow, lastElementTop + lastStepPosition.height / 2]);
    } else {
      points.push([points.slice(-1)[0][0] + 50, lastElementTop + lastStepPosition.height / 2]);
    }
    svgEndPoint = [firstElementLeft + firstStepPosition.width / 2, firstElementTop + firstStepPosition.height];
    points.push([points.slice(-1)[0][0], svgEndPoint[1] + 50]);
    points.push([svgEndPoint[0], svgEndPoint[1] + 50]);
    arrowTranslate = {
      x: svgEndPoint[0] - 5,
      y: svgEndPoint[1] + 10,
      rotate: 270,
    };
  }
  points.push(svgEndPoint);

  return {
    svgSize,
    points,
    arrowTranslate,
  };
};

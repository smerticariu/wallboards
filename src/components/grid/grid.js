import React from "react";
import { createArrayFromTo } from "src/common/utils/generateArray";

const GridPage = ({ ...props }) => {
  return (
    <div className="c-grid">
      {createArrayFromTo(1, 756).map((number) => (
        <div className="c-grid__cell" key={number} />
      ))}
    </div>
  );
};
export default GridPage;

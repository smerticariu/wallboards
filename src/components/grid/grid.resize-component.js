import { Resizable } from 're-resizable';
import React, { useRef, useState } from 'react';

const ResizeComponent = ({ children, onResize = () => {}, ...props }) => {
  const [minWidth, setMinWidth] = useState('280px');
  const [minHeight, setMinHeight] = useState('');
  const [width, setWidth] = React.useState();
  const [height, setHeight] = React.useState();
  const contentRef = useRef();
  const onCardResizeLocal = (e, direction, ref, d) => {
    if (contentRef.current.offsetHeight !== minHeight) {
      setMinHeight(contentRef.current.offsetHeight);
    }
  };

  return (
    <Resizable
      onResizeStop={(e, direction, ref, d) => {
        setWidth(width + d.width);
        setHeight(height + d.height);
      }}
      style={{ margin: '10px' }}
      size={{ width: width, height: height }}
      onResize={onCardResizeLocal}
      minHeight={minHeight}
      minWidth={minWidth}
      maxWidth={'100%'}
    >
      <div {...props}>
        <div ref={contentRef}>{children}</div>
      </div>
    </Resizable>
  );
};
export default ResizeComponent;

import { Resizable } from 're-resizable';
import React, { useEffect, useRef, useState } from 'react';

const ResizeComponent = ({ width = '', height = '', minWidth = '280px', children, onResize = () => {}, ...props }) => {
  const [minHeightLocal, setMinHeightLocal] = useState('');
  const [cardSize, setCardSize] = useState({ width: width, height: height });
  const contentRef = useRef();
  useEffect(() => {
    setCardSize({ width, height });
  }, [width, height]);
  const onCardResizeLocal = (e, direction, ref, d) => {
    if (contentRef.current.offsetHeight !== minHeightLocal) {
      setMinHeightLocal(contentRef.current.offsetHeight);
    }
    setCardSize({ width: ref.offsetWidth + 'px', height: ref.offsetHeight + 'px' });
  };

  return (
    <Resizable
      onResizeStop={(e, direction, ref, d) => {
        onResize({ width: ref.offsetWidth + 'px', height: ref.offsetHeight + 'px' });
      }}
      style={{ margin: '10px' }}
      size={{ width: cardSize.width, height: cardSize.height }}
      onResize={onCardResizeLocal}
      minHeight={minHeightLocal}
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

import React, { useEffect, useRef } from 'react';
import useResize from 'src/common/hooks/useResize';

const ResizeComponent = ({ children, onResize = () => {}, width = '', height = '', ...props }) => {
  const agentListRef = useRef();
  const agentListBodyRef = useRef();

  const onResizeComponent = (event) => {
    const eWidth = event.detail.width + 'px';
    const eHeight = event.detail.height + 'px';
    const headerandBodyHeight = agentListBodyRef.current.offsetHeight;
    if (headerandBodyHeight > event.detail.height) {
      agentListRef.current.style.height = headerandBodyHeight + 5 + 'px';
      agentListRef.current.style.width = eWidth;
      onResize({ width: width, height: headerandBodyHeight + 5 + 'px' });
      return;
    }
    agentListRef.current.style.width = eWidth;
    agentListRef.current.style.height = eHeight;
    onResize({ width: eWidth, height: eHeight });
  };
  useEffect(() => {
    if (agentListRef.current) {
      agentListRef.current.style.height = height;
      agentListRef.current.style.width = width;
    }
    // eslint-disable-next-line
  }, [agentListRef]);
  useResize(agentListRef, onResizeComponent);
  return (
    <div ref={agentListRef} {...props}>
      <div ref={agentListBodyRef}>{children}</div>
    </div>
  );
};
export default ResizeComponent;

import React, { useRef } from 'react';
import useResize from 'src/common/hooks/useResize';

const ResizeComponent = ({ children, ...props }) => {
  const agentListRef = useRef();
  const agentListBodyRef = useRef();
  const onResize = (event) => {
    const width = event.detail.width + 'px';
    const height = event.detail.height + 'px';
    const headerandBodyHeight = agentListBodyRef.current.offsetHeight;
    if (headerandBodyHeight > event.detail.height) {
      agentListRef.current.style.height = headerandBodyHeight + 5 + 'px';
      agentListRef.current.style.width = width;
      return;
    }
    agentListRef.current.style.width = width;
    agentListRef.current.style.height = height;
  };
  useResize(agentListRef, onResize);
  return (
    <div ref={agentListRef} {...props}>
      <div ref={agentListBodyRef}>{children}</div>
    </div>
  );
};
export default ResizeComponent;

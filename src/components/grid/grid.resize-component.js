import React, { useRef, useState } from 'react';
import useResize from 'src/common/hooks/useResize';

const ResizeComponent = ({ children, header, ...props }) => {
  const agentListRef = useRef();
  const agentListBodyRef = useRef();
  const agentListHeaderRef = useRef();
  const [size, setSize] = useState({ width: '50%', height: 'max-content' });
  const onResize = (event) => {
    const width = event.detail.width + 'px';
    const height = event.detail.height + 'px';
    const headerandBodyHeight = agentListBodyRef.current.offsetHeight + agentListHeaderRef.current.offsetHeight;
    if (headerandBodyHeight > event.detail.height) {
      //   setSize({ width: width, height: headerandBodyHeight + 5 + 'px' });
      agentListRef.current.style.height = headerandBodyHeight + 5 + 'px';
      agentListRef.current.style.width = width;
      return;
    }
    if (width !== size.width || height !== size.height) {
      //   setSize({ width: width, height: height });
      agentListRef.current.style.width = width;
      agentListRef.current.style.height = height;
    }
  };
  useResize(agentListRef, onResize);
  return (
    <div ref={agentListRef} {...props}>
      <div ref={agentListHeaderRef}>{header}</div>
      <div ref={agentListBodyRef}>{children}</div>
    </div>
  );
};
export default ResizeComponent;

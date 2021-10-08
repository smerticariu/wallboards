import { useEffect } from 'react';

const useResize = (ref, handler) => {
  useEffect(() => {
    const element = ref.current;
    element.addEventListener('resize', (event) => handler(event));

    function checkResize(mutations) {
      const el = mutations[0].target;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const isChange = mutations
        .map((m) => `${m.oldValue}`)
        .some((prev) => prev.indexOf(`width: ${w}px`) === -1 || prev.indexOf(`height: ${h}px`) === -1);

      if (!isChange) {
        return;
      }
      const event = new CustomEvent('resize', { detail: { width: w, height: h } });
      el.dispatchEvent(event);
    }
    const observer = new MutationObserver(checkResize);
    observer.observe(element, { attributes: true, attributeOldValue: true, attributeFilter: ['style'] });
  }, [ref, handler]);
};

export default useResize;

import React, { ***REMOVED***, useCallback, useEffect, useRef, useState } from "react";

const ***REMOVED*** = ({ children, onWrapChange, className }) => {
  const containerRef: ***REMOVED***<any> = useRef(null);
  const [wrapCount, setWrapCount] = useState(0);

  const makeFlexWrap = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("display", "flex", "important");
      if (wrapCount > 0) {
        containerRef.current.style.setProperty(
          "flex-wrap",
          "wrap",
          "important"
        );
      } else {
        containerRef.current.style.setProperty(
          "flex-wrap",
          "nowrap",
          "important"
        );
      }
    }
  }, [wrapCount]);

  const checkWrap = useCallback(() => {
    const container = containerRef.current;
    let count = 0;
    if (container && container.children.length > 1) {
      const firstTop = container.children[0].getBoundingClientRect().top;
      Array.from(container.children).forEach((child, index) => {
        if (index > 0 && (child as Element).getBoundingClientRect().top > firstTop) {
          count++;
        }
      });
    }

    if (count !== wrapCount) {
      setWrapCount(count);
    }
  }, [wrapCount]);

  useEffect(() => {
    checkWrap();
    window.***REMOVED***("resize", checkWrap);
    return () => window.***REMOVED***("resize", checkWrap);
  }, [checkWrap]);

  useEffect(() => {
    if (onWrapChange) {
      onWrapChange(wrapCount);
    }
  }, [wrapCount, onWrapChange]);

  useEffect(() => {
    makeFlexWrap()
  }, [makeFlexWrap]);

  return (
    <div ref={containerRef} className={className}>
      {makeFlexWrap()}
      {children}
    </div>
  );
};
export default ***REMOVED***;
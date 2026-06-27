import { useRef, useState } from "react";

export function useDragScroll() {
  const ref = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    if (!ref.current) return;
    setIsDown(true);
    ref.current.classList.add("dragging");
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
    if (ref.current) {
      ref.current.classList.remove("dragging");
    }
  };

  const onMouseUp = () => {
    setIsDown(false);
    if (ref.current) {
      ref.current.classList.remove("dragging");
    }
  };

  const onMouseMove = (e) => {
    if (!isDown || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return {
    ref,
    props: {
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
      style: {
        cursor: isDown ? "grabbing" : "grab",
        userSelect: "none"
      }
    }
  };
}

// CustomCursor.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorOuterRef = useRef(null);

  useEffect(() => {
    const cursorOuter = cursorOuterRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      // Outer ring - follows with smooth delay
      gsap.to(cursorOuter, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursorOuter, {
        opacity: 1,
        scale: 2,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorOuter, {
        opacity: 0,
        duration: 0.3,
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursorOuter, {
        scale: 0.7,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursorOuter, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
    };

    // Detect hoverable elements (including text)
    const handleElementHover = () => {
      const hoverTargets = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover], label'
      );

      hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          // Change opacity and increase blur
          gsap.to(cursorOuter, {
            opacity: 0.5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(cursorOuter, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    handleElementHover();

    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer ring - smooth follower */}
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "50px",
          height: "50px",
          border: "1.7px solid rgba(61, 61, 61, 0.6)",
          borderRadius: "50%",
          backgroundColor: "transparent",
          backdropFilter: "blur(6px)",
          transition: "border-color 0.3s ease",
        }}
      />
    </>
  );
}

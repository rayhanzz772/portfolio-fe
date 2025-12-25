// CustomCursor.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const cursorTrailRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorOuter = cursorOuterRef.current;
    const cursorTrail = cursorTrailRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      // Inner cursor - follows immediately
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Outer ring - follows with smooth delay
      gsap.to(cursorOuter, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power3.out",
      });

      // Trail effect - follows with more delay
      gsap.to(cursorTrail, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, cursorOuter, cursorTrail], {
        opacity: 1,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, cursorOuter, cursorTrail], {
        opacity: 0,
        duration: 0.3,
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(cursorOuter, {
        scale: 0.7,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.15,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(cursorOuter, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
    };

    // Detect hoverable elements
    const handleElementHover = () => {
      const hoverTargets = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );

      hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(cursor, {
            scale: 1.5,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(cursorOuter, {
            scale: 1.8,
            opacity: 0.5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(cursorOuter, {
            scale: 1,
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
      {/* Trail effect - outermost blur */}
      <div
        ref={cursorTrailRef}
        className="fixed top-0 left-0 z-[9996] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "80px",
          height: "80px",
          // background:
          //   "radial-gradient(circle, rgba(0, 0, 0, 0.85) 0%, transparent 20%)",
          // borderRadius: "50%",
          filter: "blur(10px)",
        }}
      />

      {/* Outer ring - smooth follower */}
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "50px",
          height: "50px",
          border: "1.7px solid rgba(47, 47, 47, 0.6)",
          borderRadius: "50%",
          backgroundColor: "transparent",
          backdropFilter: "blur(4px)",
          transition: "border-color 0.3s ease",
        }}
      />
    </>
  );
}

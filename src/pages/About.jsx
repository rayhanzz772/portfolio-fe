import React, { useRef, useState } from "react";
import TextReveal from "../components/TextReveal";
import { motion } from "framer-motion";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const About = () => {
  const containerRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  // Trigger transition only when fully in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.96, // 100% of element must be visible
    triggerOnce: false,
  });

  // Combine refs
  const setRefs = (el) => {
    containerRef.current = el;
    inViewRef(el);
  };

  // Background transitions from black to white when fully in view
  const backgroundColor = inView ? "#ffffff" : "#0e0e0e";
  const textColor = inView ? "#0e0e0e" : "#ffffff";
  const grayTextColor = inView ? "#6b7280" : "#9ca3af";

  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/portfolio");
    }, 600);
  };

  return (
    <motion.section
      ref={setRefs}
      className="relative z-10 min-h-screen flex items-center justify-center"
      style={{
        backgroundColor,
        color: textColor,
        transition: "background-color 0.8s ease, color 0.8s ease",
      }}
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center text-center">
        <main
          className="flex flex-col items-center justify-center w-full"
          style={{ fontFamily: "Mori, Arial, sans-serif" }}
        >
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="mb-6 sm:mb-8"
          >
            <h2
              className="text-sm lg:text-lg tracking-widest uppercase transition-colors duration-800"
              style={{ color: grayTextColor }}
            >
              <span
                className="inline-block w-2 h-2 mr-3 transition-colors duration-800"
                style={{ backgroundColor: textColor }}
              ></span>
              About Me
            </h2>
          </motion.div>

          {/* Main Text */}
          <TextReveal className="max-w-4xl">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-center transition-colors duration-800"
              style={{ color: textColor }}
            >
              With over a year of <span className="font-bold">experience</span>{" "}
              building scalable backend systems, I{" "}
              <span className="font-bold">focus on</span> designing robust APIs,
              secure data flows, and reliable{" "}
              <span className="font-bold">server-side architectures</span>.
            </h1>
          </TextReveal>

          {/* Background Text */}
          <span
            className="hidden lg:block absolute text-[15vw] xl:text-[20vw] font-extrabold opacity-10 select-none pointer-events-none -z-10 transition-colors duration-800"
            style={{ color: inView ? "#3b3d41ff" : "#abababff" }}
          >
            Experiences.
          </span>

          {/* Button */}
          <motion.button
            onClick={handleTransition}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: false }}
            className="group flex flex-row items-center mt-12 sm:mt-16 md:mt-24 justify-center gap-2 text-base sm:text-lg lg:text-xl transition-colors duration-800"
            style={{ color: grayTextColor }}
          >
            <span
              className="group-hover:opacity-100"
              style={{ color: grayTextColor }}
            >
              Explore My Projects
            </span>
            <ArrowDownIcon
              className="w-5 h-5 md:w-6 md:h-6 animate-bounce"
              aria-hidden="true"
            />
          </motion.button>
        </main>
      </div>

      {isExiting && (
        <motion.div
          className="fixed inset-0 bg-black z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.section>
  );
};

export default About;

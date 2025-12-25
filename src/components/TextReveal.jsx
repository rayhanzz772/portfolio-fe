import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Komponen TextReveal
const TextReveal = ({ children, className }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.8,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  // Fungsi bantu untuk render isi jika children adalah string
  const renderWords = (text) => {
    return text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        variants={childVariants}
        style={{ display: "inline-block", marginRight: "0.25em" }}
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <motion.div
      className={className}
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {typeof children === "string" ? (
        renderWords(children)
      ) : (
        <motion.span
          variants={childVariants}
          style={{ display: "inline-block" }}
        >
          {children}
        </motion.span>
      )}
    </motion.div>
  );
};

export default TextReveal;

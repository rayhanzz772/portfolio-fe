import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import iconMap from "../components/IconSection";

const saya = "/photos/foto.jpeg";

// Skill categories data
const skillCategories = [
  {
    id: "01",
    title: "<Skills />",
    description:
      "These are the programming languages and frameworks I use to build backend-focused systems.",
    skills: [
      { name: "Express.js", icon: "SiExpress" },
      { name: "Golang", icon: "SiGo" },
      { name: "React", icon: "SiReact" },
      { name: "Laravel", icon: "SiLaravel" },
    ],
  },
  {
    id: "02",
    title: "Tools",
    description: "Development tools and infrastructure I use daily.",
    skills: [
      { name: "GitHub", icon: "SiGithub" },
      { name: "Postman", icon: "SiPostman" },
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "Redis", icon: "SiRedis" },
      { name: "Docker", icon: "SiDocker" },
    ],
  },
  {
    id: "03",
    title: "{Design}",
    description: "Design tools I use to craft clean and functional interfaces.",
    skills: [
      { name: "Figma", icon: "SiFigma" },
      { name: "CorelDRAW", icon: "SiCoreldraw" },
      { name: "Canva", icon: "SiCanva" },
    ],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.65,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1, // anak keluar dari belakang ke depan
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const roleVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const arrowVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.8,
    },
  },
};

// Skill section animation variants
const categoryVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.08,
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    x: -40,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const skillItemVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Skill Item Component
const SkillItem = ({ name, icon }) => {
  // Get the icon component from iconMap
  const IconComponent = iconMap[icon];

  return (
    <motion.div
      variants={skillItemVariants}
      className="group flex items-center justify-between py-4 border-b border-gray-700/50 hover:border-gray-500 transition-all duration-300 hover:pl-2"
    >
      <motion.span
        className="text-lg md:text-xl font-mori text-gray-300 group-hover:text-white transition-colors duration-300"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        {name}
      </motion.span>
      <motion.span
        className="text-xl md:text-2xl text-gray-400 group-hover:text-white transition-all duration-300"
        whileHover={{ scale: 1.3, rotate: 10 }}
        transition={{ duration: 0.2 }}
      >
        {IconComponent ? <IconComponent /> : icon}
      </motion.span>
    </motion.div>
  );
};

// Skill Category Component
const SkillCategory = ({ category }) => {
  return (
    <motion.div
      variants={categoryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      className="mb-16"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left side with title animation */}
        <motion.div className="lg:w-2/5" variants={titleVariants}>
          <motion.span
            className="text-gray-500 text-sm font-mori inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: false }}
          >
            {category.id}
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-mono text-white mt-2 mb-4"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false }}
          >
            {category.title}
          </motion.h2>
          <motion.p
            className="text-gray-400 font-mori text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false }}
          >
            {category.description}
          </motion.p>
        </motion.div>

        {/* Right side with staggered skill items */}
        <motion.div
          className="lg:w-3/5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-30px" }}
        >
          {category.skills.map((skill) => (
            <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const containerRef = useRef(null);
  const outroRef = useRef(null);

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  // Scroll-based exit animation for outro
  const { scrollYProgress } = useScroll({
    target: outroRef,
    offset: ["start end", "end start"],
  });

  // Combine refs
  const setRefs = (el) => {
    containerRef.current = el;
    inViewRef(el);
  };

  return (
    <motion.section
      ref={setRefs}
      className="relative z-10 bg-gradient-to-b from-[#0e0e0e] via-[#0e0e0e] to-[#0e0e0e]"
    >
      {/* Intro Section - Full Height Centered */}
      <div className="pt-20 flex items-center justify-center">
        <motion.div
          className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
        >
          {/* Main Text */}
          <motion.div variants={textVariants} className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl xl:text-1xl font-mori font-light text-gray-400 leading-tight italic">
              <span className="text-gray-400 italic">
                Engineering backend systems
              </span>
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-mori font-light text-gray-400 italic leading-tight mt-2">
              that drive business
              <span className="text-white font-bold animated-text">
                {" "}
                impact.
              </span>
            </h1>
          </motion.div>

          {/* Roles */}
          <motion.div
            variants={roleVariants}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm md:text-base text-gray-400 font-mori"
          >
            <span className="hover:text-white transition-colors duration-300">
              Backend Engineer
            </span>
            <span className="text-gray-600">|</span>
            <span className="hover:text-white transition-colors duration-300">
              Full Stack Developer
            </span>
            <span className="text-gray-600">|</span>
            <span className="hover:text-white transition-colors duration-300">
              Tech Enthusiast
            </span>
          </motion.div>

          {/* Scroll Arrow */}
          <motion.div variants={arrowVariants} className="mt-16 md:mt-24">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 text-gray-500"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Skills Section */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-10 relative">
        {/* Fade in gradient overlay at top */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0e0e0e] to-transparent pointer-events-none" />

        {skillCategories.map((category, index) => (
          <SkillCategory key={category.id} category={category} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default Gallery;

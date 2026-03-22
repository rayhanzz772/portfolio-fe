import React, { useRef, useState, useEffect } from "react";
import TextReveal from "../components/TextReveal";
import { motion } from "framer-motion";
import { LayoutGroup } from "framer-motion";
import saya from "/photos/saya.jpg";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const About = () => {
  const containerRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(0);

  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/portfolio"); // halaman tujuan
    }, 600); // delay sesuai durasi animasi
  };

  useEffect(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: false, amount: 0.5 }}
      className="relative z-10 min-h-screen bg-[#ffffff] text-[#0e0e0e] transition-colors duration-500"
    >
      <article className="w-full snap">
        <LayoutGroup>
          <div className="min-h-screen w-full mx-auto px-2 flex py-20 lg:pb-10 lg:pt-20">
            <main
              className="flex flex-col py-6 md:py-10 w-full h-full"
              style={{ fontFamily: "Mori, Arial, sans-serif" }}
            >
              <div className="max-w-7xl w-full mx-auto px-4 flex flex-col">
                <h1 className="text-sm lg:text-2xl">
                  <span className="bg-black p-2 w-2 aspect-square inline-block mr-2"></span>{" "}
                  About Me
                </h1>

                {/* Isi */}

                <div className="grid grid-cols-1 md:grid-cols-3 xl:gap-16 gap-6 items-center py-6 lg:py-16">
                  {/* Gambar: 1/3 */}
                  <TextReveal className="md:col-span-1">
                    <img
                      src={saya}
                      alt="Rayhan's Picture"
                      className="w-full h-auto object-cover rounded-lg md:rounded-none"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/600x400/e2e8f0/4a5568?text=Gagal+Memuat+Gambar";
                      }}
                    />
                  </TextReveal>

                  {/* Teks: 2/3 */}
                  <div className="md:col-span-2 flex flex-col justify-center realtive">
                    <TextReveal>
                      <h1 className="text-justify md:text-left text-[1.3rem] sm:text-[xl] md:text-[1.6rem] xl:text-[2.6rem] lg:text-[2rem] md:font-bold text-gray-800 leading-tight">
                        With over a year of experience developing scalable web
                        and mobile applications, I combine my passion for
                        technology with the discipline I’ve built through
                        running and staying active.
                      </h1>
                    </TextReveal>
                  </div>
                  <span className="hidden lg:block absolute text-[15vw] xl:text-[20vw] font-extrabold text-gray-300 opacity-20 select-none pointer-events-none -z-10 bottom-0 left-0">
                    Experiences.
                  </span>
                </div>

                {/* Akhir Isi */}

                <button
                  onClick={handleTransition}
                  className="group flex flex-row items-center mt-20 justify-center gap-2 lg:text-2xl"
                >
                  <span className="text-gray-400 group-hover:text-black transition-colors">
                    Explore My Projects
                  </span>
                  <ArrowDownIcon
                    className="w-6 h-6 text-gray-400 group-hover:text-black animate-bounce transition-colors"
                    aria-hidden="true"
                  />
                  <span className="hidden lg:hidden absolute bg-black select-none pointer-events-none -z-9">
                    Experiences.
                  </span>
                </button>
              </div>
            </main>
          </div>
        </LayoutGroup>
      </article>
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

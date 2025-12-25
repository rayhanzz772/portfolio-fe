import React, { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Hero() {
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();

  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/portfolio"); // halaman tujuan
    }, 600); // delay sesuai durasi animasi
  };

  // Parallax transform
  const yParallax = useTransform(scrollY, [10, 800], [0, 200]);

  // Intersection observer
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false, // supaya bisa toggle warnanya saat scroll
    threshold: 0.4,
  });

  // Background color logic — ditempatkan SETELAH inView terdefinisi
  const backgroundColor = inView ? "#fffbee" : "#0e0e0e";
  const textColor = inView ? "#0e0e0e" : "#0e0e0e";

  // Gabungkan kedua ref
  const setRefs = (el) => {
    sectionRef.current = el;
    inViewRef(el);
  };

  return (
    <>
      <motion.div
        style={{
          position: "sticky",
          backgroundColor,
          color: textColor,
          transition: "background-color 1s ease, color 1s ease",
        }}
        className="sticky top-0 z-0 sm:px-4 font-helvetica w-full flex flex-col justify-start items-start"
      >
        <Header theme="light" />

        <main
          ref={setRefs}
          className="relative min-h-screen w-full flex flex-col justify-start items-start pt-28 z-0"
        >
          {/* Section dengan efek parallax */}
          <motion.div
            style={{ y: yParallax }}
            className="z-0 flex flex-col justify-start py-2 md:py-10 md:pt-15 md:px-6 w-full"
          >
            <div className="flex flex-col justify-start items-start gap-2 lg:px-5 px-5">
              {inView && (
                <>
                  <h1
                    className="pb-0 font-medium text-black 
                text-[2rem] 
                sm:text-[3.5rem] 
                md:text-[4rem] 
                lg:text-[5rem] 
                xl:text-[6.5rem] leading-[0.99] md:leading-[0.95] max-w-[750px] md:max-w-[1300px]"
                  >
                    Hello, I'm Rayhan, a
                  </h1>
                  <h1
                    className="pb-0 font-medium text-black 
                 text-[3.5rem] 
                 sm:text-[3.5rem] 
                 md:text-[4rem] 
                 lg:text-[5rem] 
                 xl:text-[6.5rem] leading-[0.99] md:leading-[0.95] max-w-[750px] md:max-w-[1300px]"
                  >
                    Backend Developer.
                  </h1>

                  <button onClick={handleTransition}>
                    <div className="mt-2 inline-block text-lg font-medium relative group">
                      <span className="text-black transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                        See Projects →
                      </span>
                      <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </motion.div>

          {/* Section Contact fix di bawah */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-6 mt-auto w-full md:px-10 px-5 pb-24 lg:pb-16">
            {/* Kolom kiri tetap */}
            <h1 className="text-black font-medium text-lg md:text-2xl">
              More Information:
            </h1>

            {/* Kolom kanan (tumpuk di mobile, sejajar di desktop) */}
            <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-6 w-full">
              <div>
                <p className="font-semibold">Availability:</p>
                <p>Anytime</p>
              </div>

              <div>
                <p className="font-semibold">Email:</p>
                <p>rayhanzz772@gmail.com</p>
              </div>

              <div>
                <p className="font-semibold">Current location:</p>
                <p>Semarang, Indonesia</p>
              </div>

              <div>
                <p className="font-semibold">Instagram:</p>
                <p>@rayhan.maul</p>
              </div>
            </div>
          </div>
        </main>
        {isExiting && (
          <motion.div
            className="fixed inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </motion.div>
    </>
  );
}

export default Hero;

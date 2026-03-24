import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import About from './About';
import Hero from './Hero';
import Gallery from './Gallery';
import { motion } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';
import LoadingScreen from '../components/LoadingScreen';
import CurtainOpening from '../components/CurtainOpening'; // NEW
import { useLenis } from '../hooks/useLenis';

const TOTAL_LOADING_TIME = 3000;
const FADE_OUT_DURATION = 200;

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isCurtainDone, setIsCurtainDone] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useLenis();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsLoading(false);
      }, FADE_OUT_DURATION);
    }, TOTAL_LOADING_TIME);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoading && isCurtainDone) {
      setIsContentVisible(true);
    }
  }, [isLoading, isCurtainDone]);

  if (isLoading) {
    return <LoadingScreen isExiting={isExiting} />;
  }

  return (
    <>
      <Helmet>
        <title>Rayhan - Backend Developer | Portfolio</title>
        <meta name="description" content="I'm Rayhan, a Backend Developer who loves turning ideas into code. I build web and mobile apps that solve real-world problems and enhance user experiences." />
        <link rel="canonical" href="https://rayhanprojects.site/" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Rayhan",
            "url": "https://rayhanprojects.site",
            "jobTitle": "Backend Developer",
            "description": "Backend Developer specializing in Node.js, Express, PostgreSQL, and scalable web architectures.",
            "knowsAbout": [
              "Backend Development",
              "Node.js",
              "Express.js",
              "PostgreSQL",
              "React.js",
              "RESTful APIs",
              "Machine Learning",
              "System Architecture"
            ],
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Dicoding Academy"
            },
            "sameAs": [
              "https://github.com/rayhanzz772",
              "https://www.linkedin.com/in/rayhan-izzudien/"
            ]
          }
        `}</script>
      </Helmet>
      <CustomCursor />
      {!isCurtainDone && <CurtainOpening onFinish={() => setIsCurtainDone(true)} />}
      <main className="relative bg-black overflow-x-hidden">
        <Hero />
        <Gallery />
        <About />
      </main>
    </>
  );
}

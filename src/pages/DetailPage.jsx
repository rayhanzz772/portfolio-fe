import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Link as LinkIcon, ArrowLeft as ArrowLeftIcon } from "lucide-react";
import { motion } from "framer-motion";
import CustomAnimatedSeparator from "../components/CustomAnimatedSeparator";
import { useLenis } from "../hooks/useLenis";

// Slug
import dataMap from "../data/allData"; // sesuaikan path

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const DetailPage = () => {
  useLenis();
  // Cek semua kategori
  const { slug } = useParams();
  const allItems = Object.values(dataMap).flat();
  const containerRef = useRef(null);

  const content = allItems.find((item) => item.slug === slug);
  if (!content) return <p>Content not found</p>;

  let labels = ["Date", "Role", "Tech"]; // default untuk project

  const category = content.category?.toLowerCase();

  if (category === "certification") {
    labels = ["Date", "Tech", "By"];
  } else if (category === "award") {
    labels = ["Date", "Type", "By"];
  }

  const pageTitle = `${content.name} | Rayhan Portfolio`;
  const pageDescription = content.description?.slice(0, 160) + "...";
  const categoryPath = category === "certification" ? "certifications" : category === "award" ? "awards" : "projects";
  const pageUrl = `https://rayhanprojects.site/${categoryPath}/${slug}`;

  return (
    <>
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="article" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": category === 'certification' ? 'EducationalOccupationalCredential' : category === 'award' ? 'CreativeWork' : 'SoftwareSourceCode',
          "name": content.name,
          "description": content.description,
          "url": pageUrl,
          "dateCreated": content.date,
          "author": {
            "@type": "Person",
            "name": "Rayhan"
          }
        })}
      </script>
    </Helmet>
    <motion.section
      ref={containerRef}
      className="relative z-10 bg-white text-black font-mori flex items-start justify-end"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Tombol Back */}

      <div className="fixed left-5 md:ml-10 top-4 md:top-1/2 md:-translate-y-1/2 z-50">
        <Link
          to="/portfolio"
          className="bg-black text-white w-14 h-14 flex items-center justify-center rounded-full shadow-md hover:bg-gray-800 transition text-xl"
          aria-label="Back"
        >
          <ArrowLeftIcon size={24} />
        </Link>
      </div>

      {content.link && (
        <div className="fixed right-5 md:mr-10 top-4 md:top-1/2 md:-translate-y-1/2 z-50">
          <a
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white w-14 h-14 flex items-center justify-center rounded-full shadow-md hover:bg-gray-800 transition text-xl"
            aria-label="Visit Link"
          >
            <LinkIcon size={24} />
          </a>
        </div>
      )}

      <motion.article
        className="w-[98vw] max-w-screen-xl mx-auto py-20 flex flex-col items-center
      variants={staggerContainer}
      "
      >
        {/* Judul */}
        <motion.div variants={fadeInUp} className="w-11/12 md:w-9/12 text-left">
          <h1 className="text-4xl font-semibold">{content.name}</h1>
        </motion.div>

        <div className="w-11/12 md:w-9/12">
          <CustomAnimatedSeparator mb={8} h={1} mx={0} />
        </div>

        <motion.div
          variants={fadeInUp}
          className="grid gap-6 w-11/12 md:w-9/12 grid-cols-1 md:grid-cols-6 text-lg"
        >
          {/* Kiri: Detail Info */}
          <div className="md:col-span-2 flex flex-col gap-2">
            {labels.map((label) => (
              <div className="flex items-center" key={label}>
                <span className="bg-black text-white px-4 py-1 rounded-full text-l md:text-xl mb-2 mr-4 min-w-[90px] text-center">
                  {label}
                </span>
                <p className="text-l md:text-xl font-semibold">
                  {content[label.toLowerCase()]}
                </p>
              </div>
            ))}
          </div>
          {/* Kanan: Deskripsi */}
          <div className="md:col-span-4 text-sm md:text-xl font-normal md:font-thin">
            <p>{content.description}</p>
          </div>
        </motion.div>

        <div className="w-11/12 md:w-9/12">
          <CustomAnimatedSeparator my={8} h={1} mx={0} />
        </div>

        <motion.div
          variants={fadeInUp}
          className="w-11/12 md:w-9/12 text-left space-y-10"
        >
          <div className="w-11/12 md:w-9/12 items-start flex gap-3">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <title>asterisk</title>
              <path d="M1.728 20.992q-0.416 1.6 0.416 3.008 0.832 1.44 2.432 1.856t3.040-0.384q0.832-0.48 2.56-1.92t3.168-2.912q-0.608 2.016-0.96 4.192t-0.384 3.168q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848q0-0.96-0.384-3.168t-0.928-4.192q1.44 1.504 3.168 2.944t2.528 1.888q1.44 0.832 3.040 0.384t2.432-1.856 0.416-3.008-1.888-2.464q-0.864-0.48-2.944-1.248t-4.064-1.28q2.016-0.512 4.096-1.28t2.912-1.248q1.44-0.832 1.888-2.432t-0.416-3.040q-0.832-1.44-2.432-1.856t-3.040 0.384q-0.832 0.512-2.528 1.92t-3.168 2.912q0.576-1.984 0.928-4.192t0.384-3.168q0-1.632-1.184-2.816t-2.816-1.184-2.816 1.184-1.184 2.816q0 0.992 0.384 3.168t0.96 4.192q-1.44-1.472-3.168-2.88t-2.56-1.952q-1.44-0.8-3.040-0.384t-2.432 1.856-0.416 3.040 1.888 2.432q0.832 0.48 2.912 1.248t4.128 1.28q-2.016 0.512-4.096 1.28t-2.944 1.248q-1.44 0.832-1.888 2.464z" />
            </svg>
            <h1 className="text-2xl font-semibold">Design Preview</h1>
          </div>
          <div className="flex justify-center items-center gap-6 flex-col">
            {content.designPreview.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${content.name} - ${content.type} Project Preview ${i + 1}`}
                loading="lazy"
                className={`mx-auto ${
                  [
                    "Android Developer",
                    "UI/UX Designer",
                    "Paper",
                    "UI/UX Competition",
                    "BNSP",
                  ].includes(content.type)
                    ? "md:w-4/6"
                    : "w-full"
                }`}
              />
            ))}
          </div>

          <div className="w-11/12 md:w-9/12 items-start flex gap-3">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <title>asterisk</title>
              <path d="M1.728 20.992q-0.416 1.6 0.416 3.008 0.832 1.44 2.432 1.856t3.040-0.384q0.832-0.48 2.56-1.92t3.168-2.912q-0.608 2.016-0.96 4.192t-0.384 3.168q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848q0-0.96-0.384-3.168t-0.928-4.192q1.44 1.504 3.168 2.944t2.528 1.888q1.44 0.832 3.040 0.384t2.432-1.856 0.416-3.008-1.888-2.464q-0.864-0.48-2.944-1.248t-4.064-1.28q2.016-0.512 4.096-1.28t2.912-1.248q1.44-0.832 1.888-2.432t-0.416-3.040q-0.832-1.44-2.432-1.856t-3.040 0.384q-0.832 0.512-2.528 1.92t-3.168 2.912q0.576-1.984 0.928-4.192t0.384-3.168q0-1.632-1.184-2.816t-2.816-1.184-2.816 1.184-1.184 2.816q0 0.992 0.384 3.168t0.96 4.192q-1.44-1.472-3.168-2.88t-2.56-1.952q-1.44-0.8-3.040-0.384t-2.432 1.856-0.416 3.040 1.888 2.432q0.832 0.48 2.912 1.248t4.128 1.28q-2.016 0.512-4.096 1.28t-2.944 1.248q-1.44 0.832-1.888 2.464z" />
            </svg>
            <h1 className="text-2xl font-semibold">Work Preview</h1>
          </div>
          <div className="flex justify-center items-center gap-8 flex-col">
            {content.workImages && content.workImages.length > 0 ? (
              <div className="flex justify-center items-center gap-8 flex-col">
                {content.workImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${content.name} - ${content.type} Deep Dive Screenshot ${i + 1}`}
                    loading="lazy"
                    className="shadow-2xl"
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center gap-8 flex-col">
                <h1 className="text-xl text-black text-center">
                  Sorry, Work Preview currently not available.
                </h1>
              </div>
            )}
          </div>
        </motion.div>
      </motion.article>
    </motion.section>
    </>
  );
};

export default DetailPage;

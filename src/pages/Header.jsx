import React, { useEffect, useState } from "react";
import NavbarButton from '../components/NavbarButton'; // section baru
import { Link } from 'react-router-dom';
import logo from '/logo.png';

function Header({ theme = "dark" }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scroll ke bawah
        setIsVisible(false);
      } else {
        // Scroll ke atas
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinkClass = `text-xs md:text-sm uppercase tracking-[0.18em] transition-opacity duration-300 hover:opacity-70 relative group ${
    theme === "dark" ? "text-white" : "text-black"
  }`;

return (
  <header
    className={`fixed left-0 right-0 z-50 transition-transform duration-300 ${
      isVisible ? "translate-y-10" : "-translate-y-full"
    }`}
  >
    <div className="mx-auto px-4 py-2 sm:px-6 md:px-16">
      <div className="relative md:hidden">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="logo" className="h-6" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em] transition-opacity duration-300 hover:opacity-70 ${
              theme === "dark"
                ? "border-white/30 text-white"
                : "border-black/20 text-black"
            }`}
          >
            Menu
          </button>
        </div>

        {isMenuOpen && (
          <div
            className={`absolute right-0 top-12 z-50 min-w-[220px] rounded-2xl border p-4 shadow-lg backdrop-blur-sm ${
              theme === "dark"
                ? "border-white/20 bg-black/90 text-white"
                : "border-black/10 bg-white/95 text-black"
            }`}
          >
            <div className="flex flex-col items-start gap-3">
              <Link
                to="/coding-activity"
                onClick={() => setIsMenuOpen(false)}
                className={navLinkClass}
              >
                <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                  Statistic
                </span>
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] w-0 transition-all duration-300 ease-in-out group-hover:w-full ${
                    theme === "dark" ? "bg-white" : "bg-black"
                  }`}
                ></span>
              </Link>

              <div
                className={`h-px w-full ${
                  theme === "dark" ? "bg-white/15" : "bg-black/10"
                }`}
              />

              <Link
                to="/portfolio"
                onClick={() => setIsMenuOpen(false)}
                className={navLinkClass}
              >
                <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                  Projects
                </span>
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] w-0 transition-all duration-300 ease-in-out group-hover:w-full ${
                    theme === "dark" ? "bg-white" : "bg-black"
                  }`}
                ></span>
              </Link>

              <div
                className={`h-px w-full ${
                  theme === "dark" ? "bg-white/15" : "bg-black/10"
                }`}
              />

              <div className="mt-1">
                <NavbarButton $theme={theme} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-[auto_1fr_auto] md:items-center">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="h-7"
            />
          </Link>
        </div>

        <div className="flex items-center justify-evenly gap-8">
          <Link
            to="/coding-activity"
            className={navLinkClass}
          >
            <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">
              Statistic
            </span>
            <span
              className={`absolute left-0 -bottom-0.5 h-[2px] w-0 transition-all duration-300 ease-in-out group-hover:w-full ${
                theme === "dark" ? "bg-white" : "bg-black"
              }`}
            ></span>
          </Link>

          <Link
            to="/portfolio"
            className={navLinkClass}
          >
            <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">
              Projects
            </span>
            <span
              className={`absolute left-0 -bottom-0.5 h-[2px] w-0 transition-all duration-300 ease-in-out group-hover:w-full ${
                theme === "dark" ? "bg-white" : "bg-black"
              }`}
            ></span>
          </Link>
        </div>

        <div className="flex items-center justify-end">
          <NavbarButton $theme={theme} />
        </div>
      </div>
    </div>
  </header>
);

}

export default Header;
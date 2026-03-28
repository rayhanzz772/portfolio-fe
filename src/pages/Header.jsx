import React, { useEffect, useState } from "react";
import NavbarButton from '../components/NavbarButton'; // section baru
import { Link } from 'react-router-dom';
import logo from '/logo.png';

function Header({ theme = "dark" }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

return (
  <header
    className={`fixed left-0 right-0 z-50 transition-transform duration-300 ${
      isVisible ? "translate-y-10" : "-translate-y-full"
    }`}
  >
    <div className="px-6 sm:px-6 md:px-16 mx-auto py-2">
      <div className="grid grid-cols-[auto_1fr_auto] items-center">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="h-7"
            />
          </Link>
        </div>

        <div className="flex items-center justify-evenly gap-5 md:gap-8">
          <Link
            to="/coding-activity"
            className={`text-xs md:text-sm uppercase tracking-[0.18em] transition-opacity duration-300 hover:opacity-70 relative group ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
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
            className={`text-xs md:text-sm uppercase tracking-[0.18em] transition-opacity duration-300 hover:opacity-70 relative group ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
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
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ✅ NEW
import DynamicModalForm from "./DynamicModalForm";

// Inline Types
interface NavLink {
  text: string;
  url: string;
}

interface Logo {
  text: string;
  url: string;
}

interface NavbarData {
  logo: Logo;
  links: NavLink[];
}

const Navbar = () => {
  const pathname = usePathname(); // ✅ Replaces activeLink state
  const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/data/navbar.json")
      .then((res) => res.json())
      .then((data: NavbarData) => setNavbarData(data))
      .catch((err) => console.error("Failed to fetch navbar:", err));
  }, []);

  if (!navbarData) return null;

  return (
    <nav className="w-full bg-white sticky top-0 z-50">
      <div className="m-auto max-w-screen-xl px-4 py-2">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between -mx-5 py-2">
          {/* Left: Logo */}
          <Link
            href={navbarData.logo.url}
            className="flex items-center text-xl font-bold text-black"
          >
            <Image src="/Logo.svg" alt="LOGO" width={155} height={30} />
          </Link>

          {/* Center: Nav Links */}
          <div className="flex-1 flex justify-center space-x-11">
            {navbarData.links.map((link) => (
              <Link
                key={link.text}
                href={link.url}
                className={`text-[17px] text-black hover:text-green-600 font-medium border-b-2 ${
                  pathname === link.url
                    ? "border-green-600"
                    : "border-transparent"
                }`}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Right: Buttons */}
          <div className="min-w-[140px] flex justify-end space-x-6">
            <Link href="/login" className="text-black text-[17px] font-medium pt-3">
                Login
            </Link>
            <DynamicModalForm />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between py-4">
          <Link
            href={navbarData.logo.url}
            className="flex items-center text-xl font-bold text-black"
          >
            <Image src="/Logo.svg" alt="LOGO" width={155} height={30} />
          </Link>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <div className="bg-green-100 p-1 rounded">
                <X size={26} className="text-green-600" />
              </div>
            ) : (
              <Menu className="text-green-600" size={28} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-0 w-full bg-white flex flex-col space-y-4 px-6 py-6 md:hidden z-40"
            >
              {navbarData.links.map((link) => (
                <Link
                  key={link.text}
                  href={link.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium ${
                    pathname === link.url ? "text-green-600" : "text-black"
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

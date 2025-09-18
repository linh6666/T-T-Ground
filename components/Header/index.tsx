"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image } from "@mantine/core";

// import LoginButton from "../../components/LoginButton/LoginButton";
import styles from "./Header.module.css";

// menu mặc định
const baseLinks = [
  { label: "TRANG CHỦ", href: "/", highlight: true },
  { label: "GIỚI THIỆU", href: "/gioi-thieu" },
  { label: "TƯƠNG TÁC", href: "/Tuong-tac" },
  { label: "QUẢN LÝ BÁN HÀNG", href: "/quan-ly-ban-hang" },
  { label: "QUẢN TRỊ HỆ THỐNG", href: "/quan-ly-he-thong" },
  { label: "LIÊN HỆ", href: "/lien-he" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [currentFlag, setCurrentFlag] = useState<"vn" | "en">("vn");
  const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (pathname.startsWith("/en")) {
//       setCurrentFlag("en");
//     } else {
//       setCurrentFlag("vn");
//     }
//   }, [pathname]);

  // Tự động đóng dropdown nếu click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFlagDropdownOpen(false);
      }
    };
    if (isFlagDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFlagDropdownOpen]);

  const isActive = (href: string, highlight?: boolean) => {
    if (pathname === href) return styles.navActive;
    if (highlight) return styles.navHighlight;
    return styles.navNormal;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo + Flags + Menu Icon */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/Logo T&T.png" alt="Logo" className={styles.logo} />
            </Link>

            {/* Flags for mobile */}
        
          </div>

          {/* Toggle Button (mobile only) */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={styles.mobileToggle}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Right Section (Login + Flags) */}
        <div className="flex items-center gap-3 md:order-2">
          {/* <div className={`hidden md:flex ${styles.loginLangBlock}`}>
            <LoginButton />
          </div> */}

          {/* Flag Dropdown */}
         
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <ul className={styles.navList}>
            {baseLinks.map(({ label, href, highlight }) => (
              <li key={label}>
                <Link href={href}>
                  <span
                    className={`${styles.navLink} ${isActive(href, highlight)}`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContainer}>
            <ul className="text-white font-medium text-base">
              {baseLinks.map(({ label, href, highlight }) => (
                <li key={label} className={styles.mobileMenuItem}>
                  <Link href={href} onClick={() => setIsMobileMenuOpen(false)}>
                    <span
                      className={`${styles.mobileLink} ${isActive(
                        href,
                        highlight
                      )}`}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Login in Mobile */}
            {/* <div className="flex items-center justify-between pt-2">
              <LoginButton isMobile />
            </div> */}
          </div>
        </div>
      )}
    </nav>
  );
}

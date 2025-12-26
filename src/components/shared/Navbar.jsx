"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX, HiOutlineUser } from "react-icons/hi";
import Logo from "../ui/Logo";
import Container from "./Container";
import NavLink from "../ui/NavLink";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-base-100 shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-4">
            <button
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-md hover:bg-base-200"
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? (
                <HiOutlineX className="w-6 h-6" />
              ) : (
                <HiOutlineMenu className="w-6 h-6" />
              )}
            </button>

            <Logo />
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                className="text-sm font-medium hover:text-primary transition-colors inline-block"
              >
                {l.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="btn btn-ghost btn-sm hidden sm:inline-flex items-center gap-2"
            >
              <HiOutlineUser className="w-5 h-5" />
              <span>Sign in</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-200 ${
            mobileOpen ? "max-h-screen mt-3" : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="bg-base-100 rounded-lg p-4 shadow">
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <NavLink
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block w-full py-2 px-3 rounded hover:bg-base-200"
                  >
                    {l.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

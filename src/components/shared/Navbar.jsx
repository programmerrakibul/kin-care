"use client";

import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Logo from "../ui/Logo";
import Container from "./Container";
import NavLink from "../ui/NavLink";
import { signOut, useSession } from "next-auth/react";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "My Bookings", href: "/my-bookings" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data, status } = useSession();
  const user = data?.user || null;

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
            {status === "loading" ? (
              "Loading..."
            ) : status === "authenticated" && user ? (
              <>
                <Avatar src={user.image} alt={user.name} size="size-9" />
                <Button onClick={() => signOut()}>Logout</Button>
              </>
            ) : (
              <Button onClick={() => router.push("/login")}>LogIn</Button>
            )}
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

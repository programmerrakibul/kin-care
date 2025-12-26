"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href = "/", children, className = "" }) => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={href}
        className={`${className} ${pathname.startsWith(href) ? "active" : ""}`}
      >
        {children}
      </Link>
    </>
  );
};

export default NavLink;

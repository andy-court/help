"use client";

import { forwardRef } from "react";
import { Link } from "@/i18n/navigation";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLink({ href, children, ...props }, ref) {
    return (
      <Link ref={ref} href={href} {...props}>
        {children}
      </Link>
    );
  }
);

export default NavLink;

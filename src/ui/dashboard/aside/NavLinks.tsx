"use client";

import {
  HomeIcon,
  NewspaperIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "./aside.module.css";

const links = [
  { name: "Home", href: "/admin", icon: HomeIcon },
  {
    name: "Positions",
    href: "/admin/positions",
    icon: RectangleGroupIcon,
  },
  { name: "Offers", href: "/admin/offers", icon: RectangleStackIcon },
  {
    name: "Applications",
    href: "/admin/applications",
    icon: NewspaperIcon,
  },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link key={link.name} href={link.href} className={styles.button}>
            <LinkIcon className="w-6" />
            <span className={styles.label}>{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}

import NavLinks from "./NavLinks";
import Link from "next/link";
import styles from "./aside.module.css";
import LogoIcon from "../../../../public/images/Logo";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <aside className={styles.sidenav}>
      <nav className={styles.nav}>
        <Link href="/admin" className={styles.logo}>
          <LogoIcon />
          <span className={styles.logoText}>Voltura</span>
        </Link>
        <div className={styles.actions}>
          <NavLinks />
          <div className={styles.empty}></div>
          <button className={styles.button}>
            <PowerIcon />
            <span className={styles.label}>Sign Out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}

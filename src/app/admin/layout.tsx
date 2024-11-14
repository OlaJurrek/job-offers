import type { Metadata } from "next";
import "@/app/globals.css";
import Providers from "@/ui/Providers";
import SideNav from "@/ui/dashboard/navigation/SideNav";
import ToastShelf from "@/ui/toast/ToastShelf/ToastShelf";
import styles from "./layout.module.css";
import { yantramanav } from "@/ui/fonts";

export const metadata: Metadata = {
  title:
    "Job Offers Dashboard | Manage Applications & Track Job Listings Effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={yantramanav.className}>
        <div className={styles.layout}>
          <SideNav />
          <Providers>
            <>
              <main className={styles.main}>{children}</main>
              <ToastShelf />
            </>
          </Providers>
        </div>
      </body>
    </html>
  );
}

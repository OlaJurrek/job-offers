import type { Metadata } from "next";
import "./../../globals.css";

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
      <body>{children}</body>
    </html>
  );
}

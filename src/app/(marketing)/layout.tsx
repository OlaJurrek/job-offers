import type { Metadata } from "next";
import "./../globals.css";

export const metadata: Metadata = {
  title: "Find Your Dream Job | Top Job Offers Platform for Job Seekers",
  description:
    "Discover top job opportunities with our job offers platform. Connect with employers, browse listings by industry, location, and experience level, and apply effortlessly. Create your profile, upload your resume, and get matched with your ideal job. Start your career search today!",
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

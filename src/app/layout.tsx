import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import "@/assets/css/index.css";
import NProgressBar from "@/components/NProgressBar";

import Toaster from "@/components/Toaster";
import "@/libs/thousands";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Katerina", // %s will be replaced with the page title (suffix)
    default: "Katerina",
  },
  description: "Healty food, asian foods, instant foods",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        {/* mount progress bar di sini */}
        <NProgressBar />

        <main className="container max-w-sm mx-auto flex flex-col gap-y-5 relative">{children}</main>

        {modal}
        <Toaster />
      </body>
    </html>
  );
}

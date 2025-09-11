import type { Metadata } from "next";

import { Poppins } from "next/font/google";

// Example for Next.js (app/layout.tsx)
import "@/assets/css/index.css";
import "@/libs/thousands"; // path sesuaikan

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
        <main className="container max-w-sm mx-auto flex flex-col gap-y-5 relative">{children}</main>

        {modal}
      </body>
    </html>
  );
}

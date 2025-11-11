// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "@/components/ui/toaster";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "CSV Runner Dashboard",
//   description: "Upload and visualize running data from CSV files",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {children}
//         <Toaster />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Run Analytics Dashboard",
  description: "Upload and visualize running data from CSV files",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
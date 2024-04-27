import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Providers from "./_utils/providers";

export const metadata: Metadata = {
  title: "알고싶었성",
  description: "Education platform that provides youth sex education card news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col w-full mx-auto max-w-screen-2xl">
        <Header />
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

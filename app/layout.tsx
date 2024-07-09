import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LocaleProvider } from "@/components/locale/localeProvider";
import "./globals.css";
import { Locale } from "@/i18.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "国际化",
  description: "柠檬酱国际化测试",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocaleProvider lang={params.lang}>{children}</LocaleProvider>
      </body>
    </html>
  );
}

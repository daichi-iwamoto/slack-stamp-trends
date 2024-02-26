import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProviderLayout } from "@/components/SessionProviderLayout";

export const fetchCache = "only-no-store";

export const metadata: Metadata = {
  title: "Slack Emoji Ranking",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <SessionProviderLayout>{children}</SessionProviderLayout>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Home Affairs GPT",
  description: "Get south african civic and immigration advice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

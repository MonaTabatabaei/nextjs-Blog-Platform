import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, Container } from "@/components/layout";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Blog Platform",
    template: "%s | Blog Platform",
  },
  description: "A modern blog platform built with Next.js and shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var resolved = theme || (prefersDark ? 'dark' : 'light');
                  document.documentElement.classList.toggle('dark', resolved === 'dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-w-[375px] antialiased`}
      >
        <QueryProvider>
          <Header />
          <Container>{children}</Container>
        </QueryProvider>
      </body>
    </html>
  );
}

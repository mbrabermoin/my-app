import type { Metadata } from "next";
import StyledComponentsRegistry from "./styled-components-registry";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "Application migrated from Vite to Next.js",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
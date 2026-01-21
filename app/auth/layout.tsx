import type { Metadata } from "next";
import "../globals.css";



export const metadata: Metadata = {
  title: "Serenity-Application",
  description: "Application de gestion d'hotel et de restauration",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}

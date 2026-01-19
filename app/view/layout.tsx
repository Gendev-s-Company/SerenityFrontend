import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/side-bar/app-sidebar";
import Header from "@/components/layout/header/header";
import { Separator } from "@/components/ui/separator";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <main>
                            <Header />
                            <Separator />
                            {children}
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    );
}

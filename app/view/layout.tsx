import type { Metadata } from "next";
import "../globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/side-bar/app-sidebar";
import Header from "@/components/layout/header/header";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import Footer from "@/components/layout/footer/footer";



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

        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <Header />
                    <Separator />
                    <Suspense fallback={<div>Loading...</div>} />
                    <div className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {children}

                        <Footer />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

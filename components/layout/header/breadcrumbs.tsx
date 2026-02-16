// PATHNAME + TRANSLATION

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const translations: Record<string, string> = {
  "home": "Accueil",
  "users": "Utilisateurs",
  "work": "Travail",
  "calendar": "Calendrier",
  "settings": "Paramètres",
  "dashboard": "Tableau de bord",
  "profil": "Profile",
  "hotel": "Hôtel",
  "restaurant": "Restaurant",
  "company": "société",

};

const Breadcrumbs = () => {
  const pathname = usePathname();
  
  const allSegments = pathname.split("/").filter((item) => item !== "");
  const pathSegments = allSegments.slice(1);

  const translate = (word: string) => {
    const lowerWord = word.toLowerCase();
    
    if (translations[lowerWord]) {
      return translations[lowerWord].charAt(0).toUpperCase() + translations[lowerWord].slice(1);
    }

    return lowerWord
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="">Accueil</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = `/${allSegments.slice(0, index + 2).join("/")}`;
          
          // Traduction du segment
          const label = translate(segment);

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={href}>{label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
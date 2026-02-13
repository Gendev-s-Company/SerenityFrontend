import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { PMenu } from "@/types/component-type/menu-type";
import DropdownMenuComponent from "./dropdown-menu";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SubmenuProps {
  items: PMenu[];
  title: string;
  Picon?: LucideIcon;
  active?: boolean; // ✅ ajout de l’état actif
}

const SubmenuComponent: React.FC<SubmenuProps> = ({ items, title, Picon, active }) => {
  const pathname = usePathname(); // route actuelle

  // Vérifie si un sous-élément est actif
  const isSubActive = (row: PMenu) =>
    row.url === pathname || row.subMenu?.some(sub => sub.url === pathname);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton className={`${active ? "bg-blue-500 text-white" : ""}`}>
        {Picon && <Picon style={{ width: "15px", height: "15px" }} />}
        {Picon ? <strong>{title}</strong> : title}
      </SidebarMenuButton>

      <SidebarMenuSub>
        {items?.map((row, index) => {
          const hasSubmenu = row.subMenu.length > 0;
          const subActive = isSubActive(row); // vrai si le sous-menu est actif

          if (hasSubmenu) {
            return (
              <div key={index}>
                {row.isSubmenu ? (
                  <SubmenuComponent
                    items={row.subMenu}
                    title={row.title}
                    Picon={row.icon}
                    active={subActive} // ✅ passe l’état actif
                  />
                ) : (
                  <DropdownMenuComponent
                    items={row.subMenu}
                    title={row.title}
                    Picon={row.icon}
                    active={subActive} // ✅ idem pour dropdown
                  />
                )}
              </div>
            );
          } else {
            return (
              <SidebarMenuSubItem key={index}>
                <SidebarMenuSubButton asChild>
                  <Link
                    href={row.url}
                    className={`${subActive ? "bg-blue-500 text-white" : ""}`}
                  >
                    {row.icon && <row.icon />}
                    <span>{row.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          }
        })}
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
};

export default SubmenuComponent;

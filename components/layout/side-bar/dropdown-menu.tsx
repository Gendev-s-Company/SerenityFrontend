import { PMenu } from "@/types/component-type/menu-type";
import { LucideIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";

interface DropdownMenuProps {
  items: PMenu[];
  title: string;
  Picon?: LucideIcon;
  active?: boolean; // ✅ ajout de la prop active
}

const DropdownMenuComponent: React.FC<DropdownMenuProps> = ({ items, title, Picon, active }) => {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      <Collapsible className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
                className={`relative flex w-full items-center justify-between
                  px-3 py-2 transition-all duration-200 ease-in-out
                  ${
                    active
                      ? "text-blue-600 before:absolute before:left-0 before:top-1/2 before:h-6 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-blue-600"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}               
                >
              {Picon && <Picon style={{ width: '15px', height: '15px' }} />}
              {title}
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              {items?.map((row, index) => {
                const Icon = row.icon;
                const hasSubmenu = row.dropdown && row.subMenu.length > 0;

                // Vérifie si le sous-élément est actif
                const subActive = row.subMenu?.some(sub => sub.url === pathname) || row.url === pathname;
                
                if (hasSubmenu) {
                  return (
                    <DropdownMenuComponent
                      key={index}
                      items={row.subMenu}
                      title={row.title}
                      Picon={Icon}
                      active={subActive} // ✅ passe l'état actif à la récursion
                    />
                  );
                } else {
                  return (
                    <SidebarMenuSubItem key={index}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          href={row.url}
                        className={`relative flex items-center gap-2
                          px-3 py-2 transition-all duration-150
                          ${
                            subActive
                              ? "!text-blue-600 before:absolute before:left-0 before:top-1/2 before:h-4 before:w-[2px] before:-translate-y-1/2 before:rounded-full before:bg-blue-600"
                              : "text-muted-foreground hover:text-foreground"
                          }
                        `}
                        >
                        {Icon && <Icon size={16} className="shrink-0" />}
                          <span>{row.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                }
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
};

export default DropdownMenuComponent;

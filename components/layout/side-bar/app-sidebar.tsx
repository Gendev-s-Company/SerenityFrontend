"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import DropdownMenuComponent from "./dropdown-menu";
import SubmenuComponent from "./submenu-list";
import { items } from "@/utils/menu-list";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (url: string) => pathname === url;
  const isParentActive = (subMenu: typeof items[0]["subMenu"]) =>
    subMenu.some(sub => pathname === sub.url);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex w-full gap-2">
            <Home style={{ width: '25px', height: '25px' }} />
            <span className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Serenity App
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => {
                const active = isActive(item.url) || (item.subMenu && isParentActive(item.subMenu));
                return (
                  <div key={item.title}>
                    {!item.dropdown && !item.isSubmenu && (
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href={item.url} className="scroll-m-20 text-xl font-semibold tracking-tight">
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                    {item.dropdown && !item.isSubmenu && (
                      <DropdownMenuComponent items={item.subMenu} title={item.title} Picon={item.icon} active={active} />
                    )}
                    {!item.dropdown && item.isSubmenu && (
                      <SubmenuComponent items={item.subMenu} title={item.title} Picon={item.icon} active={active} />
                    )}
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
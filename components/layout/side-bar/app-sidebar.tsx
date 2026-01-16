import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import DropdownMenuComponent from "./dropdown-menu"
import SubmenuComponent from "./submenu-list"
import { items } from "@/utils/menu-list"
import { Home } from "lucide-react"



export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="flex w-full justify-between">
                        <Home /> Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>

                        <SidebarMenu>
                            {items.map((item) => (
                                <div key={item.title}>
                                    {item.dropdown && !item.isSubmenu && <DropdownMenuComponent items={item.subMenu} title={item.title} />}
                                    {!item.dropdown && item.isSubmenu && <SubmenuComponent items={item.subMenu} title={item.title} />}
                                    {!item.dropdown && !item.isSubmenu &&
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    }

                                </div>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}




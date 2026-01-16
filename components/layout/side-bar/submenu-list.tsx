import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar"
import { MMenu } from "@/types/menu-type"

const SubmenuComponent: React.FC<{ items: MMenu[], title: string }> = ({ items, title }) => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton>
                {title}
            </SidebarMenuButton>
            <SidebarMenuSub>
                {items?.map((row, index) => (
                    <SidebarMenuSubItem key={index}>

                        <SidebarMenuSubButton href={row?.url}>
                            {row?.icon && <row.icon />}
                            <span>{row?.title}</span>
                        </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                )
                )}
            </SidebarMenuSub>
        </SidebarMenuItem>
    )
}
export default SubmenuComponent
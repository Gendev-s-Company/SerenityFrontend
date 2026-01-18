import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { PMenu } from "@/types/menu-type";

const SubmenuComponent: React.FC<{ items: PMenu[]; title: string }> = ({
  items,
  title,
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>{title}</SidebarMenuButton>
      <SidebarMenuSub>
        {items?.map((row, index) => {
          const hasSubmenu = row.isSubmenu && row.subMenu.length > 0;
          if (hasSubmenu) {
            return (
            <SubmenuComponent
              key={index}
              items={row.subMenu}
              title={row.title}
            />)
          } else
            return (
              <SidebarMenuSubItem key={index}>
                <SidebarMenuSubButton href={row?.url}>
                  {row?.icon && <row.icon />}
                  <span>{row?.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
        })}
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
};
export default SubmenuComponent;

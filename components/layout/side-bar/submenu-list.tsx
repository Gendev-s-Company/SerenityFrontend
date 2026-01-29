import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { PMenu } from "@/types/menu-type";
import DropdownMenuComponent from "./dropdown-menu";
import { LucideIcon } from "lucide-react";

const SubmenuComponent: React.FC<{ items: PMenu[]; title: string, Picon?: LucideIcon }> = ({
  items,
  title,
  Picon
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
          {Picon && <Picon style={{width:'15px', height:'15px'}}/>}
        {/* <h4 className="scroll-m-20 text-xl font-semibold tracking-tight"> */}
        {Picon ? <strong> {title}</strong> : title} 

        {/* </h4> */}
      </SidebarMenuButton>
      <SidebarMenuSub>
        {items?.map((row, index) => {
          const hasSubmenu = row.subMenu.length > 0;
          if (hasSubmenu) {
            return (
              <div key={index}>
                {row.isSubmenu ? (
                  <SubmenuComponent
                    key={index}
                    items={row.subMenu}
                    title={row.title}
                  />
                ) : (
                  <DropdownMenuComponent
                    key={index}
                    items={row.subMenu}
                    title={row.title}
                  />
                )}
              </div>
            );
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

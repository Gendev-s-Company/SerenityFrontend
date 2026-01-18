import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { PMenu } from "@/types/menu-type";
import { ChevronRight } from "lucide-react";

const DropdownMenuComponent: React.FC<{ items: PMenu[]; title: string }> = ({
  items,
  title,
}) => {
  return (
    <SidebarMenu>
      <Collapsible className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="flex w-full items-center justify-between">
              {title}
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {items?.map((row, index) => {
                const Icon = row.icon;
                const hasSubmenu = row.dropdown && row.subMenu.length > 0;
                if (hasSubmenu) {
                  return (
                    <DropdownMenuComponent
                      key={index}
                      items={row.subMenu}
                      title={row.title}
                    />
                  );
                } else {
                  return (
                    <SidebarMenuSubItem key={index}>
                      <SidebarMenuSubButton asChild>
                        <a href={row.url}>
                          {Icon && <Icon size={16} />}
                          <span>{row.title}</span>
                        </a>
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

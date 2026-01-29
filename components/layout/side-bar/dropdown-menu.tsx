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
import { PMenu } from "@/types/component-type/menu-type";
import { ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";

const DropdownMenuComponent: React.FC<{ items: PMenu[]; title: string, Picon?: LucideIcon }> = ({
  items,
  title,
  Picon
}) => {
  return (
    <SidebarMenu>
      <Collapsible className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="flex w-full items-center justify-between">
              {Picon && <Picon style={{width:'25px', height:'25px'}}/>}
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
                        <Link href={row.url} >
                          {Icon && <Icon size={16} />}
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

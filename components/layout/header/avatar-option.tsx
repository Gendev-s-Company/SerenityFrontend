import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Mavatar from "@/components/avatar/mavatar";
import { Iavatar } from "@/types/component-type/avatar-type";
import Link from "next/link";
import { avatarDropdownOption } from "@/utils/dropdown-options/dropdown-option";


const AvatarOption = () => {
  const avatar: Iavatar = {
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
  };

  return (
    <div className="flex w-row items-center gap-2 ml-auto">
      <span>MyRanto/Administrateur</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Mavatar avatar={avatar} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {avatarDropdownOption.map((row) =>
            <DropdownMenuItem className="cursor-pointer" key={row.title} asChild>
              <Link href={row.link}>{row.title}</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarOption;

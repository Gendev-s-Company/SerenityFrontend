"use client";

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
import { getLocalStorage } from "@/utils/storage";
import page from "@/app/view/users/work/calendar/page";
import { UserEntity } from "@/types/entity-type/userEntity";


const AvatarOption = () => {

  const [user, setUser] = React.useState<UserEntity>();

  React.useEffect(() => {
    const u = getLocalStorage();    
    if (u) {
      setUser(u);
    }
    console.log("userssss", user);
    // console.log("userssss", user.profil.name);

  }, []);


  const avatar: Iavatar = {
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
  };


return (
    <div className="flex items-center gap-2 ml-auto">
      <div className="flex flex-col items-end justify-center gap-1">
        <span className="text-sm font-medium">
          {user?.name || ""}
        </span>
    
        {(user?.profil?.name || user?.profil?.company?.name) && (
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {user?.profil?.name}
            {user?.profil?.name && user?.profil?.company?.name && (
              <span className="text-gray-400">•</span>
            )}
            {user?.profil?.company?.name}
          </span>
        )}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer focus:outline-none transition-opacity hover:opacity-80">
            <Mavatar avatar={avatar} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {avatarDropdownOption.map((row) => (
            <DropdownMenuItem key={row.title} asChild>
              <Link href={row.link} className="w-full cursor-pointer">
                {row.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarOption;

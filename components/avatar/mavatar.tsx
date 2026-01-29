import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Iavatar } from "@/types/component-type/avatar-type";

// composant utiliser pour l'affichage d'avatar
const Mavatar: React.FC<{avatar:Iavatar}> = ({avatar}) => {
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src={avatar.src} alt={avatar.alt} />
      <AvatarFallback>{avatar.fallback}</AvatarFallback>
    </Avatar>
  );
};

export default Mavatar;

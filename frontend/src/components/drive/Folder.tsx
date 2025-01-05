import folderIcon from "@/assets/folder_icon.svg";
import { FolderProps } from "@/pages/Drive";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { EllipsisVertical, Pen, FolderHeart, Trash2 } from "lucide-react";
import { useState } from "react";
import RenameFolder from "./actions-menu/RenameFolder";

export default function Folder({ _id, parent, name, isStarred }: FolderProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className="flex justify-between items-center bg-blackdefault/[0.02] hover:bg-blackdefault/[0.05] rounded p-2 group">
            <div className="flex items-center gap-2 overflow-hidden">
                <img src={folderIcon} className="w-8 md:w-10 select-none pointer-events-none" />
                <p>{name}</p>
            </div>

            {/* overflow menu */}
            <Menubar className="invisible">
                <MenubarMenu>
                    <MenubarTrigger className="p-0">
                        <EllipsisVertical className="w-8 h-8 p-2 rounded-full hover:bg-blackdefault/5 group-hover:visible" />
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onClick={() => setIsDialogOpen(true)}>
                            <Pen className="scale-75 mr-1"/>
                            Rename 
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <FolderHeart className="scale-75 mr-1"/>
                            Add to Starred 
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <Trash2 className="scale-75 mr-1"/>
                            Move to Trash 
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

             {/* rename dialog */}
            <RenameFolder _id={_id} parent={parent} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            
        </div>
    );
}

import { FileProps } from "@/pages/Drive";
import { getColor } from "@/utils/color";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { Download, EllipsisVertical, Info, Pen, Share2, FolderHeart, Trash2 } from "lucide-react";

export default function File({ _id, parent, originalName, mimeType, type, isStarred }: FileProps) {
    return (
        <div className="w-full h-48 flex flex-col items-start border rounded p-2 hover:bg-blackdefault/[0.02] group overflow-hidden relative">
            <div className={`flex items-center justify-center w-full h-full ${getColor(mimeType)} font-semibold text-xl text-whitedefault uppercase rounded mb-2 select-none pointer-events-none`}>
                {type}
            </div>
            <p>{originalName}</p>
            <p className="text-blackdefault/50">{type}</p>

            {/* overflow menu */}
            <Menubar className="absolute top-4 right-4 invisible">
                <MenubarMenu>
                    <MenubarTrigger className="p-0">
                        <EllipsisVertical className="w-8 h-8 p-2 rounded-full hover:bg-blackdefault/5 group-hover:visible text-whitedefault" />
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            <Info className="scale-75 mr-1"/>
                            Details 
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
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
                            <Share2 className="scale-75 mr-1"/>
                            Share 
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <Download className="scale-75 mr-1"/>
                            Download 
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <Trash2 className="scale-75 mr-1"/>
                            Move to Trash 
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            
        </div>
    );
}

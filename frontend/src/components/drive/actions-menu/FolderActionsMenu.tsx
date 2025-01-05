import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { FolderProps } from "@/pages/Drive";
import { EllipsisVertical, Pen, FolderHeart, Trash2 } from "lucide-react";
import { useState } from "react";
import RenameFolder from "./RenameFolder";
import { Button } from "@/components/ui/button";

export default function FileActionsMenu({ _id, parent }: FolderProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <Menubar className="invisible">
                <MenubarMenu>
                    <MenubarTrigger className="p-0">
                        <EllipsisVertical className="w-8 h-8 p-2 rounded-full hover:bg-blackdefault/5 group-hover:visible" />
                    </MenubarTrigger>
                    <MenubarContent>

                        {/* rename */}
                        <MenubarItem className="p-0">
                            <Button onClick={() => setIsDialogOpen(true)} variant="secondary" className="w-full justify-start bg-transparent cursor-default">
                                <Pen className="mr-1"/>
                                <span>Rename</span> 
                            </Button>
                        </MenubarItem>

                        <MenubarSeparator />

                        {/* add to starred */}
                        <MenubarItem className="p-0">
                            <Button variant="secondary" className="w-full justify-start bg-transparent cursor-default">
                                <FolderHeart className="mr-1"/>
                                <span>Add to Starred</span>
                            </Button>
                        </MenubarItem>

                        <MenubarSeparator />
                        
                        {/* move to trash */}
                        <MenubarItem className="p-0">
                            <Button variant="secondary" className="w-full justify-start bg-transparent cursor-default">
                                <Trash2 className="mr-1"/>
                                <span>Move to Trash</span>
                            </Button>
                        </MenubarItem>

                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            {/* rename dialog */}
            <RenameFolder _id={_id} parent={parent} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </>
  )
}

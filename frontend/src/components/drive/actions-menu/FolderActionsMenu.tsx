import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { FolderProps } from "@/pages/Drive";
import { EllipsisVertical, Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import RenameFolder from "./RenameFolder";
import Star from "./Star";
import Unstar from "./Unstar";
import { CustomButton } from "@/components/global/FormElements";

export default function FileActionsMenu({ _id, parent, isStarred }: FolderProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <Menubar className="invisible">
                <MenubarMenu>
                    <MenubarTrigger className="p-0">
                        <EllipsisVertical className="w-8 h-8 p-2 rounded-full hover:bg-zinc-800/5 dark:hover:bg-zinc-200/5 group-hover:visible" />
                    </MenubarTrigger>
                    <MenubarContent>

                        {/* rename */}
                        <MenubarItem className="p-0">
                            <CustomButton onClick={() => setIsDialogOpen(true)} type="button" variant="secondary" className="w-full justify-start bg-transparent cursor-default">
                                <Pen className="mr-1"/>
                                <span>Rename</span> 
                            </CustomButton>
                        </MenubarItem>

                        <MenubarSeparator />

                        {/* star & unstar */}
                        {
                            isStarred ?
                            <MenubarItem className="p-0">
                                <Unstar _id={_id} parent={parent} type="folder" />
                            </MenubarItem>
                            :
                            <MenubarItem className="p-0">
                                <Star _id={_id} parent={parent} type="folder" />
                            </MenubarItem>
                        }

                        <MenubarSeparator />
                        
                        {/* move to trash */}
                        <MenubarItem className="p-0">
                            <CustomButton type="button" variant="secondary" className="w-full justify-start bg-transparent cursor-default">
                                <Trash2 className="mr-1"/>
                                <span>Move to Trash</span>
                            </CustomButton>
                        </MenubarItem>

                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            {/* rename dialog */}
            <RenameFolder _id={_id} parent={parent} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </>
  )
}

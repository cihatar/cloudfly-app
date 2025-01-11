import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { FolderProps } from "@/pages/Drive";
import { EllipsisVertical, Pen } from "lucide-react";
import { useState } from "react";
import Rename from "./Rename";
import Star from "./Star";
import Unstar from "./Unstar";
import MovetoTrash from "./MovetoTrash";
import { CustomButton } from "@/components/global/FormElements";

export default function FileActionsMenu({ _id, parent, isStarred }: FolderProps) {
    const [isRenameDialogOpen, setRenameDialogOpen] = useState(false);

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
                            <CustomButton onClick={() => setRenameDialogOpen(true)} type="button" variant="secondary" className="w-full justify-start bg-transparent cursor-default">
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
                            <MovetoTrash _id={_id} parent={parent} type="folder" />
                        </MenubarItem>

                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            {/* rename dialog */}
            <Rename _id={_id} parent={parent} type="folder" isRenameDialogOpen={isRenameDialogOpen} setRenameDialogOpen={setRenameDialogOpen} />
        </>
  )
}

import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { FileProps } from "@/pages/Drive";
import { EllipsisVertical, FolderHeart, Info, Lock, Pen, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import Details from "./Details";
import RenameFile from "./RenameFile";
import DownloadFile from "./DownloadFile";
import ShareFile from "./ShareFile";
import MakeFilePrivate from "./MakeFilePrivate";

export default function FileActionsMenu({ _id, parent, originalName, publicKey }: FileProps) {
    const [isDetailsSheetOpen, setDetailsSheetOpen] = useState(false);
    const [isRenameDialogOpen, setRenameDialogOpen] = useState(false);
    const [isShareDialogOpen, setShareDialogOpen] = useState(false);
    const [isPrivateDialogOpen, setPrivateDialogOpen] = useState(false);

    return (
        <>
            <Menubar className="absolute top-4 right-4 invisible">
                <MenubarMenu>
                    <MenubarTrigger className="p-0">
                        <EllipsisVertical className="w-8 h-8 p-2 rounded-full hover:bg-blackdefault/5 group-hover:visible text-whitedefault" />
                    </MenubarTrigger>
                    <MenubarContent>

                        {/* details */}
                        <MenubarItem className="p-0">
                            <Button onClick={() => setDetailsSheetOpen(true)} variant="secondary" className="w-full justify-start bg-transparent cursor-default">
                                <Info className="mr-1"/>
                                <span>Details</span>
                            </Button>
                        </MenubarItem>

                        <MenubarSeparator />

                        {/* rename */}
                        <MenubarItem className="p-0">
                            <Button onClick={() => setRenameDialogOpen(true)} variant="secondary" className="w-full justify-start bg-transparent cursor-default">
                                <Pen className="mr-1"/>
                                <span>Rename</span> 
                            </Button>
                        </MenubarItem>

                        <MenubarSeparator />

                        {/* add to starred */}
                        <MenubarItem className="p-0">
                            <Button variant="secondary" className="w-full justify-start bg-transparent cursor-default" >
                                <FolderHeart className="mr-1"/>
                                <span>Add to Starred</span> 
                            </Button>
                        </MenubarItem>

                        <MenubarSeparator />

                        {/* share & make private */}
                        {
                            publicKey ? 
                            <MenubarItem className="p-0">   
                                <Button onClick={() => setPrivateDialogOpen(true)} variant="secondary" className="w-full justify-start bg-transparent cursor-default">
                                    <Lock className="mr-1"/>
                                    <span>Make private</span> 
                                </Button>
                            </MenubarItem>
                            :  
                            <MenubarItem className="p-0">   
                                <Button onClick={() => setShareDialogOpen(true)} variant="secondary" className="w-full justify-start bg-transparent cursor-default">
                                    <Share2 className="mr-1"/>
                                    <span>Share</span> 
                                </Button>
                            </MenubarItem>
                        }
                       
                        <MenubarSeparator />

                        {/* download */}
                        <MenubarItem className="p-0">
                            <DownloadFile _id={_id} originalName={originalName} />
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

            {/* details sheet */}
            <Details _id={_id} originalName={originalName} isDetailsSheetOpen={isDetailsSheetOpen} setDetailsSheetOpen={setDetailsSheetOpen} />

            {/* rename dialog */}
            <RenameFile _id={_id} parent={parent} isRenameDialogOpen={isRenameDialogOpen} setRenameDialogOpen={setRenameDialogOpen} />

            {/* share dialog */}
            <ShareFile _id={_id} parent={parent} publicKey={publicKey} isShareDialogOpen={isShareDialogOpen} setShareDialogOpen={setShareDialogOpen} />

            {/* private dialog */}
            <MakeFilePrivate _id={_id} parent={parent} isPrivateDialogOpen={isPrivateDialogOpen} setPrivateDialogOpen={setPrivateDialogOpen} />
        </>
  )
}

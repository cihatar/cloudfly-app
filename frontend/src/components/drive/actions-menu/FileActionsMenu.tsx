import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { FileProps } from "@/pages/Drive";
import { EllipsisVertical, Info, Lock, Pen, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import Details from "./Details";
import RenameFile from "./RenameFile";
import Star from "./Star";
import Unstar from "./Unstar";
import ShareFile from "./ShareFile";
import MakeFilePrivate from "./MakeFilePrivate";
import DownloadFile from "./DownloadFile";
import { CustomButton } from "@/components/global/FormElements";

export default function FileActionsMenu({ _id, parent, originalName, isStarred, publicKey }: FileProps) {
    const [isDetailsSheetOpen, setDetailsSheetOpen] = useState(false);
    const [isRenameDialogOpen, setRenameDialogOpen] = useState(false);
    const [isShareDialogOpen, setShareDialogOpen] = useState(false);
    const [isPrivateDialogOpen, setPrivateDialogOpen] = useState(false);

    return (
        <>
            <Menubar className="absolute top-4 right-4 invisible">
                <MenubarMenu>
                    <MenubarTrigger className="p-0">
                        <EllipsisVertical className="w-8 h-8 p-2 rounded-full hover:bg-zinc-800/5 dark:hover:bg-zinc-200/5 group-hover:visible text-white" />
                    </MenubarTrigger>
                    <MenubarContent>

                        {/* details */}
                        <MenubarItem className="p-0">
                            <CustomButton onClick={() => setDetailsSheetOpen(true)} type="button" variant="secondary" effect={false} className="w-full justify-start bg-transparent cursor-default">
                                <Info className="mr-1"/>
                                <span>Details</span>
                            </CustomButton>
                        </MenubarItem>

                        <MenubarSeparator />

                        {/* rename */}
                        <MenubarItem className="p-0">
                            <CustomButton onClick={() => setRenameDialogOpen(true)} type="button" variant="secondary" effect={false} className="w-full justify-start bg-transparent cursor-default">
                                <Pen className="mr-1"/>
                                <span>Rename</span> 
                            </CustomButton>
                        </MenubarItem>

                        <MenubarSeparator />

                        {/* star & unstar */}
                        {
                            isStarred ?
                            <MenubarItem className="p-0">
                                <Unstar _id={_id} parent={parent} type="file" />
                            </MenubarItem>
                            :
                            <MenubarItem className="p-0">
                                <Star _id={_id} parent={parent} type="file" />
                            </MenubarItem>
                        }

                        <MenubarSeparator />

                        {/* share & make private */}
                        {
                            publicKey ? 
                            <MenubarItem className="p-0">   
                                <CustomButton onClick={() => setPrivateDialogOpen(true)} type="button" variant="secondary" effect={false} className="w-full justify-start bg-transparent cursor-default">
                                    <Lock className="mr-1"/>
                                    <span>Make private</span> 
                                </CustomButton>
                            </MenubarItem>
                            :  
                            <MenubarItem className="p-0">   
                                <CustomButton onClick={() => setShareDialogOpen(true)} type="button" variant="secondary" effect={false} className="w-full justify-start bg-transparent cursor-default">
                                    <Share2 className="mr-1"/>
                                    <span>Share</span> 
                                </CustomButton>
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
                            <CustomButton type="button" variant="secondary" effect={false} className="w-full justify-start bg-transparent cursor-default">
                                <Trash2 className="mr-1"/>
                               <span>Move to Trash</span>
                            </CustomButton>
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

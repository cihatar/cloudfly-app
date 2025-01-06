import folderIcon from "@/assets/folder_icon.svg";
import { FolderProps } from "@/pages/Drive";
import FolderActionsMenu from "./actions-menu/FolderActionsMenu";

export default function Folder(folder: FolderProps) {
    return (
        <div className="flex justify-between items-center dark:bg-zinc-900 dark:hover:bg-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-md p-2 group">
            <div className="flex items-center gap-2 overflow-hidden">
                <img src={folderIcon} className="w-8 md:w-10 select-none pointer-events-none" />
                <p>{folder.name}</p>
            </div>

            {/* overflow menu */}
            <FolderActionsMenu {...folder} />
            
        </div>
    );
}

import folderIcon from "@/assets/folder_icon.svg";
import { FolderProps } from "@/pages/Drive";
import FolderActionsMenu from "./actions-menu/FolderActionsMenu";

export default function Folder(folder: FolderProps) {
    return (
        <div className="flex justify-between items-center dark:bg-zinc-900 dark:hover:bg-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-full p-2 group">
            <div className="flex items-center overflow-hidden">
                <img src={folderIcon} className="p-2 w-10 select-none pointer-events-none" />
                <p className="font-medium">{folder.name}</p>
            </div>

            {/* overflow menu */}
            <FolderActionsMenu {...folder} />
            
        </div>
    );
}

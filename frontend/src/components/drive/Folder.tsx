import folderIcon from "@/assets/folder_icon.svg";
import { FolderProps } from "@/pages/Drive";
import FolderActionsMenu from "./actions-menu/FolderActionsMenu";

export default function Folder({ folder, handleChangeDirectory }: { folder: FolderProps, handleChangeDirectory?: (folder: FolderProps) => void }) {
    return (
        <div className="flex justify-between items-center dark:bg-zinc-900 dark:hover:bg-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-full group">
            <div className="w-full h-full flex items-center overflow-hidden px-2" onDoubleClick={() => { if (handleChangeDirectory) handleChangeDirectory(folder) }}>
                <img src={folderIcon} className="p-2 w-10 select-none pointer-events-none" />
                <p className="font-medium select-none">{folder.name}</p>
            </div>

            {/* overflow menu */}
            <FolderActionsMenu {...folder} />
            
        </div>
    );
}

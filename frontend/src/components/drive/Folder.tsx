import { EllipsisVertical } from "lucide-react";
import folderIcon from "@/assets/folder_icon.svg";
import { FolderProps } from "@/pages/Drive";

export default function Folder({ _id, parent, name, isStarred }: FolderProps) {
    return (
        <div className="flex justify-between items-center bg-blackdefault/[0.02] hover:bg-blackdefault/[0.05] rounded p-2 group">
            <div className="flex items-center gap-2 overflow-hidden">
                <img src={folderIcon} className="w-8 md:w-10 select-none pointer-events-none" />
                <p>{name}</p>
            </div>
            <EllipsisVertical className="w-8 h-8 p-2 invisible rounded-full hover:bg-blackdefault/5 group-hover:visible" />
        </div>
    );
}

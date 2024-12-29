import { FileProps } from "@/pages/Drive";
import { getColor } from "@/utils/color";
import { EllipsisVertical } from "lucide-react";

export default function File({ _id, parent, originalName, mimeType, type, isStarred }: FileProps) {
    return (
        <div className="w-full h-48 flex flex-col items-start border rounded p-2 cursor-pointer group overflow-hidden">
            <div className={`flex items-center justify-center w-full h-full p-2 ${getColor(mimeType)} font-semibold text-xl text-whitedefault uppercase rounded mb-2 relative overflow-hidden`}>
                {type}
                <EllipsisVertical className="w-8 h-8 p-2 invisible rounded-full hover:bg-blackdefault/5 group-hover:visible absolute top-2 right-2" />
            </div>
            <p className="">{originalName}</p>
            <p className="text-blackdefault/50">{type}</p>
        </div>
    );
}

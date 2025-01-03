import { FileProps } from "@/pages/Drive";
import { getColor } from "@/utils/color";
import { EllipsisVertical } from "lucide-react";

export default function File({ _id, parent, originalName, mimeType, type, isStarred }: FileProps) {
    return (
        <div className="w-full h-48 flex flex-col items-start border rounded p-2 hover:bg-blackdefault/[0.02] group overflow-hidden relative">
            <div className={`flex items-center justify-center w-full h-full ${getColor(mimeType)} font-semibold text-xl text-whitedefault uppercase rounded mb-2 select-none pointer-events-none`}>
                {type}
            </div>
            <EllipsisVertical className="w-8 h-8 p-2 invisible rounded-full hover:bg-blackdefault/5 group-hover:visible absolute top-4 right-4 text-whitedefault" />
            <p>{originalName}</p>
            <p className="text-blackdefault/50">{type}</p>
        </div>
    );
}

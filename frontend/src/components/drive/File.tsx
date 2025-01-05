import { FileProps } from "@/pages/Drive";
import { getColor } from "@/utils/color";
import FileActionsMenu from "./actions-menu/FileActionsMenu";

export default function File(file: FileProps) {
    return (
        <div className="w-full h-48 flex flex-col items-start border rounded p-2 hover:bg-blackdefault/[0.02] group overflow-hidden relative">
            <div className={`flex items-center justify-center w-full h-full ${getColor(file.mimeType)} font-semibold text-xl text-whitedefault uppercase rounded mb-2 select-none pointer-events-none`}>
                {file.type}
            </div>
            <p>{file.originalName}</p>
            <p className="text-blackdefault/50">{file.type}</p>

            {/* overflow menu */}
            <FileActionsMenu {...file} />
            
        </div>
    );
}

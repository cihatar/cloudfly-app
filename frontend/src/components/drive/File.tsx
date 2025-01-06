import { FileProps } from "@/pages/Drive";
import { getColor } from "@/utils/color";
import FileActionsMenu from "./actions-menu/FileActionsMenu";

export default function File(file: FileProps) {
    return (
        <div className="w-full h-48 flex flex-col items-start border rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 group overflow-hidden relative">
            <div className={`flex items-center justify-center w-full h-full ${getColor(file.mimeType)} font-semibold text-xl text-white uppercase rounded-md mb-2 select-none pointer-events-none`}>
                {file.type}
            </div>
            <p>{file.originalName}</p>
            <p className="text-zinc-500">{file.type}</p>

            {/* overflow menu */}
            <FileActionsMenu {...file} />
            
        </div>
    );
}

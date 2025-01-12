import Animate from "./Animate";
import { Progress } from "../ui/progress";
import { CloudDownload, Minus, X } from "lucide-react";
import { getColor } from "@/utils/color";
import { useUploadContext } from "@/context/UploadContext";
import { CustomButton } from "./FormElements";

export default function UploadProgress() {
    const { uploadedFiles, closeUploadProgress, isMinimized, updateIsMinimized } = useUploadContext();

    return uploadedFiles.length === 0 ? <></> : isMinimized ? 
            <CustomButton onClick={updateIsMinimized} type="button" effect={false} className="fixed bottom-6 right-6 z-50 bg-bluedefault hover:bg-bluedefault/95 text-white rounded-full shadow-md w-12 h-12">
                <CloudDownload />
            </CustomButton> 
            :  
            <Animate className="fixed bottom-0 lg:bottom-6 lg:right-6 z-50 dark:bg-zinc-900 rounded-md w-full lg:w-80 border-2 shadow-md">
                <div className="font-semibold text-lg p-4 flex items-center justify-between">
                    <p className="">Uploads</p>
                    <div className="flex gap-4">
                        <CustomButton variant="ghost" onClick={updateIsMinimized} type="button" effect={false} className="h-8 w-8 p-0 rounded-full">
                            <Minus />
                        </CustomButton>
                        <CustomButton variant="destructive" onClick={closeUploadProgress} type="button" effect={false} className="h-8 w-8 p-0 rounded-full">
                            <X />
                        </CustomButton>
                    </div>
                </div>
                <ul className="max-h-[240px] overflow-y-auto">

                    {
                        uploadedFiles.map((data) => {
                            const file = data.files[0];

                            const nameArr = data.files.map((f) => f.name);
                            const name = nameArr.join(", ");    
                            
                            const isProgressing = data.progress !== 100;
                            const isSuccess = data.isSuccess === true;
                            const isError = data.isError === true;

                            return (
                                    <li key={data.id} className="h-20 flex gap-2 items-center p-4 rounded-md border-t">

                                        <div className={`w-12 h-8 ${getColor(file.type)} rounded-md flex items-center justify-center text-xs text-white uppercase select-none`}>
                                            {name.substring(0,1)}
                                        </div> 

                                        <div className="w-full flex flex-col gap-1">
                                            <p className="text-xs">
                                                {name.length > 30 ? name.substring(0,30) + "..." : name}
                                            </p>

                                            {
                                                isProgressing ? (
                                                    <Progress value={data.progress} className="h-1" />
                                                ) : isSuccess && !isError ? (
                                                    <p className="text-greendefault text-xs">
                                                    {data.message}
                                                    </p>
                                                ) : isError ? (
                                                    <p className="text-red-500 text-xs">
                                                    {data.message}
                                                    </p>
                                                ) : (
                                                    <Progress value={data.progress} className="h-1" />
                                                )
                                            }
                                            
                                        </div>
                                        <p className="text-xs min-w-[36px] text-center">%{data.progress}</p>
                                    </li>
                                )
                        })
                    }

                </ul>
            </Animate>
}

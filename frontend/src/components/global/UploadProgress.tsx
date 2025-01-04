import Animate from "./Animate";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { CloudDownload, Minus, X } from "lucide-react";
import { getColor } from "@/utils/color";
import { useUploadContext } from "@/context/UploadContext";

export default function UploadProgress() {
    const { uploadedFiles, closeUploadProgress, isMinimized, updateIsMinimized } = useUploadContext();

    return (
        <>
            {
                uploadedFiles.length === 0 ? <></> : isMinimized ? 
                <Button onClick={updateIsMinimized} className="fixed bottom-6 right-6 z-50 bg-bluedefault hover:bg-bluedefault/95 rounded-full shadow-md w-12 h-12">
                    <CloudDownload />
                </Button> 
                :  
                <Animate className="fixed bottom-0 lg:bottom-6 lg:right-6 z-50 bg-slate-100 rounded w-full lg:w-80 border-2 shadow-md">
                    <div className="font-semibold text-lg p-4 flex items-center justify-between">
                        <h2 className="">Uploads</h2>
                       <div className="flex gap-4">
                            <Button onClick={updateIsMinimized} className="bg-transparent text-blackdefault p-0 hover:bg-transparent">
                                <Minus />
                            </Button>
                            <Button onClick={closeUploadProgress} className="bg-transparent text-blackdefault p-0 hover:bg-transparent">
                                <X />
                            </Button>
                       </div>
                    </div>
                    <div className="max-h-[240px] overflow-y-auto text-whitedefault">

                        {
                            uploadedFiles.map((data) => {
                                const file = data.files[0];

                                const nameArr = data.files.map((f) => f.name);
                                const name = nameArr.join(", ");    
                                
                                const isProgressing = data.progress !== 100;
                                const isSuccess = data.isSuccess === true;
                                const isError = data.isError === true;

                                return (
                                        <div key={data.id} className="h-20 flex gap-2 items-center p-4 rounded border-t">

                                            <div className={`w-12 h-8 ${getColor(file.type)} rounded flex items-center justify-center text-xs uppercase select-none`}>
                                                {name.substring(0,1)}
                                            </div> 

                                            <div className="w-full flex flex-col gap-1">
                                                <p className="text-blackdefault text-xs">
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
                                            <p className="text-blackdefault/75 text-xs min-w-[36px] text-center">%{data.progress}</p>
                                        </div>
                                )
                            })
                        }

                    </div>
                </Animate>
            }
        </>
    );
}

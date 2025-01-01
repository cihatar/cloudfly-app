import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Check, CloudDownload, Minus } from "lucide-react";
import { getColor } from "@/utils/color";

export default function UploadProgress() {
    return (
        <>
            <Button className="fixed bottom-6 right-6 z-50 bg-bluedefault hover:bg-bluedefault/95 rounded-full shadow-md w-12 h-12">
                <CloudDownload />
            </Button>
            <div className="fixed bottom-0 lg:bottom-6 lg:right-6 z-50 bg-slate-100 rounded w-full lg:w-80 border-2 shadow-md">
                <div className="font-semibold text-lg p-4 flex items-center justify-between">
                    <h2 className="">Uploads</h2>
                    <Button className="bg-transparent text-blackdefault p-0 hover:bg-transparent">
                        <Minus />
                    </Button>
                </div>
                <div className="max-h-[195px] overflow-y-auto text-whitedefault">
                    <div className="flex gap-2 items-center p-4 rounded border-t">
                        <div className={`w-12 h-8 ${getColor("application/zip")} rounded flex items-center justify-center text-xs uppercase select-none`}>
                            A
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <p className="text-blackdefault text-xs">
                                test.zip
                            </p>
                            <Progress value={70} className="h-1" />
                        </div>
                        <p className="text-blackdefault/75 text-xs min-w-[36px] text-center">%70</p>
                    </div>
                    <div className="flex gap-2 items-center p-4 rounded border-t">
                        <div className={`w-12 h-8 ${getColor("image/jpeg")} rounded flex items-center justify-center text-xs uppercase select-none`}>
                            B
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <p className="text-blackdefault text-xs">
                                test.jpg
                            </p>
                            <Progress value={40} className="h-1" />
                        </div>
                        <p className="text-blackdefault/75 text-xs min-w-[36px] text-center">%40</p>
                    </div>
                    <div className="flex gap-2 items-center p-4 rounded border-t">
                        <div className={`w-12 h-8 bg-greendefault rounded flex items-center justify-center text-xs uppercase select-none`}>
                            <Check className="scale-75"/>
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <p className="text-blackdefault text-xs">
                                test.mp3
                            </p>
                            <Progress value={100} className="h-1" />
                        </div>
                        <p className="text-blackdefault/75 text-xs min-w-[36px] text-center">%100</p>
                    </div>
                </div>
            </div>
        </>
    );
}

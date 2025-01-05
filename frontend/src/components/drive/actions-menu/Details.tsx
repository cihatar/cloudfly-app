import { getFileInformation } from "@/api/api";
import Animate from "@/components/global/Animate";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { getColor } from "@/utils/color";
import { useQuery } from "@tanstack/react-query";
import { Globe, Loader2, Lock } from "lucide-react";

export default function Details({ _id, originalName, isSheetOpen, setIsSheetOpen }: { _id: string; originalName: string; isSheetOpen: boolean; setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>; }) {
    const { data, isLoading } = useQuery({
        queryKey: ["file-details", _id],
        queryFn: () => getFileInformation(_id),
        enabled: isSheetOpen
    });
    
    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent>
                {isLoading ? 
                <>
                    <SheetHeader>
                        <SheetTitle className="text-center">{originalName}</SheetTitle>
                        <SheetDescription className="text-center">Loading details about your file...</SheetDescription>
                    </SheetHeader>
                    <div className="w-full h-full flex items-center justify-center">
                        <Loader2 className="animate-spin" />
                    </div>
                </>
                :
                <Animate>
                    <SheetHeader>
                    <div>
                        <div className={`mx-auto flex items-center justify-center w-36 h-36 ${getColor(data?.mimeType)} font-semibold text-xl text-whitedefault uppercase rounded my-4 select-none pointer-events-none`}>
                            {data?.type}
                        </div>
                        <SheetTitle className="text-center">{data?.originalName}</SheetTitle>
                    </div>
                    <SheetDescription className="text-center">Details about your file</SheetDescription>
                    <Separator />
                    </SheetHeader>
                    <div className="mt-4 flex flex-col items-start space-y-2 rounded text-muted-foreground text-sm">
                        <p>
                            File name: <span className="text-blackdefault/75 font-semibold">{data?.originalName}</span>
                        </p>
                        <p>
                            Size: <span className="text-blackdefault/75 font-semibold">{data?.size}</span>
                        </p>
                        <p>
                            Type: <span className="text-blackdefault/75 font-semibold uppercase">{data?.type}</span>
                        </p>
                        <p>
                            Starred: <span className="text-blackdefault/75 font-semibold">{data?.isStarred ? "This file is starred" : "This file is not starred"}</span>
                        </p>
                        <p>
                            Created on: <span className="text-blackdefault/75 font-semibold">{data?.createdAt}</span>
                        </p>
                        <p>
                            Updated on: <span className="text-blackdefault/75 font-semibold">{data?.updatedAt}</span>
                        </p>
                    </div>
                    <Separator className="my-4"/>
                    {
                        data?.publicKey ?
                        <div className="w-full text-muted-foreground text-sm">
                            <p><Globe className="scale-75 inline-block" /> This file is public</p>
                            <a className="text-bluedefault break-words" href={import.meta.env.VITE_BASE_URL + `/download/${data?.publicKey}`} target="_blank">
                                {import.meta.env.VITE_BASE_URL + `/download/${data?.publicKey}`}
                            </a>
                        </div>
                        :
                        <div className="w-full text-muted-foreground text-sm">
                            <p><Lock className="scale-75 inline-block" /> This file is private</p>                        
                        </div>
                    }
                </Animate>
                }
            </SheetContent>
        </Sheet>
    );
}

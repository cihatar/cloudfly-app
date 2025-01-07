import Animate from "@/components/global/Animate";
import { CustomButton } from "@/components/global/FormElements";
import { DownloadIcon } from "lucide-react";

export default function Download() {
    return (
        <div className="h-screendefault lg:grid lg:grid-cols-[1fr,400px] flex flex-col">
            
            {/* preview */}
            <div className="w-full h-full flex items-center justify-center p-6 overflow-hidden">
                <Animate className="w-full h-full flex items-center justify-center rounded-md overflow-hidden">
                    <p className="text-xs text-zinc-500 select-none">This file cannot be previewed</p>
                </Animate>
            </div>

            {/* download & information */}
            <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 px-6 py-4">
                <Animate>
                    <div className="flex items-center gap-2 mb-4 p-2 border rounded-md">
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/default-profile-image.jpg`} alt="" className="rounded-md w-8 h-8"/>
                        <div className="text-start">
                            <p className="font-semibold text-sm">
                                John Doe
                            </p>
                            <p className="text-zinc-500 text-xs">
                                Owner
                            </p>
                        </div>
                    </div>
                    <p className="font-bold text-xs text-muted-foreground p-2">
                        Details
                    </p>
                    <ul className="flex flex-col items-start space-y-2 text-muted-foreground text-sm bg-zinc-200 dark:bg-zinc-800 rounded-md p-2">
                        <li>
                            <p>
                                File name: <span className="text-zinc-800 dark:text-zinc-200 font-semibold">test.zip</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Size: <span className="text-zinc-800 dark:text-zinc-200 font-semibold">1.0 GB</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Type: <span className="text-zinc-800 dark:text-zinc-200 font-semibold uppercase">ZIP</span>
                            </p>
                        </li>
                    </ul>
                    <CustomButton className="w-full mt-4 bg-bluedefault hover:bg-bluedefault/95 text-white">
                        <DownloadIcon />
                        Download
                    </CustomButton>
                </Animate>
            </div>
        </div>
    )
}

import Animate from "@/components/global/Animate";
import { InputField } from "@/components/global/FormElements";
import { Subtitle, Title } from "@/components/global/Titles";
import { Search } from "lucide-react";

export default function QuickAccess() {
    return (
        <>
        <Animate>

            {/* title & search */}  
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 justify-between">
                <Title className="whitespace-nowrap">Quick Access</Title>
                <div className="relative w-full">
                    <InputField className="rounded-full pl-12" type="text" placeholder="Search files and folders"  />
                    <Search className="scale-75 absolute top-2 left-4" />
                </div>
            </div>

            <Subtitle className="mt-12 text-xs text-zinc-800 dark:text-zinc-200">Last uploaded files</Subtitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4 text-xs transition-all duration-300">
            
                <div className="item w-full h-48 flex flex-col items-start border rounded-md group overflow-hidden relative hover:bg-zinc-100 dark:hover:bg-zinc-900">
                    <div className="w-full h-full p-2">
                        <div className={`flex items-center justify-center h-32 font-semibold text-xl text-white bg-blue-400 uppercase rounded-md mb-2 select-none pointer-events-none`}>
                            MP4
                        </div>
                        <p className="font-medium select-none">video.mp4</p>
                        <p className="text-zinc-500 select-none">mp4</p>
                    </div>
                </div>

                <div className="item w-full h-48 flex flex-col items-start border rounded-md group overflow-hidden relative hover:bg-zinc-100 dark:hover:bg-zinc-900">
                    <div className="w-full h-full p-2">
                        <div className={`flex items-center justify-center h-32 font-semibold text-xl text-white bg-zinc-600 uppercase rounded-md mb-2 select-none pointer-events-none`}>
                            TXT
                        </div>
                        <p className="font-medium select-none">notes.txt</p>
                        <p className="text-zinc-500 select-none">txt</p>
                    </div>
                </div>
            </div>

            <Subtitle className="mt-12 text-xs text-zinc-800 dark:text-zinc-200">Last updated files</Subtitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4 text-xs transition-all duration-300">
                <div className="item w-full h-48 flex flex-col items-start border rounded-md group overflow-hidden relative hover:bg-zinc-100 dark:hover:bg-zinc-900">
                    <div className="w-full h-full p-2">
                        <div className={`flex items-center justify-center h-32 font-semibold text-xl text-white bg-purple-400 uppercase rounded-md mb-2 select-none pointer-events-none`}>
                            MP3
                        </div>
                        <p className="font-medium select-none">test.mp3</p>
                        <p className="text-zinc-500 select-none">mp3</p>
                    </div>
                </div>
            </div>
            
        </Animate>

        </>
  )
}

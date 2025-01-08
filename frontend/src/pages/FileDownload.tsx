import Animate from "@/components/global/Animate";
import Preview from "@/components/file/download/Preview";
import Details from "@/components/file/download/Details";

export default function FileDownload() {
    return (
        <div className="h-screendefault lg:grid lg:grid-cols-[1fr,400px] flex flex-col">
            
            {/* preview */}
            <div className="w-full h-full flex items-center justify-center p-6 overflow-hidden">
                <Animate className="w-full h-full flex items-center justify-center rounded-md overflow-hidden">
                    <Preview />
                </Animate>
            </div>

            {/* download & information */}
            <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 px-6 py-4">
                <Animate className="w-full h-full">
                    <Details />
                </Animate>
            </div>
        </div>
    )
}

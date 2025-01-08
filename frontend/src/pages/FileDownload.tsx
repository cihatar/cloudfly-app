import Animate from "@/components/global/Animate";
import Preview from "@/components/file/download/Preview";
import Details from "@/components/file/download/Details";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { getFileDetailsPublic, getFilePreviewPublic } from "@/api/api";
  
export default function FileDownload() {
    let { key } = useParams();
    if (!key) key = '';
    
    const results = useQueries({
        queries: [
            { queryKey: ['file-preview-public'], queryFn: () => getFilePreviewPublic(key) },
            { queryKey: ['file-details-public'], queryFn: () => getFileDetailsPublic(key) },
        ],
        combine(results) {
            return {
                data: results.map((result) => result.data),
                isLoading: results.some((result) => result.isPending),
                filePreviewError: results[0].data?.error || null,
                fileDetailsError: results[1].data?.error || null,
            }
        },
    });
    
    const { data: [filePreviewResult, fileDetailsResult], isLoading, filePreviewError, fileDetailsError } = results;   

    return (
        <div className="h-screendefault lg:grid lg:grid-cols-[1fr,400px] flex flex-col">
            
            {/* preview */}
            <div className="w-full h-full flex items-center justify-center p-6 overflow-hidden">
                <Animate className="w-full h-full flex items-center justify-center rounded-md overflow-hidden">
                    <Preview data={filePreviewResult} isLoading={isLoading} error={filePreviewError}/>
                </Animate>
            </div>

            {/* download & information */}
            <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 px-6 py-4">
                <Animate className="w-full h-full">
                    <Details data={fileDetailsResult} isLoading={isLoading} error={fileDetailsError} keyProp={key} />
                </Animate>
            </div>
        </div>
    )
}

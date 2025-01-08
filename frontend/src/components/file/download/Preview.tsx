import { previewFile } from "@/utils/preview"
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Preview({ data, isLoading, error }: { data: any, isLoading: boolean, error: string }) {
    const [preview, setPreview] = useState<{ type: string | null, previewData: string | undefined }>({
        type: null,
        previewData: undefined,
    });

    useEffect(() => {
        if (data?.data && data?.headers) {
            const type = data.headers['content-type'];
            const previewData = previewFile(type, data.data);
            setPreview({ type, previewData });
        }
    }, [data]);

    return (
        <>
            {
                isLoading ? <Loader2 className="animate-spin" />
                :
                error ? <p className="text-xs text-zinc-500 select-none">{error}</p>
                :
                preview.type?.startsWith("image/") && preview?.previewData ?
                <img src={preview.previewData} alt="" className="h-full object-cover rounded-md" />
                :
                preview.type?.startsWith("video/") && preview?.previewData ?
                <video src={preview.previewData} controls className="w-full h-full object-cover rounded-md" />
                :
                preview.type?.startsWith("audio/") && preview?.previewData ?
                <audio src={preview.previewData} controls />
                :
                preview.type?.startsWith("text/plain") && preview?.previewData ?
                <p className="text-xs whitespace-pre-wrap break-words">
                    {preview.previewData.length > 1000 ? preview.previewData?.substring(0, 1000) + "...": preview.previewData}
                </p>
                :
                <p className="text-xs text-zinc-500 select-none">This file cannot be previewed</p>
            }
        </>
        
    )
}

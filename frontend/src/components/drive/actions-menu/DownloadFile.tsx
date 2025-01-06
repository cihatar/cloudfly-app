import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import customAxios from "@/config/axios";
import useCustomToast from "@/hooks/useCustomToast";

export default function DownloadFile({ _id, originalName }: { _id: string; originalName: string; }) {
    // toast
    const showToast = useCustomToast();

    // handle download
    const handleDownload = async () => {
        try {
            const res = await customAxios.get(`/api/drive/download/${_id}`, {
                responseType: "arraybuffer",
            });
            const blob = new Blob([res.data], { type: res.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href= url;
            link.download= originalName;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            showToast("Something went wrong", false);
        }
    }

    return (
        <Button onClick={handleDownload} variant="secondary" className="w-full justify-start bg-transparent cursor-default">
            <Download className="mr-1"/>
            <span>Download</span>
        </Button>
    );
}

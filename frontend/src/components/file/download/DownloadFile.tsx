import { CustomButton } from "@/components/global/FormElements";
import customAxios from "@/config/axios";
import useCustomToast from "@/hooks/useCustomToast";
import { Download } from "lucide-react";
import { useParams } from "react-router-dom";

export default function DownloadFile({ originalName }: { originalName: string }) {
    const { key } = useParams();

    // toast
    const showToast = useCustomToast();

    // handle download
    const handleDownload = async () => {
        try {
            const res = await customAxios.get(`/api/drive/download-public/${key}`, {
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
        <CustomButton onClick={handleDownload} className="w-full mt-4 bg-bluedefault hover:bg-bluedefault/95 text-white">
            <Download />
            <span>Download</span>
        </CustomButton>
    )
}

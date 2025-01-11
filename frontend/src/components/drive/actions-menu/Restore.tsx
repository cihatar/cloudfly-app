import { restore } from "@/api/api";
import { CustomButton } from "@/components/global/FormElements";
import useCustomToast from "@/hooks/useCustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RotateCcw } from "lucide-react";

export default function Restore({ _id, parent, type }: { _id: string, parent: string, type: string }) {
    // toast
    const showToast = useCustomToast();

    // query
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (data: { _id: string, type: string }) => restore(data),
        onSuccess: (data) => {
            showToast(data.message);
            queryClient.invalidateQueries({ queryKey: ['drive', parent || "root"]});
            queryClient.invalidateQueries({ queryKey: ['trash']});
        },
        onError: (data: any) => {
            showToast(data.response.data.error, false);
        }
    });

    // handle restore
    const handleClick = () => {
        mutate({ _id, type });
    }

    return (
        <CustomButton onClick={handleClick} type="button" variant="secondary" effect={false} className="w-full justify-start bg-transparent cursor-default">
            <RotateCcw className="mr-1"/>
            <span>Restore</span>
        </CustomButton>
    )
}

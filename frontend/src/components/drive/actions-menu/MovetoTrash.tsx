import { moveToTrash } from "@/api/api";
import { CustomButton } from "@/components/global/FormElements";
import useCustomToast from "@/hooks/useCustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

export default function MovetoTrash({ _id, parent, type }: { _id: string, parent: string, type: string }) {
    // toast
    const showToast = useCustomToast();

    // query
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (data: { _id: string, type: string }) => moveToTrash(data),
        onSuccess: (data) => {
            showToast(data.message);
            queryClient.invalidateQueries({ queryKey: ['drive', parent || "root"]});
            queryClient.invalidateQueries({ queryKey: ['starred']});
            queryClient.invalidateQueries({ queryKey: ['trash']});
        },
        onError: (data: any) => {
            showToast(data.response.data.error, false);
        }
    });

    // handle move to trash
    const handleClick = () => {
        mutate({ _id, type });
    }

    return (
        <CustomButton onClick={handleClick} type="button" variant="secondary" effect={false} className="w-full justify-start bg-transparent cursor-default">
            <Trash2 className="mr-1"/>
            <span>Move to Trash</span>
        </CustomButton>
    )
}

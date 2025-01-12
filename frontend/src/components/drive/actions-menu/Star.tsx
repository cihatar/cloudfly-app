import { star } from '@/api/api';
import { CustomButton } from '@/components/global/FormElements'
import useCustomToast from '@/hooks/useCustomToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FolderHeart } from 'lucide-react'

export default function Star({ _id, parent, type }: { _id: string, parent: string, type: string }) {
    // toast
    const showToast = useCustomToast();

    // query
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (data: { _id: string, type: string }) => star(data),
        onSuccess: (data) => {
            showToast(data.message);
            queryClient.invalidateQueries({ queryKey: ['drive', parent || "root"]});
            queryClient.invalidateQueries({ queryKey: ['starred']});
        },
        onError: (data: any) => {
            showToast(data.response.data.error, false);
        }
    });

    // handle star
    const handleClick = () => {
        mutate({ _id, type });
    }

    return (
        <CustomButton onClick={handleClick} variant="secondary" effect={false} className="w-full justify-start bg-transparent cursor-default">
            <FolderHeart className="mr-1"/>
            Add to Starred
        </CustomButton>
    )
}

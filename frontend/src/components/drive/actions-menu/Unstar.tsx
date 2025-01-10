import { unstar } from '@/api/api';
import { CustomButton } from '@/components/global/FormElements'
import useCustomToast from '@/hooks/useCustomToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StarOff } from 'lucide-react'

export default function Unstar({ _id, parent, type }: { _id: string, parent: string, type: string }) {
    // toast
    const showToast = useCustomToast();

    // query
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (data: { _id: string, type: string }) => unstar(data),
        onSuccess: (data) => {
            showToast(data.message);
            queryClient.invalidateQueries({ queryKey: ['drive', parent || "root"]});
        },
        onError: (data: any) => {
            showToast(data.response.data.error, false);
        }
    });

    // handle unstar
    const handleClick = () => {
        mutate({ _id, type });
    }

    return (
        <CustomButton onClick={handleClick} variant="secondary" effect={false} className="w-full justify-start bg-transparent cursor-default">
            <StarOff className="mr-1"/>
            <span>Remove from Starred</span> 
        </CustomButton>
    )
}

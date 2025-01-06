import { useToast } from "./use-toast"

export default function useCustomToast() {
    const { toast } = useToast();

    const showToast = (description: string, success: boolean = true) => {
        return toast({
            title: success ? "Success" : "Error",
            description: description,
            duration: 3000,
            style: {
                color: "#fafafa",
                backgroundColor: success ? "#5cb85c" : "#ef4444",
                border: 'none',
            },
        });
    }

    return showToast;
}

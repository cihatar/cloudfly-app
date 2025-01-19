import useCustomToast from "@/hooks/useCustomToast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/user/userSlice";
import { CustomButton } from "../global/FormElements";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadContext } from "@/context/UploadContext";

export default function LogoutButton() {
    // redux
    const dispatch = useAppDispatch();

    // context
    const { closeUploadProgress } = useUploadContext();
    
    // navigate
    const navigate = useNavigate();

    // toast
    const showToast = useCustomToast();

    // query
    const queryClient = useQueryClient();

    // handle logout
    const handleLogout = () => {
        dispatch(logout())
            .unwrap()
            .then((res) => {
                showToast(res.message);
                queryClient.clear();
                closeUploadProgress();
                navigate("/");
            })
            .catch((err) => {
                showToast(err, false);
            });
    };

    return (
        <CustomButton
            onClick={handleLogout}
            type="button"
            variant="secondary"
            effect={false}
            className="h-5 bg-transparent p-0 font-normal"
        >
                Logout
        </CustomButton>
    );
}

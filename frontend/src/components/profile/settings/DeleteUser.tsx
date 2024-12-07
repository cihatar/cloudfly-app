import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteUser() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="submit" variant="destructive">
                    Delete Your Account
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Account Request</DialogTitle>
                    <DialogDescription>
                        In case you delete your account, all the data you have
                        uploaded will be permanently removed.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start gap-2">
                    <Button type="submit" variant="destructive">
                        Confirm
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

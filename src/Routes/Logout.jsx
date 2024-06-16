/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function LogoutDialog({ open, onClose, onLogout }) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Session Expired</DialogTitle>
                    <DialogDescription className="mt-2">
                        Your session has expired. Please log out and log in again.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onLogout} variant="destructive">Logout</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

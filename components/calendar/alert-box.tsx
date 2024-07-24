"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteEvent } from "@/services/mutaions";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  id:string |number
  handleReset:()=>void
}

export function AlertDialogBox({
  open,
  setOpen,
  id,
  handleReset
}: Props) {
 

  const { mutate: deleteEvent, isPending } = useDeleteEvent(handleReset);
  const handleClose = () => {
    setOpen((pre) => !pre);
    handleReset()
  };

  const deleteHandle = () => {
    
   deleteEvent(id as string);
   
  };

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            event.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter >
          <Button size={"sm"} onClick={handleClose} className="mt-3 md:mt-0">
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={deleteHandle}
            disabled={isPending}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

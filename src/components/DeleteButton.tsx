'use client';

import { useState, useTransition } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from './ui/alert-dialog';

import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { deleteNoteAction } from '@/actions/notes';

function DeleteButton({ noteId }: { noteId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteNote = async () => {
    startTransition(async () => {
      const { errorMessage } = await deleteNoteAction(noteId);

      if (!errorMessage) {
        setIsOpen(false);
        toast.success('Note deleted successfully');
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger className="absolute -right-2" onClick={() => setIsOpen(true)}>
        <Trash2 className="size-5 text-destructive/50" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>Are you sure you want to delete this note?</AlertDialogHeader>
        <AlertDialogDescription>This action cannot be undone. This will delete the note permanently.</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)} disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <form action={handleDeleteNote}>
            <AlertDialogAction className="bg-destructive hover:bg-destructive hover:brightness-110" type="submit" disabled={isPending}>
              {isPending ? 'Deleting Note...' : 'Delete Note'}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteButton;

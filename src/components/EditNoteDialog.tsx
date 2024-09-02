import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import toast from 'react-hot-toast';

import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { DialogHeader, DialogFooter, DialogContent } from './ui/dialog';

import { Note as NoteType } from '@/db/schemas/notes';

import { updateNoteAction } from '@/actions/notes';

type Props = {
  note: NoteType;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function EditNoteDialog({ note, setOpen }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleUpdateNote = async (formData: FormData) => {
    startTransition(async () => {
      const updatedText = formData.get('text') as string;
      const { errorMessage } = await updateNoteAction(note.id, updatedText);

      if (!errorMessage) {
        setOpen(false);
        toast.success('Note updated successfully');
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>Edit Note</DialogHeader>

      <form action={handleUpdateNote}>
        <Textarea id="text" name="text" defaultValue={note.text} disabled={isPending} className="mb-6 mt-2 min-h-[300px]" />

        <DialogFooter>
          <Button className="w-40" type="submit" variant="secondary" disabled={isPending}>
            {isPending ? 'Updating Note...' : 'Update Note'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default EditNoteDialog;

import { Dispatch, SetStateAction, useTransition } from 'react';
import toast from 'react-hot-toast';

import { DialogContent, DialogFooter, DialogHeader } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

import { addNoteAction } from '@/actions/notes';

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function NewNoteDialog({ setOpen }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAddNote = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await addNoteAction(formData);

      if (!errorMessage) {
        toast.success('Note added successfully');
        setOpen(false);
      } else {
        toast.error(errorMessage);
      }
    });
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>Add New Note</DialogHeader>

      <form action={handleAddNote}>
        <Textarea id="text" name="text" disabled={isPending} className="mb-6 mt-2 min-h-[300px]" />

        <DialogFooter>
          <Button className="w-40" type="submit" variant="secondary" disabled={isPending}>
            {isPending ? 'Adding Note...' : 'Add Note'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default NewNoteDialog;

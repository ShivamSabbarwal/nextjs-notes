'use client';

import { useState } from 'react';

import { Dialog, DialogTrigger } from './ui/dialog';
import EditNoteDialog from './EditNoteDialog';

import { Pen } from 'lucide-react';

import { Note as NoteType } from '@/db/schemas/notes';
import { cn } from '@/lib/utils';

type Props = {
  note: NoteType;
  className?: string;
};

function EditButton({ note, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn('text-secondary hover:text-primary translate-colors duration-200 ease-in-out', className)}
        onClick={() => setOpen(true)}
      >
        <Pen className="size-5 text-muted-foreground" />
      </DialogTrigger>

      <EditNoteDialog note={note} setOpen={setOpen} />
    </Dialog>
  );
}

export default EditButton;

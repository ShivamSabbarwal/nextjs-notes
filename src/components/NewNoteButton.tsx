'use client';

import { useState } from 'react';

import { Dialog, DialogTrigger } from './ui/dialog';
import NewNoteDialog from './NewNoteDialog';

import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

function NewNoteButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn('text-secondary hover:text-primary translate-colors duration-200 ease-in-out', className)}
        onClick={() => setOpen(true)}
      >
        <Plus className="size-6 sm:size-8" />
      </DialogTrigger>

      <NewNoteDialog setOpen={setOpen} />
    </Dialog>
  );
}

export default NewNoteButton;

'use server';

import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';

import db from '@/db';
import { notes } from '@/db/schemas/notes';

import { getUser } from '@/lib/auth';
import { getErrorMessage } from '@/lib/utils';

export const addNoteAction = async (formData: FormData) => {
  try {
    const user = await getUser();

    const text = formData.get('text') as string;

    await db.insert(notes).values({
      text,
      userId: user.id,
    });

    revalidatePath('/');

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const deleteNoteAction = async (noteId: number) => {
  try {
    const user = await getUser();

    await db.delete(notes).where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath('/');

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const updateNoteAction = async (noteId: number, text: string) => {
  try {
    const user = await getUser();

    await db
      .update(notes)
      .set({ text, updatedAt: new Date() })
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath('/');

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

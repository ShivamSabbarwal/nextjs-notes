import { desc, eq } from 'drizzle-orm';

import Header from '@/components/Header';
import Note from '@/components/Note';

import db from '@/db';
import { notes } from '@/db/schemas/notes';

import { getUser } from '@/lib/auth';

export default async function Home() {
  const user = await getUser();

  const _notes = await db.select().from(notes).where(eq(notes.userId, user.id)).orderBy(desc(notes.createdAt));
  return (
    <main className="flex min-h-screen flex-col items-center px-4 pb-2">
      <Header />

      <div className="mt-8 grid w-full max-w-[1800px] grid-col-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {_notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </main>
  );
}

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const pushMigration = async () => {
  const migrationClient = postgres(process.env.DB_URL, { max: 1 });
  const migrationDb = drizzle(migrationClient);

  await migrate(migrationDb, { migrationsFolder: './src/db/migrations/drizzle' });

  await migrationClient.end();
};

pushMigration();

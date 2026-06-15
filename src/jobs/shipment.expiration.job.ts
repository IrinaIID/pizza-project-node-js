import { ConnectionOptions, Queue, Worker } from 'bullmq';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { shipments } from '../db/schema.js';
import { sql } from 'drizzle-orm';
import { redis } from '../common/redis.js';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool);

export const expirationQueue = new Queue('expiration-job', {
  connection: redis as unknown as ConnectionOptions,
});

await expirationQueue.add(
  'run-expiration',
  {},
  {
    repeat: {
      pattern: '0 0 * * *', // every day at midnight
    },
  },
);

new Worker(
  'expiration-job',
  async () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    await db.delete(shipments).where(sql`${shipments.createdAt} < ${weekAgo}`);
  },
  {
    connection: redis as unknown as ConnectionOptions,
  },
);

import { Queue, Worker, ConnectionOptions } from 'bullmq';
import { redis } from '../common/redis.js';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { orders } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool);

export const staleOrderQueue = new Queue('stale-order-job', {
  connection: redis as unknown as ConnectionOptions,
});

export async function scheduleStaleOrder(orderId: number) {
  await staleOrderQueue.add(
    'mark-stale',
    { orderId },
    {
      delay: 2 * 60 * 60 * 1000, // 2 hours
    },
  );
}

new Worker(
  'stale-order-job',
  async (job) => {
    const { orderId } = job.data;

    const order = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);

    if (!order.length) return;

    if (order[0].status !== 'READY') {
      await db.update(orders).set({ status: 'STALE' }).where(eq(orders.id, orderId));
    }
  },
  {
    connection: redis as unknown as ConnectionOptions,
  },
);

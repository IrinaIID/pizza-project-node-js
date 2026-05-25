import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // @TODO use env
    url: 'postgresql://postgres:postgres@127.0.0.1:5432/pizza',
  },
} satisfies Config;

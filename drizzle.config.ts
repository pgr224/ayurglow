import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  driver: 'd1-http', // For D1 compatibility if using local proxy, but for migrations D1 works with sqlite dialect
});

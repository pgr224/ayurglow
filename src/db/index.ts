import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import { getRequestContext } from "@cloudflare/next-on-pages";

export const getDb = async () => {
  const env = getRequestContext().env as CloudflareEnv;
  
  if (!env.DB) {
    throw new Error('D1 Database binding (DB) not found');
  }
  
  return drizzle(env.DB, { schema });
};

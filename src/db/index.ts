import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import { getOptionalRequestContext } from "@cloudflare/next-on-pages";

export const getDb = async () => {
  const requestContext = getOptionalRequestContext();
  if (!requestContext) {
    throw new Error('Cloudflare request context is not available');
  }

  const env = requestContext.env as CloudflareEnv;
  
  if (!env.DB) {
    throw new Error('D1 Database binding (DB) not found');
  }
  
  return drizzle(env.DB, { schema });
};

import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const getDb = async () => {
  // In a production Next.js app on Cloudflare Pages, 
  // you must access the platform bindings from the context.
  const { env } = await getCloudflareContext();
  
  if (!env.DB) {
    throw new Error('D1 Database binding (DB) not found');
  }
  
  return drizzle(env.DB, { schema });
};

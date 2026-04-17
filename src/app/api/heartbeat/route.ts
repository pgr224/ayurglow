export const runtime = 'edge'

export async function GET() {
  return new Response(JSON.stringify({ status: 'alive', timestamp: new Date().toISOString() }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  })
}

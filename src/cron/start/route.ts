import "@/cron"

export async function GET() {
  return Response.json({ started: true })
}
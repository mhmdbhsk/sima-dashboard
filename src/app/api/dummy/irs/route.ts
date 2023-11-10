import { irsDummyData } from '@/config/dummy-data'

export async function GET() {
  return Response.json({ data: irsDummyData })
}

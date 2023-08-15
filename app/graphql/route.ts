import { handler } from '#/graphql'

export async function GET(request: Request) {
  return handler(request)
}

export async function POST(request: Request) {
  return handler(request)
}

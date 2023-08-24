import { cookies } from 'next/headers'

const MeQuery = `#graphql
  query Me {
    me {
      email
      id
    }
  }
`

export const getMe = async () => {
  const cookie = cookies().get('session')

  if (!cookie) return null

  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `session=${cookie.value}`,
    },
    body: JSON.stringify({
      query: MeQuery,
    }),
  })
  const { data } = await response.json()

  return data
}

interface AuthenticationProps {
  children: React.ReactNode
}

export const Authentication = async ({ children }: AuthenticationProps) => {
  const data = await getMe()

  return (
    <>
      {data?.me.email}
      {children}
    </>
  )
}

export default Authentication

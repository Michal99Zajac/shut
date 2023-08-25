'use client'

import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

const meQuery = gql`
  query Me {
    me {
      id
      email
    }
  }
`

export default function Home() {
  const { data } = useSuspenseQuery(meQuery)

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
      <div>Main Page</div>
    </div>
  )
}

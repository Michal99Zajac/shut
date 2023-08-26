'use client'

import { gql, useSuspenseQuery } from '@apollo/client'

const meQuery = gql`
  query Me {
    me {
      id
      email
    }
  }
`

export function RootPage() {
  const { data } = useSuspenseQuery(meQuery)

  return (
    <div>
      <div>Root Page</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

export default RootPage

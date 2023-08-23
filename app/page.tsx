import { Authentication } from '@/common/contexts/Authentication'

export default function Home() {
  return (
    <Authentication>
      <main>Hello World!</main>
    </Authentication>
  )
}

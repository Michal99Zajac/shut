import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * Hook to get and set query params
 */
export const useQuery = <T = any>() => {
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()

  const set = (key: string, value: string | null) => {
    const temp = new URLSearchParams(params.toString())

    if (value === null) {
      temp.delete(key)
    } else {
      temp.set(key, value)
    }

    router.push(`${pathname}?${temp.toString()}`)
  }

  return { query: Object.fromEntries(params.entries()) as Partial<T>, set }
}

export default useQuery

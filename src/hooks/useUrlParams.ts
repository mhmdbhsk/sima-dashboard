import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useUrlParams = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const getParam = (key: string) => {
    const params = new URLSearchParams(searchParams)
    return params.get(key)
  }

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(key, value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams)
    params.delete(key)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const clearParams = () => {
    router.replace(`${pathname}`)
  }

  return { getParam, setParam, removeParam, clearParams }
}

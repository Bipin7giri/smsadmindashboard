import useSWR from 'swr'
import { fetcher } from '../pages/api/axios'
// const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useSampleClients = (search?: string) => {
  const { data, error, mutate } = useSWR(
    `/auth/allusers?search=${encodeURIComponent(search)}`,
    fetcher
  )

  return {
    mutate,
    clients: data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useDepartments = () => {
  const { data, error, mutate } = useSWR('/department', fetcher)
  return {
    mutate,
    departments: data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
export const useCountStatus = () => {
  const { data, error } = useSWR('/stats/count', fetcher)
  return {
    countStatus: data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
export const useUserStauts = ()=>{
  const {data,error}  = useSWR("/stats/department/users",fetcher)
  return {
    userStatus:data??[],
    isUserStatusError:!error && !data,
    iseUserStatusError:error
  }
}

export const useSampleTransactions = () => {
  const { data, error } = useSWR('/admin-one-react-tailwind/data-sources/history.json', fetcher)
  return {
    transactions: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
export const useNotificationList = () => {
  const { data, error } = useSWR('/admin/notification', fetcher)
  return {
    notification: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

import { string } from 'yup'

export type UserPayloadObject = {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  address?: string
  userEmail?: string
  avatar?: string
  token?: string
  userAvatar?: string
}

export type searchObj = {
  search?: string
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

export type Client = {
  id?: number
  firstName?: string
  lastName?: string
  phoneNumber?: string
  address?: string
  email?: string
  avatar?: string
  token?: string
  createdAt?: string
  roleId?: any
  blocked?: boolean
}

export type Notifications = {
  id?: number
  title: string
  body: string
  createdAt: string
}

export type Department = {
  id?: number
  name?: string
  teacher?: string[]
  semesterId?: any
  createdAt?: string
  hod?: any
}

export type StyleKey = 'white' | 'basic'

export type UserForm = {
  firstName?: string
  email?: string
  lastName?: string
  phoneNumber?: string
  address?: string
}

export type TokenDecode = {
  email: string
  exp: number
  iat: number
  roles: any
}

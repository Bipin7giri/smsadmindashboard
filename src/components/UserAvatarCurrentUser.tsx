import React, { ReactNode } from 'react'
import { useAppSelector } from '../stores/hooks'
import UserAvatar from './UserAvatar'

type Props = {
  className?: string
  children?: ReactNode
  avatar?: string
}

export default function UserAvatarCurrentUser({ className = '', children, avatar }: Props) {
  const userName = useAppSelector((state) => state.main.firstName)
  const userAvatar = useAppSelector((state) => state.main.userAvatar)

  return (
    <UserAvatar username={userName} avatar={avatar} className={className}>
      {children}
    </UserAvatar>
  )
}

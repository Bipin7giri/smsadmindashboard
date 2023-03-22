export const GetAccessToken = () => {
  let token: string
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    token = localStorage.getItem('access_token')
    return token
  }
}

export const RemoveAccessToken = () => {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    localStorage.removeItem('access_token')
    localStorage.removeItem('isLogin')
  }
}

export const IsLogin = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isLogin')
  }
}

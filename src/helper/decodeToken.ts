import jwtDecode from 'jwt-decode'

export function decodeAccessToken(accessToken: string) {
  try {
    return jwtDecode(accessToken)
  } catch (e) {
    return null
  }
}

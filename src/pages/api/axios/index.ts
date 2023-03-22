import axios from 'axios'
import { GetAccessToken } from '../../../helper/getAccessToken'

export const api = axios.create({
  baseURL: 'https://sms-twox.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: GetAccessToken(),
  },
})

// local
// export const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   headers: {
//     Authorization: GetAccessToken() || null,
//   },
// })

export const fetcher = (url) =>
  fetch('https://sms-twox.onrender.com/api' + url, {
    headers: {
      Authorization: GetAccessToken() || null,
    },
  }).then((res) => res.json())

// export const fetcher = (url) =>
//   fetch('http://localhost:5000/api' + url, {
//     headers: {
//       Authorization: GetAccessToken() || null,
//     },
//   }).then((res) => res.json())

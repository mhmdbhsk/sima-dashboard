import axios from 'axios'

export const axiosInterceptorInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    // const accessToken = JSON.parse(localStorage.getItem('token'))

    // if (accessToken) {
    //   if (config.headers) config.headers.token = accessToken
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

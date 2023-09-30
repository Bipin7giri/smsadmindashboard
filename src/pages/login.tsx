import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/SectionFullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/FormField'
import FormCheckRadio from '../components/FormCheckRadio'
import BaseDivider from '../components/BaseDivider'
import BaseButtons from '../components/BaseButtons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import { api } from './api/axios'
import { Button, notification } from 'antd'
import { useDispatch } from 'react-redux'
import { setUser } from '../stores/mainSlice'
import { RemoveAccessToken } from '../helper/getAccessToken'
import { Space, Spin } from 'antd'
type VALUES = {
  email?: string
  password?: string
}

const openNotification = (message: string) => {
  notification.open({
    message: message,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!')
    },
  })
}

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isLoding, setIsLoading] = useState(false)
  const isLogout: any = router.query?.logout
  useEffect(() => {
    if (isLogout === 'true' || isLogout === true) {
      RemoveAccessToken()
    }
  }, [isLogout])
  const [error, setError] = useState({
    email: '',
    password: '',
  })
  const handleSubmit = (values: VALUES) => {
    if (values.email && values.password) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)
      ) {
        console.log('test')
        setIsLoading(true)
        api
          .post('/auth/admin/login', values)
          .then((response) => {
            console.log(response)
            openNotification(response?.data?.message)
            setIsLoading(false)
            if (response.status === 200) {
              dispatch(setUser({ token: response.data.access_token }))

              router.push('/dashboard')
            }
          })
          .catch((error) => {
            openNotification(error?.response?.data?.message)
            setIsLoading(false)
            console.error(error)
          })
      } else {
        setError({ ...error, email: 'invallid email' })
      }
    } else {
      setError({ ...error, email: 'required', password: 'required' })
    }
  }
  const handleRegister = () => {
    router.push('/register')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          {isLoding && <Spin className="w-full" size="large" />}

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values: VALUES) => handleSubmit(values)}
          >
            <Form>
              <FormField label="email" help="Please enter your login">
                <Field name="email" />
              </FormField>
              <p className="text-red-400"> {error.email}</p>

              <FormField label="Password" help="Please enter your password">
                <Field name="password" type="password" />
              </FormField>
              <p className="text-red-400"> {error.password}</p>


              <BaseDivider />

              <BaseButtons>
                <BaseButton type="submit" label="Login" color="info" />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

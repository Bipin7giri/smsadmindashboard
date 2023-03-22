import {
  mdiAccount,
  mdiAccountDetails,
  mdiAsterisk,
  mdiCheckDecagram,
  mdiFormTextboxPassword,
  mdiGithub,
  mdiMail,
  mdiUpload,
} from '@mdi/js'
import useSWR from 'swr'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import BaseButton from '../components/BaseButton'
import BaseButtons from '../components/BaseButtons'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import CardBoxComponentBody from '../components/CardBoxComponentBody'
import CardBoxComponentFooter from '../components/CardBoxComponentFooter'
import FormField from '../components/FormField'
import FormFilePicker from '../components/FormFilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import UserCard from '../components/UserCard'
import type { UserForm } from '../interfaces'
import { getPageTitle } from '../config'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { api, fetcher } from './api/axios'
import FormCheckRadio from '../components/FormCheckRadio'
import PillTag from '../components/PillTag'
import UserAvatarCurrentUser from '../components/UserAvatarCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import { Button, notification } from 'antd'
import { useRouter } from 'next/router'
import { setUser } from '../stores/mainSlice'
const openNotification = (message: string) => {
  notification.open({
    message: message,
    onClick: () => {
      console.log('Notification Clicked!')
    },
  })
}

const ProfilePage = () => {
  const router = useRouter()
  function reloadPage() {
    if (typeof window !== 'undefined') {
      // window.location.reload()
    }
  }

  const { data, error } = useSWR('/auth/users/me', fetcher)
  const test = useSelector((state) => state)
  console.log(test)
  const userName = useSelector((state: any) => state.main.firstName)
  const lastName = useSelector((state: any) => state.main.lastName)
  const phoneNumber = useSelector((state: any) => state.main.phoneNumber)
  const address = useSelector((state: any) => state.main.address)
  const userEmail = useSelector((state: any) => state.main.userEmail)
  console.log(phoneNumber)
  const userForm: UserForm = {
    firstName: data?.firstName,
    lastName: data?.lastName,
    phoneNumber: data?.phoneNumber,
    address: data?.address,
  }
  const dispatch = useAppDispatch()

  const handleUserPatch = (values: UserForm) => {
    api
      .patch('/auth/users/me', values)
      .then((response) => {
        console.log(response.data)
        openNotification(response.data)
      })
      .catch((error) => {
        openNotification(error.response.data.message)
      })
  }

  return (
    <>
      {data && (
        <>
          <Head>
            <title>{getPageTitle('Profile')}</title>
          </Head>

          <SectionMain>
            <SectionTitleLineWithButton icon={mdiAccount} title="Profile" main>
              <BaseButton
                href="https://github.com/justboil/admin-one-react-tailwind"
                target="_blank"
                icon={mdiGithub}
                label="Star on GitHub"
                color="contrast"
                roundedFull
                small
              />
            </SectionTitleLineWithButton>

            <CardBox>
              <div className="flex flex-col lg:flex-row items-center justify-around lg:justify-center">
                <UserAvatarCurrentUser
                  avatar={data.avatar}
                  className="mb-6 lg:mb-0 lg:mx-[100px]"
                />
                <div className="space-y-3 text-center md:text-left lg:mx-12 lg">
                  <div className="flex justify-center md:block">
                    <Formik
                      initialValues={{
                        notifications: ['1'],
                      }}
                      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                    >
                      <Form>
                        <FormCheckRadio type="switch" label="Notifications">
                          <Field type="checkbox" name="notifications" value={'1'} />
                        </FormCheckRadio>
                      </Form>
                    </Formik>
                  </div>
                  <h1 className="text-2xl">{userEmail}</h1>
                  <p>
                    Last login <b>12 mins ago</b> from <b>127.0.0.1</b>
                  </p>
                  <div className="flex justify-center md:block">
                    <PillTag label="Verified" color="info" icon={mdiCheckDecagram} />
                  </div>
                </div>
              </div>
            </CardBox>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <CardBox className="mb-6">
                  <FormField label="Avatar" help="Max 500kb">
                    <FormFilePicker label="Upload" color="info" icon={mdiUpload} />
                  </FormField>
                </CardBox>
                <CardBox className="flex-1" hasComponentLayout>
                  <Formik
                    initialValues={userForm}
                    onSubmit={(values: UserForm) => handleUserPatch(values)}
                  >
                    <Form className="flex flex-col flex-1">
                      <CardBoxComponentBody>
                        <FormField
                          label="firstName"
                          help="Required. Your name"
                          labelFor="firstName"
                          icons={[mdiAccount]}
                        >
                          <Field name="firstName" id="firstName" placeholder="Name" />
                        </FormField>
                        <FormField
                          label="LastName"
                          help="Required. Your e-mail"
                          labelFor="lastName"
                          icons={[mdiAccountDetails]}
                        >
                          <Field name="lastName" id="lastName" placeholder="LastName" />
                        </FormField>
                        <FormField
                          label="phoneNumber"
                          help="Required. Your phoneNumber"
                          labelFor="phoneNumber"
                          icons={[phoneNumber]}
                        >
                          <Field name="phoneNumber" id="phoneNumber" placeholder="phoneNumber" />
                        </FormField>
                        <FormField
                          label="address"
                          help="Required. Your address"
                          labelFor="address"
                          icons={[address]}
                        >
                          <Field name="address" id="address" placeholder="address" />
                        </FormField>
                      </CardBoxComponentBody>
                      <CardBoxComponentFooter>
                        <BaseButtons>
                          <BaseButton color="info" type="submit" label="Submit" />
                          <BaseButton color="info" label="Options" outline />
                        </BaseButtons>
                      </CardBoxComponentFooter>
                    </Form>
                  </Formik>
                </CardBox>
              </div>

              <CardBox hasComponentLayout>
                <Formik
                  initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    newPasswordConfirmation: '',
                  }}
                  onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                >
                  <Form className="flex flex-col flex-1">
                    <CardBoxComponentBody>
                      <FormField
                        label="Current password"
                        help="Required. Your current password"
                        labelFor="currentPassword"
                        icons={[mdiAsterisk]}
                      >
                        <Field
                          name="currentPassword"
                          id="currentPassword"
                          type="password"
                          autoComplete="current-password"
                        />
                      </FormField>

                      <BaseDivider />

                      <FormField
                        label="New password"
                        help="Required. New password"
                        labelFor="newPassword"
                        icons={[mdiFormTextboxPassword]}
                      >
                        <Field
                          name="newPassword"
                          id="newPassword"
                          type="password"
                          autoComplete="new-password"
                        />
                      </FormField>

                      <FormField
                        label="Confirm password"
                        help="Required. New password one more time"
                        labelFor="newPasswordConfirmation"
                        icons={[mdiFormTextboxPassword]}
                      >
                        <Field
                          name="newPasswordConfirmation"
                          id="newPasswordConfirmation"
                          type="password"
                          autoComplete="new-password"
                        />
                      </FormField>
                    </CardBoxComponentBody>

                    <CardBoxComponentFooter>
                      <BaseButtons>
                        <BaseButton color="info" type="submit" label="Submit" />
                        <BaseButton color="info" label="Options" outline />
                      </BaseButtons>
                    </CardBoxComponentFooter>
                  </Form>
                </Formik>
              </CardBox>
            </div>
          </SectionMain>
        </>
      )}
    </>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProfilePage

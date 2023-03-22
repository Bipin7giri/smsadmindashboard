import { mdiChartTimelineVariant, mdiFormatListNumberedRtl } from '@mdi/js'
// eslint-disable-next-line @next/next/no-document-import-in-page
import React from 'react'
import type { ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle } from '../config'
import BaseButtons from '../components/BaseButtons'
import Head from 'next/head'
import BaseDivider from '../components/BaseDivider'
import LayoutAuthenticated from '../layouts/Authenticated'
import { Formik, Form, Field } from 'formik'
import { api } from './api/axios'
import { notification } from 'antd'

export interface searchData {
  abel: string
  value: string
}
const Notification = () => {
  const openNotification = (message: string) => {
    notification.open({
      message: message,
    })
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Department')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Notification" main>
          <BaseButton
            href="/notificationlist"
            icon={mdiFormatListNumberedRtl}
            label="View Notification"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Notification</p>
                    <p>Please fill out all the fields.</p>
                    <p>
                      A system-wide notification will be sent to all users. In terms of content, you
                      could include information about what the notification is regarding, whether
                      it's urgent or not, and any actions the users may need to take. It's also
                      helpful to make sure the notification is clear and concise, so users can
                      easily understand the message.
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <Formik
                        initialValues={{
                          title: '',
                          body: '',
                        }}
                        onSubmit={(values) => {
                          api
                            .post('/admin/notification', { title: values.title, body: values.body })
                            .then((res) => {
                              openNotification(res.data.message)
                            })
                            .catch((err) => {
                              openNotification(err.message)
                            })
                        }}
                      >
                        <Form className="">
                          <label htmlFor="full_name">Title</label>
                          <Field
                            className="h-10 border mt-1 rounded px-4 sm:w-[250px] lg:w-[600px] bg-gray-200"
                            name="title"
                            placeholder="title"
                          />
                          <BaseDivider />
                          <label htmlFor="full_name">Body</label>
                          <Field
                            className="h-14 border mt-1 rounded px-4 lg:w-[600px] bg-gray-200"
                            name="body"
                            placeholder="body"
                          />
                          <BaseDivider />

                          <BaseButtons>
                            <BaseButton type="submit" color="info" label="Submit" />
                          </BaseButtons>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBox>
      </SectionMain>
    </>
  )
}

Notification.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Notification

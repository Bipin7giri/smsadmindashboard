  import {
    mdiNotificationClearAll,
  } from '@mdi/js'
  // eslint-disable-next-line @next/next/no-document-import-in-page
  import React, { useState } from 'react'
  import type { ReactElement } from 'react'
  import BaseButton from '../components/BaseButton'
  import SectionMain from '../components/SectionMain'
  import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
  import { getPageTitle } from '../config'
  import BaseButtons from '../components/BaseButtons'
  import Head from 'next/head'
  import LayoutAuthenticated from '../layouts/Authenticated'
  import { useNotificationList } from '../hooks/sampleData'
  import {Notifications } from '../interfaces'
  import moment from 'moment'

  export interface searchData {
    abel: string
    value: string
  }

  interface s {
    // renamed from ITrueFalse
    searchList: searchData[]
  }
  const Notification = () => {
    const { notification } = useNotificationList()

  const perPage = 5

    const [currentPage, setCurrentPage] = useState(0)

    const notificationPagination = notification?.slice(perPage * currentPage, perPage * (currentPage + 1))

    const numPages = notification?.length / perPage

    const pagesList = []

    for (let i = 0; i < numPages; i++) {
      pagesList.push(i)
    }

    return (
      <>
        <Head>
          <title>{getPageTitle('Department')}</title>
        </Head>

        <SectionMain>
          <>
            <SectionTitleLineWithButton  title="Send Notification" main icon={''}>
              <BaseButton
                href="/notification"
                icon={mdiNotificationClearAll}
                label="send notification"
                color="contrast"
                roundedFull
                small
              />
            </SectionTitleLineWithButton>
            <>
              {/* component */}
              <>
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Title</th>
              <th>Body</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {notificationPagination?.map((client: Notifications) => (
              <tr key={client.id} className="relative">
                  <td data-label="SN">
                    {client.id}
                </td>
                <td data-label="title">{client.title}</td>
                <td data-label="body">{client.body}</td>
                <td data-label="address">
                  <span className="text-gray-700">{moment(client.createdAt).fromNow()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
            <BaseButtons>
              {pagesList.map((page) => (
                <BaseButton
                  key={page}
                  active={page === currentPage}
                  label={page + 1}
                  color={page === currentPage ? 'lightDark' : 'whiteDark'}
                  small
                  onClick={() => setCurrentPage(page)}
                />
              ))}
            </BaseButtons>
            <small className="mt-6 md:mt-0">
              Page {currentPage + 1} of {numPages}
            </small>
          </div>
        </div>
      </>

              <style
                dangerouslySetInnerHTML={{
                  __html: '.checkbox:checked + .check-icon {\n  display: flex;\n}\n',
                }}
              />
            </>
          </>
        </SectionMain>
      </>
    )
  }

  Notification.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
  }

  export default Notification

import { mdiAccountMultiple, mdiBookEducation, mdiListStatus } from '@mdi/js'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import CardBoxWidget from '../components/CardBoxWidget'
import { useCountStatus, useDepartments, useUserStauts } from '../hooks/sampleData'
import { Department } from '../interfaces'
import CardBox from '../components/CardBox'
import { sampleChartData } from '../components/ChartLineSample/config'
import TableSampleClients from '../components/TableSampleClients'
import { getPageTitle } from '../config'
import { notification } from 'antd'
import Error from './error'
import Chart from '../components/charts/Charts'
// import Pie from '../components/charts/Pie'

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

const Dashboard = () => {
  const { departments, isLoading, isError } = useDepartments()
  const { countStatus } = useCountStatus()
  const { isUserStatusError, iseUserStatusError, userStatus } = useUserStauts()
  console.log(userStatus)
  // useEffect(() => {
  //   if (isError) {
  //     openNotification(isError)
  //   }
  // }, [])

  if (isError) {
    return <Error />
  }
  // const [chartData, setChartData] = useState(sampleChartData())

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    // setChartData(sampleChartData())
  }

  const cardsData = Object.entries(countStatus).map(([title, count]) => ({
    title: title.charAt(0).toUpperCase() + title.slice(1),
    count: count as string, // Explicitly cast count to string or number
  }))
  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        {/* <Pie /> */}

        <SectionTitleLineWithButton
          icon={mdiListStatus}
          title="System Status"
        ></SectionTitleLineWithButton>

        <div className="grid grid-cols-3 gap-1">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md p-4 text-center"
              style={{
                backgroundImage: 'linear-gradient(to right, #4F46E5, #D32DFF)',
                width: 'calc(100% - 2rem)',
                maxWidth: '18rem',
                margin: '0 auto',
              }}
            >
              <h2 className="text-xl font-bold mb-2 text-white">{card.title}</h2>
              <p className="text-gray-100">{card.count}</p>
            </div>
          ))}
        </div>
        <SectionTitleLineWithButton
          icon={mdiListStatus}
          title="System Graphical Status"
        ></SectionTitleLineWithButton>
        <div>
          <Chart data={userStatus} />
        </div>

        <SectionTitleLineWithButton
          icon={mdiBookEducation}
          title="Department"
        ></SectionTitleLineWithButton>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          {departments?.map((department: Department) => (
            <CardBoxWidget
              key={department.id}
              trendLabel={department.name}
              trendType="info"
              trendColor="info"
              icon={mdiBookEducation}
              iconColor="info"
              number={department.semesterId.length}
              numberSuffix=" Semester"
              label="Departments"
            />
          ))}
        </div>

        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Users" />
        <CardBox hasTable>
          <TableSampleClients />
        </CardBox>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard

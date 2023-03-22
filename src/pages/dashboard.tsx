import { mdiAccountMultiple, mdiBookEducation } from '@mdi/js'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import CardBoxWidget from '../components/CardBoxWidget'
import { useDepartments } from '../hooks/sampleData'
import { Department } from '../interfaces'
import CardBox from '../components/CardBox'
import { sampleChartData } from '../components/ChartLineSample/config'
import TableSampleClients from '../components/TableSampleClients'
import { getPageTitle } from '../config'
import { notification } from 'antd'
import Error from './error'
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

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        {/* <Pie /> */}
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

import {
  mdiChartTimelineVariant,
  mdiGithub,
  mdiAccount,
  mdiHomeAccount,
  mdiHoopHouse,
} from '@mdi/js'
// eslint-disable-next-line @next/next/no-document-import-in-page
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import FormField from '../components/FormField'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle } from '../config'
import BaseButtons from '../components/BaseButtons'
import Head from 'next/head'
import BaseDivider from '../components/BaseDivider'

import LayoutAuthenticated from '../layouts/Authenticated'
import { Formik, Form, Field } from 'formik'
import { notification, Select } from 'antd'
import { useSampleClients } from '../hooks/sampleData'
import { api } from './api/axios'
import { GetAccessToken } from '../helper/getAccessToken'
import Password from 'antd/es/input/Password'

export interface searchData {
  abel: string
  value: string
}

interface s {
  // renamed from ITrueFalse
  searchList: searchData[]
}
const Departments = () => {
  const { clients } = useSampleClients()

  const [hod, setHod] = useState('')
  const [name, setName] = useState('')

  const openNotification = (message: string, color?: string) => {
    if (color) {
      notification.open({
        message: <h1 className="text-red-400">{message}</h1>,
      })
    } else {
      notification.open({
        message: message,
      })
    }
  }
  const [users, setUsers] = useState([])
  const fetchRoles = async () => {
    const res: any = await api('/auth/allusers', {
      headers: {
        Authorization: GetAccessToken() || null,
      },
    })
    const data = res?.data
    console.log(data)
    const tempRoles = []
    data?.map((user) => {
      tempRoles.push({ value: user.id, label: user.email })
    })
    setUsers([...tempRoles])
  }
  useEffect(() => {
    fetchRoles()
  }, [])

  return (
    <>
      <Head>
        <title>{getPageTitle('Department')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Department" main>
          <BaseButton
            href="/departmentlist"
            icon={mdiHoopHouse}
            label="Department List"
            color="lightDark"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            onSubmit={(values) => {
              if (!values.name || !values?.email || !values?.password) {
                openNotification('Required filed', 'error')
                return
              }
              api
                .post('/department', {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                })
                .then((res) => {
                  openNotification('successfully added')
                })
                .catch((err) => {
                  openNotification(err.message)
                })
            }}
          >
            <Form>
              <FormField label="Grouped with icons" icons={[mdiHomeAccount, mdiAccount]}>
                <Field name="name" placeholder="name" />
                <Field name="email" placeholder="HOD Email" />
                <Field type="password" name="password" placeholder="Password" />

                {/* <Field type="hod" name="bod" placeholder="hod" /> */}
                {/* <Select
                  showSearch
                  style={{ width: 300 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={users}
                  onChange={(e: any) => {
                    setHod(e)
                  }}
                /> */}
              </FormField>
              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

Departments.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Departments

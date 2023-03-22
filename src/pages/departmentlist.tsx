import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { ReactElement, useEffect, useState } from 'react'
import { useDepartments, useSampleClients } from '../hooks/sampleData'
import { Client, Department } from '../interfaces'
import BaseButton from '../components/BaseButton'
import BaseButtons from '../components/BaseButtons'
import CardBoxModal from '../components/CardBoxModal'
import { Modal } from 'antd'
import { useAppSelector } from '../stores/hooks'
import { Avatar } from 'antd'
import { Select } from 'antd'
import { GetAccessToken } from '../helper/getAccessToken'
import { api } from '../pages/api/axios'
import moment from 'moment'
import { notification } from 'antd'
import LayoutAuthenticated from '../layouts/Authenticated'
import CardBox from '../components/CardBox'
import SectionMain from '../components/SectionMain'
const { confirm } = Modal
import { Menu, Dropdown } from 'antd'
const key = 'updatable'
const DepartmentList = () => {
  const { searchData } = useAppSelector((state) => state.search)
  const { departments, isError, mutate } = useDepartments()

  const openNotification = (message: string) => {
    notification.open({
      message: message,
    })
  }

  const showConfirm = (id: any) => {
    confirm({
      content: 'Do you want to block this user?',
      onOk() {
        openNotification('OKE')

        // api
        //   .patch('/auth/blockuser', {
        //     userId: id,
        //   })
        //   .then((res) => {
        //     openNotification(res.data.message)
        //     mutate(null)
        //   })
        //   .catch((err) => {
        //     openNotification(err.message)
        //   })
      },
      onCancel() {
        console.log('Cancel')
      },
      okButtonProps: { style: { backgroundColor: 'red', borderColor: 'red' } },
    })
  }

  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)

  const departmentPaginate = departments?.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = departments?.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }
  const [userById, setUserById] = useState([])

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const [semester, setSemester] = useState([])

  useEffect(() => {
    const data = departments?.semesterId

    const tempSemester = []
    data?.map((sem) => {
      alert()
      tempSemester.push({ value: sem.id, label: sem.name.toUpperCase() })
    })
    setSemester([...tempSemester])
  }, [])

  const changeRole = async (roleId: string, userId: any) => {
    // api
    //   .patch('auth/users-roles', {
    //     roleId: roleId,
    //     userId: userId,
    //   })
    //   .then((res) => {
    //     openNotification(res?.data?.message)
    //     mutate(null)
    //   })
    //   .catch((err) => {
    //     alert(err)
    //   })
  }
  return (
    <>
      <SectionMain>
        <CardBox className="mb-6" hasTable>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>HOD</th>
                <th>Semester</th>
                <th>Created</th>
                <th>Actions</th>
                {/* <th>email</th>
                <th>Address</th>
                <th>Contact</th>
                <th className="flex justify-center py-5">Role</th>
              
                <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {departmentPaginate?.map((department: Department) => (
                <tr key={department.id} className="relative">
                  <td data-label="name">{department.name}</td>
                  <td data-label="email">{department.hod.email}</td>
                  <td data-label="email">
                    <div className="flex">
                      <div>
                        <Dropdown
                          overlay={
                            <Menu>
                              {department.semesterId.map((item, id) => {
                                return (
                                  <>
                                    <Menu.Item key="0">{item.name}</Menu.Item>
                                  </>
                                )
                              })}
                            </Menu>
                          }
                          trigger={['hover']}
                        >
                          <a
                            className="text-blue-400 hover:cursor-pointer"
                            onClick={(e) => e.preventDefault()}
                          >
                            Semester List
                          </a>
                        </Dropdown>
                      </div>
                    </div>
                  </td>
                  <td data-label="address">
                    <span className="text-gray-700">{moment(department.createdAt).fromNow()}</span>
                  </td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons type="justify-start lg:justify-end" noWrap>
                      <BaseButton
                        color="danger"
                        icon={mdiTrashCan}
                        onClick={() => showConfirm(department.id)}
                        small
                      />
                    </BaseButtons>
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
        </CardBox>
      </SectionMain>
    </>
  )
}
DepartmentList.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DepartmentList

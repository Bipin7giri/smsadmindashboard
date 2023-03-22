import { mdiEye, mdiTrashCan, mdiUndo } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import { useSampleClients } from '../hooks/sampleData'
import { Client } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import { Modal } from 'antd'
import { useAppSelector } from '../stores/hooks'
import { Avatar } from 'antd'
import { Select } from 'antd'
import { GetAccessToken } from '../helper/getAccessToken'
import { api } from '../pages/api/axios'
import moment from 'moment'
import { notification } from 'antd'

const { confirm } = Modal

const key = 'updatable'
const TableSampleClients = () => {
  const { searchData } = useAppSelector((state) => state.search)
  const { clients, mutate } = useSampleClients(searchData)

  const openNotification = (message: string) => {
    notification.open({
      message: message,
    })
  }

  const showConfirm = (id: any, status: boolean) => {
    if (status === true) {
      confirm({
        content: 'Do you want to block this user?',
        onOk() {
          api
            .patch('/auth/blockuser', {
              userId: id,
            })
            .then((res) => {
              openNotification(res.data.message)
              mutate(null)
            })
            .catch((err) => {
              openNotification(err.message)
            })
        },
        onCancel() {
          console.log('Cancel')
        },
        okButtonProps: { style: { backgroundColor: 'red', borderColor: 'red' } },
      })
    } else {
      confirm({
        content: 'Do you want to unblock this user?',
        onOk() {
          api
            .patch('/auth/unblockuser', {
              userId: id,
            })
            .then((res) => {
              openNotification('User Unblocked')
              mutate(null)
            })
            .catch((err) => {
              openNotification(err.message)
            })
        },
        onCancel() {
          console.log('Cancel')
        },
        okButtonProps: { style: { backgroundColor: 'green', borderColor: 'green' } },
      })
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients?.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = clients?.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }
  const [userById, setUserById] = useState([])
  // const userById = []
  const showModal = (id: any) => {
    const getUserById = clients.filter((item: Client) => {
      if (item.id === id) {
        return item
      }
    })
    setUserById([...getUserById])
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const [roles, setRoles] = useState([])
  const fetchRoles = async () => {
    const res: any = await api('/role', {
      headers: {
        Authorization: GetAccessToken() || null,
      },
    })
    const data = res.data.allRole
    const tempRoles = []
    data.map((role) => {
      tempRoles.push({ value: role.id, label: role.name.toUpperCase() })
    })
    setRoles([...tempRoles])
  }
  useEffect(() => {
    fetchRoles()
  }, [])

  const changeRole = async (roleId: string, userId: any) => {
    api
      .patch('auth/users-roles', {
        roleId: roleId,
        userId: userId,
      })
      .then((res) => {
        openNotification(res?.data?.message)
        mutate(null)
      })
      .catch((err) => {
        alert(err)
      })
  }
  return (
    <>
      <CardBoxModal
        // title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <div className="flex items-center justify-center">
          <div className="relative w-full group max-w-md min-w-0 mx-auto  mb-6 break-words bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:max-w-sm rounded-xl">
            <div className="pb-2">
              <div className="flex justify-center">
                <Avatar size={140} src={userById[0]?.avatar} />
              </div>
              <div className="mt-2 text-center">
                <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                  {userById[0]?.firstName} {''}
                  {userById[0]?.lastName}
                </h3>
                <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                  <div className="text-sm font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                    <ul>
                      <li className="text-sm">Email : {userById[0]?.email}</li>
                      <li className="text-sm">PhoneNumber : {userById[0]?.phoneNumber}</li>
                      <li className="text-sm">Address : {userById[0]?.address}</li>
                      {userById[0]?.hod.length === 1 && (
                        <li className="text-sm">Department Hod : {userById[0]?.hod[0]?.name}</li>
                      )}

                      <li className="text-sm">
                        Roles :{' '}
                        {userById[0]?.roleId?.roles?.map((item: string) => {
                          return (
                            <li className="inline px-1" key={item}>
                              {item}
                            </li>
                          )
                        })}
                      </li>
                    </ul>
                  </div>
                  {/* End: /typography/_h3.antlers.html */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>email</th>
            <th>Address</th>
            <th>Contact</th>
            <th className="flex justify-center py-5">Role</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clientsPaginated?.map((client: Client) => (
            <tr key={client.id} className="relative">
              <td data-label="firstname">
                <Avatar size={40} src={client.avatar} />
              </td>
              <td data-label="firstname">
                {client.firstName}
                {''} {''}
                {client.lastName}
              </td>
              <td data-label="email">{client.email}</td>
              <td data-label="address">{client.address}</td>
              <td data-label="email">{client.phoneNumber}</td>
              <td data-label="email">
                {client.blocked === true && (
                  <span className="absolute -top-1 -left-10  p-1 translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full text-sm text-white">
                    Blocked
                  </span>
                )}

                <div className="flex">
                  <div>
                    <Select
                      showSearch
                      defaultValue={client?.roleId?.name.toUpperCase()}
                      style={{ width: 200 }}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      options={roles}
                      onChange={(e: any) => {
                        changeRole(e, client.id)
                      }}
                    />
                  </div>
                </div>
              </td>
              <td data-label="address">
                <span className="text-gray-700">{moment(client.createdAt).fromNow()}</span>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color="info"
                    icon={mdiEye}
                    onClick={() => {
                      showModal(client.id)
                      setIsModalInfoActive(true)
                    }}
                    small
                  />
                  {client.blocked === true ? (
                    <BaseButton
                      color="success"
                      icon={mdiUndo}
                      onClick={() => showConfirm(client.id, false)}
                      small
                    />
                  ) : (
                    <BaseButton
                      color="danger"
                      icon={mdiTrashCan}
                      onClick={() => showConfirm(client.id, true)}
                      small
                    />
                  )}
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
    </>
  )
}

export default TableSampleClients

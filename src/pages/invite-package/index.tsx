import type { FC } from 'react'
import { useIntl, useLocation } from 'umi'
import { Space, Button } from 'antd'
import { useState, useEffect } from 'react'
import { FilterOutlined } from '@ant-design/icons'
import { invitePackages, users } from '@/services'
import type { changeValues } from './_List'
import List from './_List'
import DrawerFilter from './_Drawer/filter'

const InvitePackagePage: FC = () => {
  const intl = useIntl()
  const location = useLocation()

  const state =
    location.state !== undefined
      ? (location.state as { filter: API.Admin.InvitePackageFilterItem[] })
      : { filter: undefined }
  const [filter, setFilter] = useState<API.Admin.InvitePackageFilterItem[] | undefined>(
    state.filter,
  )
  const [listUpdateStatus, setListUpdateStatus] = useState(false)
  const [drawerFilterVisible, setDrawerFilterVisible] = useState(false)
  const [adminInvitePackages, setAdminInvitePackages] = useState<API.Admin.InvitePackageItem[]>()
  const [adminUsers, setAdminUsers] = useState<API.Admin.UserItem[]>()
  const [pageSize, setPageSize] = useState(10)
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    ;(async () => {
      if (adminInvitePackages !== undefined && listUpdateStatus === false) {
        return
      }
      const invitePackagesResult = await invitePackages({ pageSize, current, filter })
      if (invitePackagesResult === undefined) {
        return
      }

      setAdminInvitePackages(invitePackagesResult.data)
      setTotal(invitePackagesResult.total)

      const needUserIds: number[] = []
      invitePackagesResult.data.map((item: API.Admin.InvitePackageItem) => {
        if (needUserIds.includes(item.user_id) === false) {
          needUserIds.push(item.user_id)
        }
        if (needUserIds.includes(item.from_user_id) === false) {
          needUserIds.push(item.from_user_id)
        }
      })

      if (needUserIds.length > 0) {
        const usersResult = await users({
          pageSize: needUserIds.length,
          current: 1,
          filter: [
            {
              condition: 'in',
              key: 'id',
              value: needUserIds.join(','),
            },
          ],
        })

        if (usersResult === undefined) {
          return
        }
        setAdminUsers(usersResult.data)
      } else {
        setAdminUsers([])
      }
      setListUpdateStatus(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdateStatus])

  return (
    <>
      <div className="p-0 p-lg-4">
        <div className="d-flex justify-content-between align-items-center" />
        <div className="block block-rounded block-bordered ">
          <div className="bg-white">
            <div className="p-3">
              <Space>
                <Button
                  value="large"
                  icon={<FilterOutlined style={{ verticalAlign: '0.05rem' }} />}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setDrawerFilterVisible(true)
                  }}
                >
                  {intl.formatMessage({ id: 'module.user.filter_btn' })}
                </Button>
              </Space>
            </div>

            {adminUsers !== undefined && (
              <List
                dataSource={adminInvitePackages as []}
                users={adminUsers as []}
                total={total}
                pageSize={pageSize}
                current={current}
                onChange={(values: changeValues) => {
                  setPageSize(values.pageSize)
                  setCurrent(values.pageCurrent)
                  setListUpdateStatus(true)
                }}
              />
            )}
          </div>
        </div>
      </div>

      <DrawerFilter
        visible={drawerFilterVisible}
        onClose={() => {
          setDrawerFilterVisible(false)
        }}
        onChange={(filterValues: API.Admin.OrderFilterItem[] | undefined) => {
          setFilter(filterValues)
          setListUpdateStatus(true)
          setDrawerFilterVisible(false)
        }}
      />
    </>
  )
}
export default InvitePackagePage

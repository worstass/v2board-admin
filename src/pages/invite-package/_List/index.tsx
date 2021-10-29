import type { FC } from 'react'
import type { TablePaginationConfig } from 'antd/lib/table/interface'
import { Table, Space, Tooltip, Badge } from 'antd'
import { useIntl, Link } from 'umi'
import { QuestionCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import lodash from 'lodash'

const { Column } = Table
export interface changeValues {
  pageSize: number
  pageCurrent: number
  filter?: API.Admin.InvitePackageFilterItem[]
}

export interface listProps {
  dataSource: API.Admin.InvitePackageItem[]
  total: number
  pageSize: number
  current: number
  users: (API.Admin.UserItem & API.User.InfoItem)[]
  onChange: (values: changeValues) => void
}

const List: FC<listProps> = (props) => {
  const { dataSource, total, pageSize, current, users, onChange } = props
  const intl = useIntl()

  const pagenationProps: TablePaginationConfig = {
    pageSize,
    showQuickJumper: false,
    showLessItems: false,
    showSizeChanger: true,
    total,
    size: 'small',
    current,
    pageSizeOptions: ['10', '50', '100', '150'],
  }

  const tableChangeHandler = (pagenation: TablePaginationConfig) => {
    const changes = {
      pageCurrent: pagenation.current as number,
      pageSize: pagenation.pageSize as number,
    }
    onChange(changes)
  }

  return (
    <>
      <Table
        dataSource={dataSource}
        pagination={pagenationProps}
        rowKey="id"
        scroll={{ x: true }}
        onChange={tableChangeHandler}
        loading={dataSource === undefined}
      >
        <Column
          title={intl.formatMessage({ id: 'module.invite_package.list.column.id' })}
          dataIndex="id"
          key="id"
        />

        <Column
          title={intl.formatMessage({ id: 'module.invite_package.list.column.user_id' })}
          dataIndex="user_id"
          key="user_id"
          render={(userId: number) => {
            const user = userId > 0 ? lodash.find(users, { id: userId }) : undefined
            return (
              <>
                <Link
                  to={{
                    pathname: '/user',
                    state: {
                      filter: [
                        {
                          key: 'email',
                          condition: '=',
                          value: user?.email,
                        },
                      ],
                    },
                  }}
                >
                  {user?.email}
                </Link>
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.invite_package.list.column.from_user_id' })}
          dataIndex="from_user_id"
          key="from_user_id"
          render={(fromUserId: number) => {
            const user = fromUserId > 0 ? lodash.find(users, { id: fromUserId }) : undefined
            return (
              <>
                {' '}
                <Link
                  to={{
                    pathname: '/user',
                    state: {
                      filter: [
                        {
                          key: 'email',
                          condition: '=',
                          value: user?.email,
                        },
                      ],
                    },
                  }}
                >
                  {user?.email}
                </Link>
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.invite_package.list.column.value' })}
          dataIndex="value"
          key="value"
          render={(value: number) => {
            return (
              <>
                <Space>{value} GB</Space>
              </>
            )
          }}
        />

        <Column
          title={
            <Space>
              {intl.formatMessage({ id: 'module.invite_package.list.column.status' })}
              <Tooltip
                title={intl.formatMessage({ id: 'module.invite_package.list.column.status.tip' })}
              >
                <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
              </Tooltip>
            </Space>
          }
          dataIndex="status"
          key="status"
          render={(status: number) => {
            return (
              <>
                <Space>
                  {status === 1 && (
                    <Space>
                      <Badge status="success" />
                      {intl.formatMessage({
                        id: 'module.invite_package.list.column.status.activated',
                      })}
                    </Space>
                  )}
                </Space>
              </>
            )
          }}
        />

        <Column
          title={intl.formatMessage({ id: 'module.invite_package.list.column.created_at' })}
          dataIndex="created_at"
          key="created_at"
          render={(createdAt: number) => {
            return moment.unix(createdAt).format('YYYY/MM/DD HH:mm')
          }}
          align="right"
        />
        <Column
          title={intl.formatMessage({ id: 'module.invite_package.list.column.updated_at' })}
          dataIndex="created_at"
          key="created_at"
          render={(createdAt: number) => {
            return moment.unix(createdAt).format('YYYY/MM/DD HH:mm')
          }}
          align="right"
        />
      </Table>
    </>
  )
}
export default List

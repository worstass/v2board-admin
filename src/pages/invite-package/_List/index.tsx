import type { FC } from 'react'
import type { TablePaginationConfig } from 'antd/lib/table/interface'
import { Table, Tag, message, Menu, Space, Tooltip, Badge, Dropdown } from 'antd'
import { useIntl, Link } from 'umi'
import { QuestionCircleOutlined, CaretDownOutlined } from '@ant-design/icons'
import moment from 'moment'
import lodash from 'lodash'
import { invitePackageUpdate } from '@/services'

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
  plans: API.Admin.PlanItem[]
  users: (API.Admin.UserItem & API.User.InfoItem)[]
  onChange: (values: changeValues) => void
  onEditSuccess: () => void
}

const List: FC<listProps> = (props) => {
  const { dataSource, total, pageSize, current, plans, users, onChange, onEditSuccess } = props
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

  const markStatusMenu = (id: number) => (
    <Menu>
      <Menu.Item key="invalid">
        <Link
          to=""
          onClick={async (e: React.MouseEvent) => {
            e.preventDefault()
            const invitePackageUpdateResult = await invitePackageUpdate({ id, status: -1 })
            if (invitePackageUpdateResult === undefined) {
              return
            }
            message.success(
              intl.formatMessage({
                id: 'module.invite_package.list.column.status.unused.mark.message.success',
              }),
            )
            onEditSuccess()
          }}
        >
          {intl.formatMessage({
            id: 'module.invite_package.list.column.status.invalid',
          })}
        </Link>
      </Menu.Item>
    </Menu>
  )
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
            return user?.email
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.invite_package.list.column.plan_id' })}
          dataIndex="plan_id"
          key="plan_id"
          render={(planId: number) => {
            const plan = planId > 0 ? lodash.find(plans, { id: planId }) : undefined
            return plan !== undefined ? plan.name : '-'
          }}
        />

        <Column
          title={intl.formatMessage({ id: 'module.invite_package.list.column.plan_cycle' })}
          dataIndex="plan_cycle"
          key="plan_cycle"
          render={(cycle: string) => {
            return (
              <>
                {cycle === 'month_price' && (
                  <Tag>
                    {intl.formatMessage({
                      id: 'module.invite_package.list.column.plan_cycle.month_price',
                    })}
                  </Tag>
                )}
                {cycle === 'quarter_price' && (
                  <Tag>
                    {intl.formatMessage({
                      id: 'module.invite_package.list.column.plan_cycle.month_price',
                    })}
                  </Tag>
                )}
                {cycle === 'half_year_price' && (
                  <Tag>
                    {intl.formatMessage({
                      id: 'module.invite_package.list.column.plan_cycle.half_year_price',
                    })}
                  </Tag>
                )}
                {cycle === 'year_price' && (
                  <Tag>
                    {intl.formatMessage({
                      id: 'module.invite_package.list.column.plan_cycle.year_price',
                    })}
                  </Tag>
                )}
                {cycle === 'two_year_price' && (
                  <Tag>
                    {intl.formatMessage({
                      id: 'module.invite_package.list.column.plan_cycle.two_year_price',
                    })}
                  </Tag>
                )}
                {cycle === 'three_year_price' && (
                  <Tag>
                    {intl.formatMessage({
                      id: 'module.invite_package.list.column.plan_cycle.three_year_price',
                    })}
                  </Tag>
                )}
                {cycle === 'onetime_price' && (
                  <Tag>
                    {intl.formatMessage({
                      id: 'module.invite_package.list.column.plan_cycle.onetime_price',
                    })}
                  </Tag>
                )}
                {cycle === 'reset_price' && (
                  <Tag>
                    {intl.formatMessage({
                      id: 'module.invite_package.list.column.plan_cycle.reset_price',
                    })}
                  </Tag>
                )}
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
          render={(status: number, record: API.Admin.InvitePackageItem) => {
            return (
              <>
                <Space>
                  {status === -1 && (
                    <Space>
                      <Badge status="error" />
                      {intl.formatMessage({
                        id: 'module.invite_package.list.column.status.invalid',
                      })}
                    </Space>
                  )}

                  {status === 0 && (
                    <Space>
                      <Badge status="processing" />
                      {intl.formatMessage({
                        id: 'module.invite_package.list.column.status.unused',
                      })}

                      <Dropdown
                        overlay={markStatusMenu(record.id)}
                        placement="bottomLeft"
                        trigger={['click']}
                      >
                        <Link
                          to=""
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault()
                          }}
                        >
                          {intl.formatMessage({
                            id: 'module.invite_package.list.column.status.unused.mark',
                          })}
                          <CaretDownOutlined style={{ verticalAlign: '0.05rem' }} />
                        </Link>
                      </Dropdown>
                    </Space>
                  )}

                  {status === 1 && (
                    <Space>
                      <Badge status="default" />
                      {intl.formatMessage({ id: 'module.invite_package.list.column.status.used' })}
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

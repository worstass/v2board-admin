import { FC, useState } from 'react'
import type { IRouteComponentProps } from 'umi'
import { useModel, useIntl } from 'umi'
import { Card, Row, Col, Statistic } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { userStats } from '@/services'

const UserStatsPage: FC<IRouteComponentProps> = (props) => {
  const intl = useIntl()
  const { match } = props
  const { id } = match.params as { id: number }
  const { setMenuName } = useModel('useMenuModel')
  const [adminUserStats, setAdminUserStats] = useState<API.Admin.UserStatsResult>()

  useEffect(() => {
    setMenuName(intl.formatMessage({ id: 'module.user.stats' }))
    ;(async () => {
      const userStatsResult = await userStats({ id })
      if (userStatsResult === undefined) {
        return
      }
      setAdminUserStats(userStatsResult)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="p-3">
        <Card title={intl.formatMessage({ id: 'module.user.stats.invite' })}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} className="p-2">
              <Statistic
                title={intl.formatMessage({ id: 'module.user.stats.invite.user_total' })}
                value={adminUserStats?.data.invite.user_total}
                prefix={<UserOutlined style={{ verticalAlign: '0.1rem' }} />}
              />
            </Col>
            <Col span={8} className="p-2">
              <Statistic
                title={intl.formatMessage({
                  id: 'module.user.stats.invite.activated_packages_total',
                })}
                value={adminUserStats?.data.invite.activated_packages_total}
              />
            </Col>
            <Col span={8} className="p-2">
              <Statistic
                title={intl.formatMessage({
                  id: 'module.user.stats.invite.activated_package_values',
                })}
                value={adminUserStats?.data.invite.activated_package_values}
                suffix="GB"
              />
            </Col>
            <Col span={8} className="p-2">
              <Statistic
                title={intl.formatMessage({
                  id: 'module.user.stats.invite.available_packages_total',
                })}
                value={adminUserStats?.data.invite.available_packages_total}
              />
            </Col>
            <Col span={8} className="p-2">
              <Statistic
                title={intl.formatMessage({ id: 'module.user.stats.invite.plan_changed_total' })}
                value={adminUserStats?.data.invite.plan_changed_total}
              />
            </Col>
            <Col span={8} className="p-2">
              <Statistic
                title={intl.formatMessage({ id: 'module.user.stats.invite.paid_order_total' })}
                value={adminUserStats?.data.invite.paid_order_total}
              />
            </Col>
            <Col span={8} className="p-2">
              <Statistic
                title={intl.formatMessage({ id: 'module.user.stats.invite.traffic_used_total' })}
                value={adminUserStats?.data.invite.traffic_used_total}
              />
            </Col>
            <Col span={8} className="p-2">
              <Statistic
                title={intl.formatMessage({
                  id: 'module.user.stats.invite.traffic_used_and_plan_changed_total',
                })}
                value={adminUserStats?.data.invite.traffic_used_and_plan_changed_total}
              />
            </Col>
            <Col span={8} className="p-2">
              <Statistic
                title={intl.formatMessage({
                  id: 'module.user.stats.invite.traffic_used_or_plan_changed_total',
                })}
                value={adminUserStats?.data.invite.traffic_used_or_plan_changed_total}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </>
  )
}

export default UserStatsPage

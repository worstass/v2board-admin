import type { FC } from 'react'
import { useIntl } from 'umi'
import { Switch } from 'antd'
import { useRef, useState } from 'react'
import { useDebounceFn } from 'ahooks'

export interface formSubscribeProps {
  planChangeEnable: boolean
  resetTrafficMethod: number
  surplusEnable: boolean
  onChange: (data: Record<string, any>) => void
}

const FormSubscribe: FC<Partial<formSubscribeProps>> = (props) => {
  const { planChangeEnable, resetTrafficMethod, surplusEnable, onChange } = props

  const resetTrafficMethodRef = useRef<HTMLSelectElement>(null)
  const [switchPlanChangeEnable, setSwitchPlanChangeEnable] = useState(planChangeEnable)
  const [switchSurplusEnable, setSwitchSurplusEnable] = useState(surplusEnable)

  const intl = useIntl()

  const { run } = useDebounceFn(
    () => {
      const data: Record<string, any> = {
        plan_change_enable: Boolean(switchPlanChangeEnable).valueOf() ? 1 : 0,
        reset_traffic_method: Number(resetTrafficMethodRef.current?.value).valueOf(),
        surplus_enable: Boolean(switchSurplusEnable).valueOf() ? 1 : 0,
      }
      onChange?.(data)
    },
    { wait: 1000 },
  )

  const changeHandler = run

  return (
    <>
      <div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.plan_change_enable' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.plan_change_enable.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchPlanChangeEnable}
              onChange={(checked: boolean) => {
                setSwitchPlanChangeEnable(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.reset_traffic_method' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.subscribe.reset_traffic_method.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <select
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.subscribe.reset_traffic_method.placeholder',
              })}
              defaultValue={resetTrafficMethod}
              onChange={changeHandler}
              ref={resetTrafficMethodRef}
            >
              <option value={0}>
                {intl.formatMessage({
                  id: 'module.config.system.subscribe.reset_traffic_method.option.first_day',
                })}
              </option>
              <option value={1}>
                {intl.formatMessage({
                  id: 'module.config.system.subscribe.reset_traffic_method.option.order_date',
                })}
              </option>
            </select>
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.surplus_enable' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.surplus_enable.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchSurplusEnable}
              onChange={(checked: boolean) => {
                setSwitchSurplusEnable(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FormSubscribe

import type { FC } from 'react'
import { useState } from 'react'
import { useIntl } from 'umi'
import { Switch } from 'antd'
import { useDebounceFn } from 'ahooks'
import { useRef } from 'react'

export interface formInviteProps {
  inviteForce: boolean
  inviteCommission: number
  inviteGenlLimit: number
  inviteNeverExpire: boolean
  commissionFirstTimeEnable: boolean
  commissionAutoCheckEnable: boolean
  commissionWithdrawLimit: number
  commissionWithdrawMethod: string
  withdrawCloseEnable: boolean
  onChange: (data: Record<string, any>) => void
}

const FormInvite: FC<Partial<formInviteProps>> = (props) => {
  const intl = useIntl()
  const {
    inviteForce,
    inviteCommission,
    inviteGenlLimit,
    inviteNeverExpire,
    commissionFirstTimeEnable,
    commissionAutoCheckEnable,
    commissionWithdrawLimit,
    commissionWithdrawMethod,
    withdrawCloseEnable,
    onChange,
  } = props

  const inviteCommissionRef = useRef<HTMLInputElement>(null)
  const inviteGenLimitRef = useRef<HTMLInputElement>(null)
  const commissionWithdrawLimitRef = useRef<HTMLInputElement>(null)
  const commissionWithdrawMethodRef = useRef<HTMLTextAreaElement>(null)

  const [switchInviteForce, setSwitchInviteForce] = useState(inviteForce)
  const [switchInviteNeverExpire, setSwitchInviteNeverExpire] = useState(inviteNeverExpire)
  const [switchCommissionFirstTimeEnable, setSwitchCommissionFirstTimeEnable] =
    useState(commissionFirstTimeEnable)
  const [switchCommissionAutoCheckEnable, setSwitchcommissionAutoCheckEnable] =
    useState(commissionAutoCheckEnable)
  const [switchWithdrawCloseEnable, setSwitchWithdrawCloseEnable] = useState(withdrawCloseEnable)

  const { run } = useDebounceFn(
    () => {
      const data: Record<string, any> = {
        invite_force: Boolean(switchInviteForce).valueOf() ? 1 : 0,
        invite_commission: Number(inviteCommissionRef.current?.value).valueOf(),
        invite_gen_limit: Number(inviteGenLimitRef.current?.value).valueOf(),
        invite_never_expire: Boolean(switchInviteNeverExpire).valueOf() ? 1 : 0,
        commission_first_time_enable: Boolean(switchCommissionFirstTimeEnable).valueOf() ? 1 : 0,
        commission_auto_check_enable: Boolean(switchCommissionAutoCheckEnable).valueOf() ? 1 : 0,
        commission_withdraw_limit: Number(commissionWithdrawLimitRef.current?.value).valueOf(),
        commission_withdraw_method: commissionWithdrawMethodRef.current?.value.split(','),
        withdraw_close_enable: Boolean(switchWithdrawCloseEnable).valueOf() ? 1 : 0,
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
              {intl.formatMessage({ id: 'module.config.system.invite.invite_force' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.invite.invite_force.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchInviteForce}
              onChange={(checked: boolean) => {
                setSwitchInviteForce(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.invite.invite_commission' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.invite.invite_commission.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="number"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.invite.invite_commission.placeholder',
              })}
              ref={inviteCommissionRef}
              defaultValue={inviteCommission}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.invite.invite_gen_limit' })}
            </div>
            <div className="font-size-sm my-1" />
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="number"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.invite.invite_gen_limit.placeholder',
              })}
              defaultValue={inviteGenlLimit}
              ref={inviteGenLimitRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.invite.invite_never_expire' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.invite.invite_never_expire.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchInviteNeverExpire}
              onChange={(checked: boolean) => {
                setSwitchInviteNeverExpire(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({
                id: 'module.config.system.invite.commission_first_time_enable',
              })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.invite.commission_first_time_enable.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchCommissionFirstTimeEnable}
              onChange={(checked: boolean) => {
                setSwitchCommissionFirstTimeEnable(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({
                id: 'module.config.system.invite.commission_auto_check_enable',
              })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.invite.commission_auto_check_enable.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchCommissionAutoCheckEnable}
              onChange={(checked: boolean) => {
                setSwitchcommissionAutoCheckEnable(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({
                id: 'module.config.system.invite.commission_withdraw_limit',
              })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.invite.commission_withdraw_limit.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="number"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.invite.commission_withdraw_limit.placeholder',
              })}
              ref={commissionWithdrawLimitRef}
              defaultValue={commissionWithdrawLimit}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({
                id: 'module.config.system.invite.commission_withdraw_method',
              })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.invite.commission_withdraw_method.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <textarea
              rows={4}
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.invite.commission_withdraw_method.placeholder',
              })}
              defaultValue={commissionWithdrawMethod}
              onChange={changeHandler}
              ref={commissionWithdrawMethodRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({
                id: 'module.config.system.invite.withdraw_close_enable',
              })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.invite.withdraw_close_enable.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchWithdrawCloseEnable}
              onChange={(checked: boolean) => {
                setSwitchWithdrawCloseEnable(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FormInvite

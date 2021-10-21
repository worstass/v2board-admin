import type { ChangeEvent, FC } from 'react'
import { useState } from 'react'
import { useIntl } from 'umi'
import { Switch } from 'antd'
import { useDebounceFn } from 'ahooks'
import { useRef } from 'react'

export interface planItem {
  id: number
  name: string
}

export interface formInviteProps {
  inviteForce: boolean
  inviteCommission: number
  inviteGenlLimit: number
  inviteNeverExpire: boolean
  planItems: planItem[]
  commissionFirstTimeEnable: boolean
  commissionAutoCheckEnable: boolean
  commissionWithdrawLimit: number
  commissionWithdrawMethod: string
  withdrawCloseEnable: boolean
  freeSubscriptionPlanId: number
  freeSubscriptionCycle: string
  freeSubscriptionLimit: number
  freeSubscriptionRecoveryEnable: boolean
  onChange: (data: Record<string, any>) => void
}

const FormInvite: FC<Partial<formInviteProps>> = (props) => {
  const intl = useIntl()
  const {
    inviteForce,
    inviteCommission,
    inviteGenlLimit,
    inviteNeverExpire,
    planItems,
    commissionFirstTimeEnable,
    commissionAutoCheckEnable,
    commissionWithdrawLimit,
    commissionWithdrawMethod,
    withdrawCloseEnable,
    freeSubscriptionPlanId,
    freeSubscriptionCycle,
    freeSubscriptionLimit,
    freeSubscriptionRecoveryEnable,
    onChange,
  } = props

  const inviteCommissionRef = useRef<HTMLInputElement>(null)
  const inviteGenLimitRef = useRef<HTMLInputElement>(null)
  const commissionWithdrawLimitRef = useRef<HTMLInputElement>(null)
  const commissionWithdrawMethodRef = useRef<HTMLTextAreaElement>(null)
  const freeSubscriptionPlanIdRef = useRef<HTMLSelectElement>(null)
  const freeSubscriptionCycleRef = useRef<HTMLSelectElement>(null)
  const freeSubscriptionLimitRef = useRef<HTMLInputElement>(null)

  const [switchInviteForce, setSwitchInviteForce] = useState(inviteForce)
  const [switchInviteNeverExpire, setSwitchInviteNeverExpire] = useState(inviteNeverExpire)
  const [switchCommissionFirstTimeEnable, setSwitchCommissionFirstTimeEnable] =
    useState(commissionFirstTimeEnable)
  const [switchCommissionAutoCheckEnable, setSwitchcommissionAutoCheckEnable] =
    useState(commissionAutoCheckEnable)
  const [switchWithdrawCloseEnable, setSwitchWithdrawCloseEnable] = useState(withdrawCloseEnable)
  const [switchFreeSubscriptionRecoveryEnable, setSwitchFreeSubscriptionRecoveryEnable] = useState(
    freeSubscriptionRecoveryEnable,
  )

  const [displayFreeSubscriptionChildren, setDisplayFreeSubscriptionChildren] = useState(
    (freeSubscriptionPlanId as number) > 0,
  )

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
        free_subscription_plan_id: Number(freeSubscriptionPlanIdRef.current?.value).valueOf(),
        free_subscription_cycle: freeSubscriptionCycleRef.current?.value,
        free_subscription_limit: Number(freeSubscriptionLimitRef.current?.value).valueOf(),
        free_subscription_recovery_enable: Boolean(switchFreeSubscriptionRecoveryEnable).valueOf()
          ? 1
          : 0,
      }
      onChange?.(data)
    },
    { wait: 1000 },
  )

  const changeHandler = run

  return (
    <>
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
      <div className="row p-4 border-bottom">
        <div className="col-lg-6">
          <div className="font-weight-bold my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.free_subscription_plan_id',
            })}
          </div>
          <div className="font-size-sm my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.free_subscription_plan_id.tip',
            })}
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <select
            className="form-control"
            ref={freeSubscriptionPlanIdRef}
            defaultValue={freeSubscriptionPlanId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              if (Number(e.target.value).valueOf() > 0) {
                setDisplayFreeSubscriptionChildren(true)
              } else {
                setDisplayFreeSubscriptionChildren(false)
              }
              changeHandler()
            }}
            placeholder={intl.formatMessage({
              id: 'module.config.system.invite.free_subscription_plan_id.placeholder',
            })}
          >
            <option value={0}>
              {intl.formatMessage({
                id: 'module.config.system.invite.free_subscription_plan_id.option.close',
              })}
            </option>
            {planItems?.map((plan: planItem) => {
              return (
                <option value={plan.id} key={plan.id}>
                  {plan.name}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      <div
        className="row v2board-config-children p-4 border-bottom"
        style={displayFreeSubscriptionChildren ? {} : { display: 'none' }}
      >
        <div className="col-lg-6">
          <div className="font-weight-bold my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.free_subscription_cycle',
            })}
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <select
            className="form-control"
            ref={freeSubscriptionCycleRef}
            defaultValue={freeSubscriptionCycle}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              changeHandler()
            }}
            placeholder={intl.formatMessage({
              id: 'module.config.system.invite.free_subscription_cycle.placeholder',
            })}
          >
            <option value="month_price">
              {intl.formatMessage({
                id: 'module.config.system.invite.free_subscription_cycle.option.month_price',
              })}
            </option>
            <option value="quarter_price">
              {intl.formatMessage({
                id: 'module.config.system.invite.free_subscription_cycle.option.quarter_price',
              })}
            </option>
            <option value="half_year_price">
              {intl.formatMessage({
                id: 'module.config.system.invite.free_subscription_cycle.option.half_year_price',
              })}
            </option>
            <option value="year_price">
              {intl.formatMessage({
                id: 'module.config.system.invite.free_subscription_cycle.option.year_price',
              })}
            </option>
            <option value="two_year_price">
              {intl.formatMessage({
                id: 'module.config.system.invite.free_subscription_cycle.option.two_year_price',
              })}
            </option>
            <option value="three_year_price">
              {intl.formatMessage({
                id: 'module.config.system.invite.free_subscription_cycle.option.three_year_price',
              })}
            </option>
            <option value="reset_price">
              {intl.formatMessage({
                id: 'module.config.system.invite.free_subscription_cycle.option.reset_price',
              })}
            </option>
            <option value="onetime_price">
              {intl.formatMessage({
                id: 'module.config.system.invite.free_subscription_cycle.option.onetime_price',
              })}
            </option>
          </select>
        </div>
      </div>
      <div
        className="row v2board-config-children p-4 border-bottom"
        style={displayFreeSubscriptionChildren ? {} : { display: 'none' }}
      >
        <div className="col-lg-6">
          <div className="font-weight-bold my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.free_subscription_limit',
            })}
          </div>
          <div className="font-size-sm my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.free_subscription_limit.tip',
            })}
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <input
            type="number"
            className="form-control"
            placeholder={intl.formatMessage({
              id: 'module.config.system.invite.free_subscription_limit.placeholder',
            })}
            ref={freeSubscriptionLimitRef}
            defaultValue={freeSubscriptionLimit}
            onChange={changeHandler}
          />
        </div>
      </div>

      <div
        className="row v2board-config-children p-4 border-bottom"
        style={displayFreeSubscriptionChildren ? {} : { display: 'none' }}
      >
        <div className="col-lg-6">
          <div className="font-weight-bold my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.free_subscription_recovery_enable',
            })}
          </div>
          <div className="font-size-sm my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.free_subscription_recovery_enable.tip',
            })}
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <Switch
            defaultChecked={switchFreeSubscriptionRecoveryEnable}
            onChange={(checked: boolean) => {
              setSwitchFreeSubscriptionRecoveryEnable(checked)
              changeHandler()
            }}
          />
        </div>
      </div>
    </>
  )
}

export default FormInvite

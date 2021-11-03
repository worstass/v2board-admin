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
  packagePlanId: number
  packageLimit: number
  packageRecoveryLimit: number
  packageRecoveryConditionType: number
  packageRecoveryTrafficLowerLimit: number
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
    packagePlanId,
    packageLimit,
    packageRecoveryLimit,
    packageRecoveryConditionType,
    packageRecoveryTrafficLowerLimit,
    onChange,
  } = props

  const inviteCommissionRef = useRef<HTMLInputElement>(null)
  const inviteGenLimitRef = useRef<HTMLInputElement>(null)
  const commissionWithdrawLimitRef = useRef<HTMLInputElement>(null)
  const commissionWithdrawMethodRef = useRef<HTMLTextAreaElement>(null)
  const packagePlanIdRef = useRef<HTMLSelectElement>(null)
  const packageLimitRef = useRef<HTMLInputElement>(null)
  const packageRecoveryLimitRef = useRef<HTMLInputElement>(null)
  const packageRecoveryConditionTypeRef = useRef<HTMLSelectElement>(null)
  const packageRecoveryTrafficLowerLimitRef = useRef<HTMLInputElement>(null)
  const [switchInviteForce, setSwitchInviteForce] = useState(inviteForce)
  const [switchInviteNeverExpire, setSwitchInviteNeverExpire] = useState(inviteNeverExpire)
  const [switchCommissionFirstTimeEnable, setSwitchCommissionFirstTimeEnable] =
    useState(commissionFirstTimeEnable)
  const [switchCommissionAutoCheckEnable, setSwitchcommissionAutoCheckEnable] =
    useState(commissionAutoCheckEnable)
  const [switchWithdrawCloseEnable, setSwitchWithdrawCloseEnable] = useState(withdrawCloseEnable)

  const [displayPackageChildren, setDisplayPackageChildren] = useState(
    (packagePlanId as number) > 0,
  )
  const [displayPackageRecoveryChildren, setDisplayPackageRecoveryChildren] = useState(
    (packageRecoveryConditionType as number) > 1,
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
        package_plan_id: Number(packagePlanIdRef.current?.value).valueOf(),
        package_cycle: 'onetime_price',
        package_limit: Number(packageLimitRef.current?.value).valueOf(),
        package_recovery_limit: Number(packageRecoveryLimitRef.current?.value).valueOf(),
        package_recovery_condition_type: Number(
          packageRecoveryConditionTypeRef.current?.value,
        ).valueOf(),
        package_recovery_traffic_lower_limit: Number(
          packageRecoveryTrafficLowerLimitRef.current?.value,
        ).valueOf(),
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
              id: 'module.config.system.invite.package_plan_id',
            })}
          </div>
          <div className="font-size-sm my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.package_plan_id.tip',
            })}
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <select
            className="form-control"
            ref={packagePlanIdRef}
            defaultValue={packagePlanId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              if (Number(e.target.value).valueOf() > 0) {
                setDisplayPackageChildren(true)
              } else {
                setDisplayPackageChildren(false)
              }
              changeHandler()
            }}
            placeholder={intl.formatMessage({
              id: 'module.config.system.invite.package_plan_id.placeholder',
            })}
          >
            <option value={0}>
              {intl.formatMessage({
                id: 'module.config.system.invite.package_plan_id.option.close',
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
        style={displayPackageChildren ? {} : { display: 'none' }}
      >
        <div className="col-lg-6">
          <div className="font-weight-bold my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.package_limit',
            })}
          </div>
          <div className="font-size-sm my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.package_limit.tip',
            })}
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <input
            type="number"
            className="form-control"
            placeholder={intl.formatMessage({
              id: 'module.config.system.invite.package_limit.placeholder',
            })}
            ref={packageLimitRef}
            defaultValue={packageLimit}
            onChange={changeHandler}
          />
        </div>
      </div>

      <div
        className="row v2board-config-children p-4 border-bottom"
        style={displayPackageChildren ? {} : { display: 'none' }}
      >
        <div className="col-lg-6">
          <div className="font-weight-bold my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.package_recovery_limit',
            })}
          </div>
          <div className="font-size-sm my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.package_recovery_limit.tip',
            })}
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <input
            type="number"
            className="form-control"
            placeholder={intl.formatMessage({
              id: 'module.config.system.invite.package_recovery_limit.placeholder',
            })}
            ref={packageRecoveryLimitRef}
            defaultValue={packageRecoveryLimit}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div
        className="row v2board-config-children p-4 border-bottom"
        style={displayPackageChildren ? {} : { display: 'none' }}
      >
        <div className="col-lg-6">
          <div className="font-weight-bold my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.package_recovery_condition_type',
            })}
          </div>
          <div className="font-size-sm my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.package_recovery_condition_type.tip',
            })}
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <select
            className="form-control"
            ref={packageRecoveryConditionTypeRef}
            defaultValue={packageRecoveryConditionType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              if (Number(e.target.value).valueOf() > 1) {
                setDisplayPackageRecoveryChildren(true)
              } else {
                setDisplayPackageRecoveryChildren(false)
              }
              changeHandler()
            }}
            placeholder={intl.formatMessage({
              id: 'module.config.system.invite.package_recovery_condition_type.placeholder',
            })}
          >
            <option value={0}>
              {intl.formatMessage({
                id: 'module.config.system.invite.package_recovery_condition_type.option.zero',
              })}
            </option>
            <option value={1}>
              {intl.formatMessage({
                id: 'module.config.system.invite.package_recovery_condition_type.option.one',
              })}
            </option>
            <option value={2}>
              {intl.formatMessage({
                id: 'module.config.system.invite.package_recovery_condition_type.option.two',
              })}
            </option>
            <option value={3}>
              {intl.formatMessage({
                id: 'module.config.system.invite.package_recovery_condition_type.option.three',
              })}
            </option>
            <option value={4}>
              {intl.formatMessage({
                id: 'module.config.system.invite.package_recovery_condition_type.option.four',
              })}
            </option>
          </select>
        </div>
      </div>
      <div
        className="row v2board-config-children-cyan p-4 border-bottom"
        style={displayPackageRecoveryChildren ? {} : { display: 'none' }}
      >
        <div className="col-lg-6">
          <div className="font-weight-bold my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.package_recovery_traffic_lower_limit',
            })}
          </div>
          <div className="font-size-sm my-1">
            {intl.formatMessage({
              id: 'module.config.system.invite.package_recovery_traffic_lower_limit.tip',
            })}
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.invite.package_recovery_traffic_lower_limit.placeholder',
              })}
              ref={packageRecoveryTrafficLowerLimitRef}
              defaultValue={packageRecoveryTrafficLowerLimit}
              onChange={changeHandler}
            />
            <div className="input-group-append">
              <span className="input-group-text">MB</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormInvite

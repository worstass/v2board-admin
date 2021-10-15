import type { FC } from 'react'
import { useIntl } from 'umi'
import { Switch } from 'antd'
import { useRef, useState } from 'react'
import { useDebounceFn } from 'ahooks'

export interface planItem {
  id: number
  name: string
}

export interface formSiteProps {
  appName: string
  appDescription: string
  appUrl: string
  subscribeUrl: string
  tosUrl: string
  safeModeEnable: boolean
  stopRegister: boolean
  emailVerify: boolean
  emailGmailLimitEnable: boolean
  tryOutPlanID: number
  tryOutHour: number
  planItems: planItem[]
  emailWhiteListEnable: boolean
  emailWhiteListSuffix: string[]
  recaptchaEnable: boolean
  recaptchaKey: string
  recaptchaSiteKey: string
  onChange: (data: Record<string, any>) => void
}

const FormSite: FC<Partial<formSiteProps>> = (props) => {
  const {
    appName,
    appDescription,
    appUrl,
    subscribeUrl,
    tosUrl,
    safeModeEnable,
    stopRegister,
    emailVerify,
    emailGmailLimitEnable,
    tryOutPlanID,
    tryOutHour,
    planItems,
    emailWhiteListEnable,
    emailWhiteListSuffix,
    recaptchaEnable,
    recaptchaKey,
    recaptchaSiteKey,
    onChange,
  } = props

  const appNameRef = useRef<HTMLInputElement>(null)
  const appDescriptionRef = useRef<HTMLInputElement>(null)
  const appUrlRef = useRef<HTMLInputElement>(null)
  const subscribeUrlRef = useRef<HTMLTextAreaElement>(null)
  const tosUrlRef = useRef<HTMLInputElement>(null)
  const tryOutPlanIDRef = useRef<HTMLSelectElement>(null)
  const tryOutHourRef = useRef<HTMLInputElement>(null)
  const emailWhiteListSuffixRef = useRef<HTMLTextAreaElement>(null)
  const recaptchaKeyRef = useRef<HTMLInputElement>(null)
  const recaptchaSiteKeyRef = useRef<HTMLInputElement>(null)
  const [switchSafeModeEnable, setSwitchSafeModelEnable] = useState(safeModeEnable)
  const [switchStopRegister, setSwitchStopRegister] = useState(stopRegister)
  const [switchEmailVerify, setSwitchEmailVerify] = useState(emailVerify)
  const [switchEmailGmailLimitEnable, setSwitchEmailGmailLimitEanbel] =
    useState(emailGmailLimitEnable)
  const [switchEmailWhiteListEnable, setSwitchEmailWhiteListEnable] = useState(emailWhiteListEnable)
  const [switchRecaptchaEnable, setSwitchRecaptchaEnable] = useState(recaptchaEnable)

  const [displayEmailSuffix, setDisplayEmailSuffix] = useState<boolean>(
    emailWhiteListEnable as boolean,
  )
  const [displayRecaptchaExtra, setDisplayRecaptchaExtra] = useState<boolean>(
    recaptchaEnable as boolean,
  )

  const [displayTryOutHour, setDisplayTryOutHour] = useState<boolean>(
    Boolean(tryOutPlanID).valueOf(),
  )
  const intl = useIntl()

  const { run } = useDebounceFn(
    () => {
      const data: Record<string, any> = {
        app_name: appNameRef.current?.value,
        app_description: appDescriptionRef.current?.value,
        app_url: appUrlRef.current?.value,
        subscribe_url: subscribeUrlRef.current?.value,
        tos_url: tosUrlRef.current?.value,
        safe_mode_enable: Boolean(switchSafeModeEnable).valueOf() ? 1 : 0,
        stop_register: Boolean(switchStopRegister).valueOf() ? 1 : 0,
        email_verify: Boolean(switchEmailVerify).valueOf() ? 1 : 0,
        email_gmail_limit_enable: Boolean(switchEmailGmailLimitEnable) ? 1 : 0,
        try_out_plan_id: Number(tryOutPlanIDRef.current?.value).valueOf(),
        try_out_hour: Number(tryOutHourRef.current?.value).valueOf(),
        email_whitelist_enable: Boolean(switchEmailWhiteListEnable).valueOf() ? 1 : 0,
        email_whitelist_suffix: emailWhiteListSuffixRef.current?.value.split(','),
        recaptcha_enable: Boolean(switchRecaptchaEnable).valueOf() ? 1 : 0,
        recaptcha_key: recaptchaKeyRef.current?.value,
        recaptcha_site_key: recaptchaSiteKeyRef.current?.value,
      }

      if (data.email_whitelist_enable === 1) {
        setDisplayEmailSuffix(true)
      } else {
        setDisplayEmailSuffix(false)
      }

      if (data.recaptcha_enable === 1) {
        setDisplayRecaptchaExtra(true)
      } else {
        setDisplayRecaptchaExtra(false)
      }

      if (data.try_out_plan_id > 0) {
        setDisplayTryOutHour(true)
      } else {
        setDisplayTryOutHour(false)
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
              {intl.formatMessage({ id: 'module.config.system.site.app_name' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.app_name.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.site.app_name.placeholder',
              })}
              defaultValue={appName}
              ref={appNameRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.app_description' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.app_description.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.site.app_description.placeholder',
              })}
              defaultValue={appDescription}
              ref={appDescriptionRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.app_url' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.app_url.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.site.app_url.placeholder',
              })}
              defaultValue={appUrl}
              ref={appUrlRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.subscribe_url' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.subscribe_url.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <textarea
              rows={4}
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.site.subscribe_url.placeholder',
              })}
              defaultValue={subscribeUrl}
              ref={subscribeUrlRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.tos_url' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.tos_url.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.site.tos_url.placeholder',
              })}
              defaultValue={tosUrl}
              ref={tosUrlRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.safe_mode_enable' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.safe_mode_enable.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchSafeModeEnable}
              onChange={(checked: boolean) => {
                setSwitchSafeModelEnable(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.stop_register' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.stop_register.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchStopRegister}
              onChange={(checked: boolean) => {
                setSwitchStopRegister(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.email_verify' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.email_verify.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchEmailVerify}
              onChange={(checked: boolean) => {
                setSwitchEmailVerify(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.email_gmail_limit_enable' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.email_gmail_limit_enable.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchEmailGmailLimitEnable}
              onChange={(checked: boolean) => {
                setSwitchEmailGmailLimitEanbel(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.try_out_plan_id' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.try_out_plan_id.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <select
              className="form-control"
              placeholder={intl.formatMessage({ id: 'module.config.system.site.try_out_plan_id' })}
              defaultValue={tryOutPlanID}
              ref={tryOutPlanIDRef}
              onChange={changeHandler}
            >
              <option value={0}>
                {intl.formatMessage({ id: 'module.config.system.site.try_out_plan_id.close' })}
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
          className="row p-4 border-bottom v2board-config-children"
          style={displayTryOutHour ? {} : { display: 'none' }}
        >
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.try_out_hour' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.try_out_hour.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="number"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.site.try_out_hour.placeholder',
              })}
              defaultValue={tryOutHour}
              ref={tryOutHourRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom row">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.email_whitelist_enable' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.email_whitelist_enable.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchEmailWhiteListEnable}
              onChange={(checked: boolean) => {
                setSwitchEmailWhiteListEnable(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
        <div
          className="row p-4 border-bottom v2board-config-children"
          style={displayEmailSuffix ? {} : { display: 'none' }}
        >
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.email_whitelist' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.email_whitelist.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <textarea
              rows={4}
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.site.email_whitelist.placeholder',
              })}
              defaultValue={emailWhiteListSuffix?.join(',')}
              onChange={changeHandler}
              ref={emailWhiteListSuffixRef}
            />
          </div>
        </div>

        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.recaptcha_enable' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.recaptcha_enable.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={switchRecaptchaEnable}
              onChange={(checked: boolean) => {
                setSwitchRecaptchaEnable(checked)
                changeHandler()
              }}
            />
          </div>
        </div>
        <div
          className="row v2board-config-children p-4 border-bottom"
          style={displayRecaptchaExtra ? {} : { display: 'none' }}
        >
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.recaptcha_key' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.recaptcha_key.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.site.recaptcha_key.placeholder',
              })}
              defaultValue={recaptchaKey}
              onChange={changeHandler}
              ref={recaptchaKeyRef}
            />
          </div>
        </div>
        <div
          className="row v2board-config-children p-4 border-bottom"
          style={displayRecaptchaExtra ? {} : { display: 'none' }}
        >
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.site.recaptcha_site_key' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.site.recaptcha_site_key.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.site.recaptcha_site_key.placeholder',
              })}
              defaultValue={recaptchaSiteKey}
              onChange={changeHandler}
              ref={recaptchaSiteKeyRef}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default FormSite

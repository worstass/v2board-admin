import type { FC } from 'react'
import { useIntl } from 'umi'
import { useDebounceFn } from 'ahooks'
import { useRef, useState } from 'react'
import { testSendMail } from '@/services'
import {Button, message} from 'antd'

export interface formEmailProps {
  emailTemplates: string[]
  emailTemplate: string
  emailHost: string
  emailPort: string
  emailUsername: string
  emailPassword: string
  emailEncryption: string
  emailFromAddress: string
  emailRateLimit: string
  onChange: (data: Record<string, any>) => void
}

const FormEmail: FC<Partial<formEmailProps>> = (props) => {
  const {
    emailTemplates,
    emailTemplate,
    emailHost,
    emailPort,
    emailUsername,
    emailPassword,
    emailEncryption,
    emailFromAddress,
    emailRateLimit,
    onChange,
  } = props

  const emailTemplateRef = useRef<HTMLSelectElement>(null)
  const emailHostRef = useRef<HTMLInputElement>(null)
  const emailPortRef = useRef<HTMLInputElement>(null)
  const emailUsernameRef = useRef<HTMLInputElement>(null)
  const emailPasswordRef = useRef<HTMLInputElement>(null)
  const emailEncryptionRef = useRef<HTMLInputElement>(null)
  const emailFromAddressRef = useRef<HTMLInputElement>(null)
  const emailRateLimitRef = useRef<HTMLInputElement>(null)
  const [testLoading, setTestLoading] = useState(false)


  const intl = useIntl()

  const { run } = useDebounceFn(
    () => {
      const data: Record<string, any> = {
        email_template: emailTemplateRef.current?.value,
        email_host: emailHostRef.current?.value,
        email_port: Number(emailPortRef.current?.value).valueOf(),
        email_username: emailUsernameRef.current?.value,
        email_password: emailPasswordRef.current?.value,
        email_encryption: emailEncryptionRef.current?.value,
        email_from_address: emailFromAddressRef.current?.value,
        email_rate_limit: Number(emailRateLimitRef.current?.value).valueOf(),
      }
      onChange?.(data)
    },
    { wait: 1000 },
  )
  const changeHandler = run


  const testMailHookHandler = async () => {
    setTestLoading(true)
    const testSendMailResult = await testSendMail()
    setTestLoading(false)
    if (testSendMailResult === undefined) {
      return
    }
    message.success(
      intl.formatMessage({
        id: 'module.config.system.email.test_send_mail.message.success',
      }),
    )
  }

  return (
    <>
      <div className="block-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="alert alert-warning" role="alert">
              <p className="mb-0">
                {intl.formatMessage({ id: 'module.config.system.email.warning' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_host' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_host.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.email.email_host.placeholder',
              })}
              defaultValue={emailHost}
              ref={emailHostRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_port' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_port.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="number"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.email.email_port.placeholder',
              })}
              defaultValue={emailPort}
              ref={emailPortRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_encryption' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_encryption.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.email.email_encryption.placeholder',
              })}
              defaultValue={emailEncryption}
              ref={emailEncryptionRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_username' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_username.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.email.email_username.placeholder',
              })}
              defaultValue={emailUsername}
              ref={emailUsernameRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_password' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_password.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.email.email_password.placeholder',
              })}
              defaultValue={emailPassword}
              ref={emailPasswordRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_from_address' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_from_address.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.email.email_from_address.placeholder',
              })}
              defaultValue={emailFromAddress}
              ref={emailFromAddressRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_template' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_template.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <select
              className="form-control"
              defaultValue={emailTemplate}
              placeholder={intl.formatMessage({
                id: 'module.config.system.email.email_template.placeholder',
              })}
              ref={emailTemplateRef}
              onChange={changeHandler}
            >
              {emailTemplates?.map((theme) => {
                return (
                  <option value={theme} key={theme}>
                    {theme}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_rate_limit' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.email.email_rate_limit.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="number"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.email.email_rate_limit.placeholder',
              })}
              defaultValue={emailRateLimit}
              ref={emailRateLimitRef}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.email.test_send_mail' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.email.test_send_mail.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Button
              type="primary"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                testMailHookHandler()
              }}
              loading={testLoading}
            >
              {intl.formatMessage({
                id: 'module.config.system.email.test_send_mail.btn',
              })}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormEmail

import type { FC, ChangeEvent } from 'react'
import { Drawer, Input, Switch } from 'antd'
import { useIntl } from 'umi'
import { useState } from 'react'

export interface drawerTLSProps {
  onClose: (data: API.Admin.V2rayTlsSettings) => void
  visible: boolean
  defaultSettings?: API.Admin.V2rayTlsSettings
}

const DrawerTLS: FC<drawerTLSProps> = (props) => {
  const { onClose, visible, defaultSettings } = props
  const [serverName, setServerName] = useState(defaultSettings?.serverName as string)
  const [allowInsecure, setAllowInsecure] = useState<boolean>(defaultSettings?.allowInsecure ?? false)
  const intl = useIntl()

  return (
    <>
      <Drawer
        title={intl.formatMessage({ id: 'module.server.manage.v2ray.tls_settings.drawer.title' })}
        placement="right"
        onClose={() => {
          const settings: API.Admin.V2rayTlsSettings = {
            serverName,
            allowInsecure,
          }
          onClose(settings)
        }}
        visible={visible}
        width={window.innerWidth > 900 ? 500 : window.innerWidth - 70}
      >
        <div className="form-group">
          <label>
            {intl.formatMessage({ id: 'module.server.manage.v2ray.tls_settings.server_name' })}
          </label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.server.manage.v2ray.tls_settings.server_name.placeholder',
            })}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setServerName(e.target.value)
            }}
            defaultValue={defaultSettings?.serverName}
          />
        </div>
        <div className="form-group">
          <label>
            {intl.formatMessage({ id: 'module.server.manage.v2ray.tls_settings.allow_insecure' })}
          </label>
          <div>
            <Switch
              defaultChecked={defaultSettings?.allowInsecure}
              onChange={(checked) => {
                setAllowInsecure(checked)
              }}
            />
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerTLS

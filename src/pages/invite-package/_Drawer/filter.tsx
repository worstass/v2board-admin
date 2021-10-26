import type { FC, ChangeEvent } from 'react'
import { Drawer, Button, Divider, Input, Space, Select } from 'antd'
import { useIntl } from 'umi'
import { DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Option } = Select

export interface draweFilterProps {
  onClose: () => void
  onChange: (data: API.Admin.InvitePackageFilterItem[] | undefined) => void
  visible: boolean
}

type filterItem = API.Admin.InvitePackageFilterItem & { index: number }

const DrawerFilter: FC<draweFilterProps> = (props) => {
  const { onClose, visible, onChange } = props
  const [filterData, setFilterData] = useState<filterItem[]>([])
  const intl = useIntl()
  const renderElements = () => (
    <>
      {filterData.map((item: filterItem) => (
        <div key={item.index}>
          <div className="row">
            <Divider style={{ backgroundColor: 'unset' }}>
              <Space>
                {`${intl.formatMessage({ id: 'module.invite_package.action.filter.name' })}(${
                  item.index
                })`}
                <DeleteOutlined
                  style={{ color: '#FF4D4F', verticalAlign: '0.05rem' }}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setFilterData((prevFilterData) => {
                      const settings = prevFilterData.filter(
                        (setting) => setting.index !== item.index,
                      )
                      return settings
                    })
                  }}
                />
              </Space>
            </Divider>
          </div>
          <div className="form-group">
            <label>
              {intl.formatMessage({ id: 'module.invite_package.action.filter.filed_name' })}
            </label>
            <Select
              defaultValue="status"
              className="w-100"
              onChange={(value: string) => {
                const newFilterData = filterData.map((sourceItem: filterItem) => {
                  const newItem = sourceItem
                  if (sourceItem.index === item.index) {
                    newItem.key = value
                  }
                  return newItem
                })
                setFilterData(newFilterData)
              }}
            >
              <Option value="id">
                {intl.formatMessage({ id: 'module.invite_package.action.filter.filed_name.id' })}
              </Option>
              <Option value="status">
                {intl.formatMessage({
                  id: 'module.invite_package.action.filter.filed_name.status',
                })}
              </Option>

              <Option value="user_id">
                {intl.formatMessage({
                  id: 'module.invite_package.action.filter.filed_name.user_id',
                })}
              </Option>
              <Option value="invite_user_id">
                {intl.formatMessage({
                  id: 'module.invite_package.action.filter.filed_name.from_user_id',
                })}
              </Option>
            </Select>
          </div>
          <div className="form-group">
            <label>
              {intl.formatMessage({ id: 'module.invite_package.action.filter.condition' })}
            </label>
            <Select
              defaultValue="="
              className="w-100"
              onChange={(value: string) => {
                const newFilterData = filterData.map((sourceItem: filterItem) => {
                  const newItem = sourceItem
                  if (sourceItem.index === item.index) {
                    newItem.condition = value
                  }
                  return newItem
                })
                setFilterData(newFilterData)
              }}
            >
              <Option value="=">=</Option>
              {['user_id', 'id', 'from_user_id'].includes(item.key) && (
                <>
                  <Option value=">=">&gt;=</Option>
                  <Option value=">">&gt;</Option>
                  <Option value="<">&lt;</Option>
                  <Option value="<=">&lt;=</Option>
                </>
              )}
            </Select>
          </div>
          <div className="form-group">
            <label>{intl.formatMessage({ id: 'module.invite_package.action.filter.value' })}</label>
            {['user_id', 'from_user_id', 'id'].includes(item.key) === true && (
              <Input
                placeholder={intl.formatMessage({
                  id: 'module.invite_package.action.filter.value.placeholder',
                })}
                defaultValue={item.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newFilterData = filterData.map((sourceItem: filterItem) => {
                    const newItem = sourceItem
                    if (sourceItem.index === item.index) {
                      newItem.value = e.target.value
                    }
                    return newItem
                  })
                  setFilterData(newFilterData)
                }}
              />
            )}

            {item.key === 'status' && (
              <Select
                placeholder={intl.formatMessage({
                  id: 'module.invite_package.action.filter.value.select_placeholder',
                })}
                className="w-100"
                onChange={(value: string) => {
                  const newFilterData = filterData.map((sourceItem: filterItem) => {
                    const newItem = sourceItem
                    if (sourceItem.index === item.index) {
                      newItem.value = value
                    }
                    return newItem
                  })
                  setFilterData(newFilterData)
                }}
              >
                <Option value={0} key={0}>
                  {intl.formatMessage({
                    id: 'module.invite_package.action.filter.value.status.option.unused',
                  })}
                </Option>
                <Option value={1} key={1}>
                  {intl.formatMessage({
                    id: 'module.invite_package.action.filter.value.status.option.used',
                  })}
                </Option>
                <Option value={-1} key={-1}>
                  {intl.formatMessage({
                    id: 'module.invite_package.action.filter.value.status.option.invalid',
                  })}
                </Option>
              </Select>
            )}
          </div>
        </div>
      ))}
    </>
  )

  return (
    <>
      <Drawer
        title={intl.formatMessage({ id: 'module.invite_package.action.filter.drawer.title' })}
        placement="right"
        visible={visible}
        width="500"
        onClose={onClose}
        footer={
          <>
            <div className="float-left">
              <Button
                type="primary"
                color="danger"
                onClick={(e: React.MouseEvent) => {
                  setFilterData([])
                  onChange(undefined)
                  e.preventDefault()
                }}
                danger
                disabled={filterData.length === 0}
              >
                <span>
                  {intl.formatMessage({
                    id: 'module.invite_package.action.filter.drawer.reset_btn',
                  })}
                </span>
              </Button>
            </div>
            <div className="float-right">
              <Button type="default" className="mx-lg-2" onClick={onClose}>
                <span>
                  {intl.formatMessage({
                    id: 'module.invite_package.action.filter.drawer.cancel_btn',
                  })}
                </span>
              </Button>
              <Button
                type="primary"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  const changeFilterData = filterData
                    .filter((data) => data.value.length !== 0)
                    .map(({ index, ...others }) => others)
                  onChange(changeFilterData)
                }}
                disabled={filterData.length === 0}
              >
                <span>
                  {intl.formatMessage({ id: 'module.invite_package.action.filter.drawer.ok_btn' })}
                </span>
              </Button>
            </div>
          </>
        }
      >
        <div className="form-group">
          {renderElements()}
          <div>
            <Button
              className="w-100"
              type="primary"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                const newFilterItem = {
                  key: 'status',
                  condition: '=',
                  value: '',
                  index: filterData.length + 1,
                }
                setFilterData([...filterData, newFilterItem])
              }}
            >
              <span>
                {intl.formatMessage({ id: 'module.invite_package.action.filter.add_btn' })}
              </span>
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerFilter

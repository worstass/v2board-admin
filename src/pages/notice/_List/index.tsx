import type { FC } from 'react'
import { Table, Divider, message } from 'antd'
import { useIntl, Link } from 'umi'
import React, { useState } from 'react'
import moment from 'moment'
import { noticeDrop } from '@/services'
import DrawerNotice from '../_Drawer'

const { Column } = Table

export interface listProps {
  dataSource: API.Admin.NoticeItem[]
  onDropSuccess: () => void
  onEditSuccess: () => void
}

const List: FC<listProps> = (props) => {
  const { dataSource, onDropSuccess, onEditSuccess } = props
  const [drawerNoticeVisible, setDrawerNoticeVisible] = useState(false)
  const [editNotice, setEditNotice] = useState<API.Admin.NoticeItem>()
  const intl = useIntl()

  const dropHandler = async (id: number) => {
    const noticeDropResult = await noticeDrop({ id })
    if (noticeDropResult === undefined) {
      return
    }
    message.success(
      intl.formatMessage({ id: 'module.notice.list.column.action.drop.message.success' }),
    )
    onDropSuccess()
  }

  return (
    <>
      <Table
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
        scroll={{ x: true }}
        loading={dataSource === undefined}
      >
        <Column
          title={intl.formatMessage({ id: 'module.notice.list.column.id' })}
          dataIndex="id"
          key="id"
        />
        <Column
          title={intl.formatMessage({ id: 'module.notice.list.column.title' })}
          dataIndex="title"
          key="title"
        />
        <Column
          title={intl.formatMessage({ id: 'module.notice.list.column.created_at' })}
          dataIndex="created_at"
          key="created_at"
          align="center"
          render={(created_at: number) => {
            return moment.unix(created_at).format('YYYY/MM/DD HH:mm')
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.notice.list.column.action' })}
          key="action"
          render={(text, record: API.Admin.NoticeItem) => (
            <>
              <Link
                to=""
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  setEditNotice(record)
                  setDrawerNoticeVisible(true)
                }}
              >
                {intl.formatMessage({ id: 'module.notice.list.column.action.edit' })}
              </Link>
              <Divider type="vertical" />
              <Link
                to=""
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  dropHandler(record.id)
                }}
              >
                {intl.formatMessage({ id: 'module.notice.list.column.action.drop' })}
              </Link>
            </>
          )}
          align="right"
        />
      </Table>
      {editNotice !== undefined && (
        <DrawerNotice
          onClose={() => {
            setDrawerNoticeVisible(false)
          }}
          onSubmitSuccess={() => {
            setDrawerNoticeVisible(false)
            onEditSuccess()
          }}
          visible={drawerNoticeVisible}
          defaultNotice={editNotice}
          key={editNotice.id}
        />
      )}
    </>
  )
}

export default List

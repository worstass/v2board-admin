import type { FC } from 'react'
import { useIntl } from 'umi'
import { Drawer, Input, message, Button } from 'antd'
import { noticeSave } from '@/services'
import { useRef, useState, useEffect } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

const mdParser = new MarkdownIt({ html: true })

export interface drawerNoticeProps {
  visible: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  defaultNotice?: API.Admin.NoticeItem
}

const DrawerNotice: FC<drawerNoticeProps> = (props) => {
  const { visible, onClose, onSubmitSuccess, defaultNotice } = props
  const titleRef = useRef<Input>(null)
  const imgUrlRef = useRef<Input>(null)
  const [content, setContent] = useState('')
  const [destroy, setDestroy] = useState(false)
  const intl = useIntl()

  useEffect(() => {
    if (defaultNotice?.content !== undefined) {
      setContent(defaultNotice?.content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitHandler = async () => {
    const title = titleRef.current?.input.value as string
    const imgUrl = imgUrlRef.current?.input.value as string

    const noticeSaveResult = await noticeSave({
      id: defaultNotice?.id,
      title,
      content,
      img_url: imgUrl,
    })
    if (noticeSaveResult === undefined) {
      return
    }
    const successMsgID = defaultNotice
      ? 'module.notice.drawer.message.edit_success'
      : 'module.notice.drawer.message.add_success'
    message.success(intl.formatMessage({ id: successMsgID }))
    setDestroy(true)
    onSubmitSuccess()
  }

  return (
    <>
      <Drawer
        title={
          defaultNotice
            ? intl.formatMessage({ id: 'module.notice.drawer.edit_title' })
            : intl.formatMessage({ id: 'module.notice.drawer.create_title' })
        }
        placement="right"
        onClose={onClose}
        visible={visible}
        width={window.innerWidth > 900 ? "80%" : window.innerWidth - 70}
        footer={
          <div className="float-right">
            <Button type="default" className="mx-lg-2" onClick={onClose}>
              <span>{intl.formatMessage({ id: 'module.notice.drawer.cancel_btn' })}</span>
            </Button>
            <Button type="primary" onClick={submitHandler}>
              <span>{intl.formatMessage({ id: 'module.notice.drawer.ok_btn' })}</span>
            </Button>
          </div>
        }
        destroyOnClose={destroy}
      >
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.notice.drawer.title' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.notice.drawer.title.placeholder',
            })}
            ref={titleRef}
            defaultValue={defaultNotice?.title}
          />
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.notice.drawer.content' })}</label>
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ text }: { text: string }) => {
              setContent(text)
            }}
            defaultValue={defaultNotice?.content}
          />
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.notice.drawer.img_url' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.notice.drawer.img_url.placeholder',
            })}
            ref={imgUrlRef}
            defaultValue={defaultNotice?.img_url}
          />
        </div>
      </Drawer>
    </>
  )
}

export default DrawerNotice

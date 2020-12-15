import React, { useEffect, useState } from 'react'
import useTheme from '../styles/use-theme'
import { Notification } from './use-notifications'
import Bell from '@zeit-ui/react-icons/bell'
import ModalIcon from './modal-icon'

export type NotificationItemProps = Notification & {
  id: string
  destroy?: (id: string) => void
}
const transitionDuration = 150

const NotificationItem: React.FC<NotificationItemProps> = React.memo(
  ({ className, id, title, content, placement, delay, destroy, onClose, closeable, ...rest }) => {
    const theme = useTheme()
    let boxShadow: string = theme.expressiveness.D2
    const [visible, setVisible] = useState<boolean>(false)
    const [hide, setHide] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)

    useEffect(() => {
      const timer = window.setTimeout(() => {
        setVisible(true)
        clearTimeout(timer)
      }, 10)
      return () => clearTimeout(timer)
    }, [])
    useEffect(() => {
      let timer: number | undefined
      if (delay && !hover) {
        timer = window.setTimeout(() => {
          setHide(true)
          clearTimeout(timer)
        }, delay)
      }
      return () => {
        delay && clearTimeout(timer)
      }
    }, [delay, hover])
    useEffect(() => {
      let timer: number | undefined
      if (hide) {
        timer = window.setTimeout(() => {
          destroy && destroy(id)
          onClose && onClose(id)
          clearTimeout(timer)
        }, transitionDuration)
      }
      return () => clearTimeout(timer)
    }, [hide])
    const handleClose = () => {
      setHide(true)
    }
    const handleMouseEnter = () => {
      setHover(true)
    }
    const handleMouseLeave = () => {
      setHover(false)
    }
    return (
      <div
        key={id}
        className={`notification ${className} ${visible ? 'visible' : ''} ${
          hide ? 'hide' : ''
        } ${placement} ${rest.color}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className="icon">{rest.icon || <Bell />}</div>
        <div>
          <div className="title">{title}</div>
          {content !== '' && <div className="content">{content}</div>}
        </div>
        {closeable && <ModalIcon size={16} color={theme.palette.cNeutral5} onClick={handleClose} />}
        <style jsx>{`
          .notification {
            width: 28rem;
            background-color: ${theme.palette.cNeutral8};
            border: 0;
            border-radius: ${theme.expressiveness.R2};
            padding: ${theme.layout.gap};
            box-shadow: ${boxShadow};
            margin-top: calc(${theme.layout.gap} * 1.5);
            transform: ${placement === 'right-start'
              ? 'translate(100%, 0)'
              : 'translate(-100%, 0)'};
            opacity: 0;
            transition: transform ${transitionDuration}ms, opacity ${transitionDuration}ms;
            display: flex;
          }

          .notification.right-start {
            align-self: flex-end;
            margin-right: calc(${theme.layout.gap} * 1.25);
          }

          .notification.left-start {
            align-self: flex-start;
            margin-left: calc(${theme.layout.gap} * 1.25);
          }

          .notification:first-child {
            margin-top: 0;
          }
          .notification.visible {
            transform: translate(0, 0);
            opacity: 1;
            z-index: 2;
          }
          .notification.hide {
            margin-top: -3.5714rem;
            transform: translate(0, -100%);
            opacity: 0;
            z-index: 1;
          }
          .icon {
            height: 1.4286rem;
            width: 1.4286rem;
            display: flex;
            align-items: center;
            justify-items: center;
            margin-right: calc(${theme.layout.gap} * 0.75);
            flex-grow: 0;
            flex-shrink: 0;
            color: ${theme.palette.cNeutral7};
          }
          .icon > :global(svg) {
            width: 100%;
            height: 100%;
          }
          .title {
            font-style: normal;
            font-weight: 500;
            font-size: 1rem;
            line-height: 1.2857rem;
            line-height: 1.4286rem;
            margin-right: ${theme.layout.gap};
            color: ${theme.palette.cNeutral7};
          }
          .content {
            line-height: 1.2857rem;
            font-size: 1rem;
            color: ${theme.palette.cNeutral4};
            margin-top: calc(${theme.layout.gap} * 0.75);
          }
        `}</style>
      </div>
    )
  },
)

export default NotificationItem

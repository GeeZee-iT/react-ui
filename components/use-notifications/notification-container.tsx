import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../utils/use-portal'
import { useCfxUIContext } from '../utils/use-cfx-ui-context'
import NotificationItem from './notification-item'
import useTheme from '../styles/use-theme'

const NotificationContainer: React.FC<React.PropsWithChildren<{}>> = () => {
  const portal = usePortal('notification')
  const theme = useTheme()
  const { notifications } = useCfxUIContext()
  const notificationElements = useMemo(
    () => notifications.map(t => <NotificationItem key={`notification-${t.id}`} {...t} />),
    [notifications],
  )
  if (!portal) return null
  if (!notifications || notifications.length === 0) return null
  return createPortal(
    <div className="notification-container">
      {notificationElements}
      <style jsx>{`
        .notification-container {
          position: fixed;
          min-height: 0.7143rem;
          top: calc(${theme.layout.gap} * 1.25);
          left: 0;
          right: 0;
          z-index: 2000;
          box-sizing: border-box;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 0;
          visibility: visible;
        }
      `}</style>
    </div>,
    portal,
  )
}

export default NotificationContainer

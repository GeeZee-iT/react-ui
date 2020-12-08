import React from 'react'
import { NotificationColors, NotificationPlacement } from '../utils/prop-types'
import { useCfxUIContext } from '../utils/use-cfx-ui-context'
import { getId } from '../utils/collections'
import { NotificationItemProps } from './notification-item'

export interface Notification {
  icon?: React.ReactNode
  title: React.ReactNode // notification title, same as Modal
  content?: React.ReactNode // notification content, same as Modal
  delay?: number
  closeable?: boolean
  placement?: NotificationPlacement
  className?: string
  onClose?: (id: string) => void
  shadow?: boolean
  color?: NotificationColors
}
const defaultNotification = {
  delay: 2000,
  color: 'default' as NotificationColors,
  closeable: true,
  shadow: true,
  className: '',
  title: '',
  content: '',
  placement: 'right-start' as NotificationPlacement,
}

const useNotifications = (): [Array<Notification>, (t: Notification) => void] => {
  const { updateNotifications, notifications } = useCfxUIContext()
  const setNotification = (notification: Notification): void => {
    const id = `notification-${getId()}`
    const destroy = (id: string) => {
      updateNotifications((currentNotifications: Array<NotificationItemProps>) => {
        return currentNotifications.filter(item => {
          return item.id !== id
        })
      })
    }
    updateNotifications((currentNotifications: Array<NotificationItemProps>) => {
      const newNotification: NotificationItemProps = {
        ...defaultNotification,
        id,
        destroy,
        ...notification,
      }
      return [...currentNotifications, newNotification]
    })
  }
  return [notifications, setNotification]
}

export default useNotifications

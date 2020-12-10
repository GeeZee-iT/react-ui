import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { useNotifications, CfxProvider } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'
import Github from '@zeit-ui/react-icons/github'

const MockNotification: React.FC<{}> = () => {
  const [, setNotification] = useNotifications()
  const clickHandler = (e: any = {}) => {
    const keys = ['title', 'content', 'delay', 'closeable', 'icon', 'placement', 'onClose']
    const params = keys.reduce(
      (pre, key) => {
        const value = e.target[key]
        if (value === undefined) return pre
        return { ...pre, [key]: value }
      },
      { title: '' },
    )
    setNotification(params)
  }
  return (
    <div id="btn" onClick={clickHandler}>
      btn
    </div>
  )
}

const triggerNotification = (wrapper: ReactWrapper, params = {}) => {
  wrapper.find('#btn').simulate('click', {
    ...nativeEvent,
    target: params,
  })
}

const expectNotificationIsShow = (wrapper: ReactWrapper) => {
  const notification = wrapper.find('.notification-container').find('.notification')
  expect(notification.length).not.toBe(0)
}

const expectNotificationIsHidden = (wrapper: ReactWrapper) => {
  const notification = wrapper.find('.notification-container').find('.notification')
  expect(notification.length).toBe(0)
}

describe('UseNotification', () => {
  it('should render correctly', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockNotification />
      </CfxProvider>,
    )

    expectNotificationIsHidden(wrapper)
    triggerNotification(wrapper, { title: 'test-title', content: 'test-content' })
    await updateWrapper(wrapper, 50)
    expectNotificationIsShow(wrapper)
    expect(wrapper.find('.notification-container').html()).toMatchSnapshot()
  })

  it('should work with different placement', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockNotification />
      </CfxProvider>,
    )

    expectNotificationIsHidden(wrapper)
    triggerNotification(wrapper, {
      placement: 'right-start',
      title: 'test-title',
      content: 'right-start test-content',
    })
    triggerNotification(wrapper, {
      placement: 'left-start',
      title: 'test-title',
      content: 'left-start test-content',
    })
    await updateWrapper(wrapper, 50)
    expectNotificationIsShow(wrapper)
    expect(wrapper.find('.notification-container').html()).toMatchSnapshot()
  })

  it('should render with custom icon correctly', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockNotification />
      </CfxProvider>,
    )

    expectNotificationIsHidden(wrapper)
    triggerNotification(wrapper, {
      title: 'test-title',
      content: 'test-content',
      icon: <Github color="red" />,
    })
    await updateWrapper(wrapper, 50)
    expectNotificationIsShow(wrapper)
    expect(wrapper.find('.notification-container').html()).toMatchSnapshot()
  })

  it('should close notification after delay config duration', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockNotification />
      </CfxProvider>,
    )

    expectNotificationIsHidden(wrapper)
    triggerNotification(wrapper, { delay: 100, title: 'test-title', content: 'test-content' })
    await updateWrapper(wrapper, 50)
    expectNotificationIsShow(wrapper)
    // Element already hidden, but Dom was removed after delay
    await updateWrapper(wrapper, 350)
    const notification = wrapper.find('.notification-container').find('.notification')
    expect(notification.length).toBe(0)
  })

  it('should close notification manually', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockNotification />
      </CfxProvider>,
    )

    expectNotificationIsHidden(wrapper)
    triggerNotification(wrapper, {
      delay: 0,
      title: 'close manually',
      content: 'test-content',
      closeable: true,
    })
    await updateWrapper(wrapper, 50)
    expectNotificationIsShow(wrapper)
    wrapper.find('.notification').find('.close').at(0).simulate('click', nativeEvent)
    // Element already hidden, but Dom was removed after delay
    await updateWrapper(wrapper, 350)
    const notification = wrapper.find('.notification-container').find('.notification')
    expect(notification.length).toBe(0)
  })

  it('keep display when hover on', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockNotification />
      </CfxProvider>,
    )

    expectNotificationIsHidden(wrapper)
    triggerNotification(wrapper, {
      delay: 100,
      title: 'display when hover is trigger',
      content: 'test-content',
    })
    await updateWrapper(wrapper, 50)
    expectNotificationIsShow(wrapper)

    wrapper
      .find('.notification-container')
      .find('.notification')
      .simulate('mouseEnter', nativeEvent)
    await updateWrapper(wrapper, 200)

    // Hover event will postpone hidden event
    expectNotificationIsShow(wrapper)
    let notification = wrapper.find('.notification-container').find('.notification')
    expect(notification.length).toBe(1)

    // Restart hidden event after mouse leave
    wrapper
      .find('.notification-container')
      .find('.notification')
      .simulate('mouseLeave', nativeEvent)
    await updateWrapper(wrapper, 350)
    notification = wrapper.find('.notification-container').find('.notification')
    expect(notification.length).toBe(0)
  })

  it('should work with multiple notifications', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockNotification />
      </CfxProvider>,
    )

    expectNotificationIsHidden(wrapper)
    triggerNotification(wrapper, { delay: 100, title: 'test-title', content: 'test-content' })
    triggerNotification(wrapper, { delay: 100, title: 'test-title', content: 'test-content' })
    triggerNotification(wrapper, { delay: 100, title: 'test-title', content: 'test-content' })
    triggerNotification(wrapper, { delay: 100, title: 'test-title', content: 'test-content' })
    triggerNotification(wrapper, { delay: 100, title: 'test-title', content: 'test-content' })
    triggerNotification(wrapper, { delay: 100, title: 'test-title', content: 'test-content' })

    await updateWrapper(wrapper, 200)
    expectNotificationIsShow(wrapper)
    const visibleNotification = wrapper.find('.notification-container').find('.notification')
    expect(visibleNotification.length).toBe(6)

    await updateWrapper(wrapper, 350)
    const notification = wrapper.find('.notification-container').find('.notification')
    expect(notification.length).toBe(0)
  })

  it('should render with custom icon correctly', async () => {
    const wrapper = mount(
      <CfxProvider>
        <MockNotification />
      </CfxProvider>,
    )

    const handler = jest.fn()
    triggerNotification(wrapper, {
      title: 'test-title',
      content: 'test-content',
      onClose: handler,
      delay: 50,
    })
    expect(handler).not.toHaveBeenCalled()
    await updateWrapper(wrapper, 350)
    expect(handler).toHaveBeenCalled()
  })
})

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NotificationMessage from '../../src/components/agent-card/notification-message/notification-message';

const mockStore = createMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Notification Message', () => {
  test('Notification Message  should be rendered', () => {
    const store = mockStore({
      notification: {
        isNotificationShow: true,
        isErrorNotification: false,
        notificationMessage: 'Test Message',
        notificationTime: 1000,
      },
    });
    let wrapper = mount(
      <Provider store={store}>
        <NotificationMessage />
      </Provider>,
    );

    expect(wrapper.find('.notification').length).toBe(1);
  });

  test('Shuld be error messsage', () => {
    const store = mockStore({
      notification: {
        isNotificationShow: true,
        isErrorNotification: true,
        notificationMessage: 'Test Message',
        notificationTime: 1000,
      },
    });
    let wrapper = mount(
      <Provider store={store}>
        <NotificationMessage />
      </Provider>,
    );

    expect(wrapper.find('.notification--error').length).toBe(1);
  });

  test('message shuld be "test message"', () => {
    const store = mockStore({
      notification: {
        isNotificationShow: true,
        isErrorNotification: false,
        notificationMessage: 'test message',
        notificationTime: 1000,
      },
    });
    let wrapper = mount(
      <Provider store={store}>
        <NotificationMessage />
      </Provider>,
    );

    expect(wrapper.text().includes('test message')).toBe(true);
  });

  test('In 1 second the notification must disappear', () => {
    jest.useFakeTimers();
    const store = mockStore({
      notification: {
        isNotificationShow: true,
        isErrorNotification: true,
        notificationMessage: 'Test Message',
        notificationTime: 1000,
      },
    });
    let wrapper = mount(
      <Provider store={store}>
        <NotificationMessage />
      </Provider>,
    );

    expect(store.getActions().length).toBe(0);
    expect(wrapper.find('.notification--active').length).toBe(1);
    setTimeout(() => {
      expect(store.getActions().length).toBe(1);
    }, 1000);
    jest.runAllTimers();
  });
});

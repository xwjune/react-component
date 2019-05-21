import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Countdown from '../index';

describe('Countdown', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('renders correctly', () => {
    const wrapper = shallow(<Countdown />);
    expect(wrapper.render()).toMatchSnapshot();
    const wrapper1 = shallow(
      <Countdown
        count={60}
        suffix="s"
      />
    );
    expect(wrapper1.render()).toMatchSnapshot();
  });

  test('count=0，组件不显示', () => {
    const wrapper = shallow(<Countdown />);
    expect(wrapper.find('span').exists()).toBeFalsy();
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  test('普通倒计时', () => {
    const wrapper = shallow(
      <Countdown
        count={10}
        prefix="剩余"
        suffix="天"
      />
    );
    expect(wrapper.find('span').text()).toBe('剩余10天');
    jest.runTimersToTime(1000);
    expect(wrapper.find('span').text()).toBe('剩余9天');
  });

  test('小时倒计时', () => {
    const wrapper = shallow(
      <Countdown
        count={60 * 60}
        type="hour"
      />
    );
    expect(wrapper.find('span').text()).toBe('60:00');
    jest.runTimersToTime(1000);
    expect(wrapper.find('span').text()).toBe('59:59');
  });

  test('1秒钟后回调onComplete', () => {
    const onComplete = jest.fn();
    const wrapper = shallow(
      <Countdown
        count={1}
        onComplete={onComplete}
      />
    );
    expect(onComplete).not.toHaveBeenCalled();
    jest.runTimersToTime(1000);
    expect(onComplete).toHaveBeenCalled();
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  test('错误type', () => {
    const wrapper = shallow(
      <Countdown
        count={10}
        type="minute"
      />
    );
    expect(wrapper.find('span').text()).toBe('10');
  });

  // todo
  test('componentWillUnmount', () => {
    const spy = sinon.spy();
    spy(Countdown.prototype, 'componentWillUnmount');
    shallow(
      <Countdown count={1} />
    );
    // jest.runTimersToTime(1000);
    // console.log(spy.callCount);
    expect(spy.calledOnce).toBeTruthy();
  });
});

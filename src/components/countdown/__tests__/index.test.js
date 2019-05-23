import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
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
    wrapper.unmount();
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

  test('倒计时', () => {
    const wrapper = shallow(
      <Countdown
        count={10}
        prefix="剩余"
        suffix="天"
      />
    );
    const wrapper1 = shallow(
      <Countdown
        count={60 * 60}
        type="hour"
      />
    );
    expect(wrapper.find('span').text()).toBe('剩余10天');
    expect(wrapper1.find('span').text()).toBe('60:00');
    jest.runTimersToTime(1000);
    expect(wrapper.find('span').text()).toBe('剩余9天');
    expect(wrapper1.find('span').text()).toBe('59:59');
  });

  test('1秒钟后回调onComplete', () => {
    const onComplete = jest.fn();
    const wrapper = shallow(
      <Countdown
        count={1}
        onComplete={onComplete}
      />
    );
    shallow(<Countdown count={1} />); // 未传入onComplete测试
    expect(wrapper.find('span').text()).toBe('1');
    expect(onComplete).not.toHaveBeenCalled();
    jest.runTimersToTime(1000);
    expect(wrapper.find('span').exists()).toBeFalsy();
    expect(wrapper.isEmptyRender()).toBeTruthy();
    expect(onComplete).toHaveBeenCalled();
  });

  test('componentWillUnmount', () => {
    sinon.spy(Countdown.prototype, 'componentWillUnmount');
    const wrapper = mount(<Countdown count={10} />);
    expect(Countdown.prototype.componentWillUnmount.calledOnce).toBeFalsy();
    wrapper.unmount();
    expect(Countdown.prototype.componentWillUnmount.calledOnce).toBeTruthy();
  });
});

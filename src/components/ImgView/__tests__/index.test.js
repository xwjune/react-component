import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import sinon from 'sinon';
import ImgView from '../index';
import getPrefixCls from '../../../utils/getPrefixCls';

const cls = `.${getPrefixCls('img-view')}`;

describe('ImgView', () => {
  test('renders correctly', () => {
    const wrapper = shallow(
      <ImgView
        src="pic.png"
        width="100"
        height="100"
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('全屏预览', () => {
    const wrapper = mount(<ImgView src="pic.png" />);
    expect(wrapper.state('visible')).toBeFalsy();

    // 点击放大
    wrapper.find('img').simulate('click');
    expect(wrapper.instance().container).not.toBeUndefined();
    expect(wrapper.state('visible')).toBeTruthy();
    expect(document.body.getAttribute('style')).toMatch(/overflow: hidden/);
    expect(document.body.querySelectorAll(cls)).toHaveLength(1);

    // 全屏快照
    expect(wrapper.instance().container).toMatchSnapshot();
    expect(document.body).toMatchSnapshot();

    // 点击还原
    document.body.querySelector(cls).click();
    expect(document.body.getAttribute('style')).not.toMatch(/overflow: hidden/);
    expect(document.body.querySelectorAll(cls)).toHaveLength(0);

    wrapper.unmount();
  });

  test('body样式', () => {
    const wrapper = mount(<ImgView src="pic.png" />);
    wrapper.find('img').simulate('click');
    expect(document.body.getAttribute('style')).toMatch(/overflow: hidden/);
    wrapper.unmount();
  });

  test('图片异常点击不放大', () => {
    const wrapper = shallow(<ImgView src="pic.png" />);
    wrapper.find('img').simulate('error');
    expect(wrapper.state('isErr')).toBeTruthy();
    wrapper.find('img').simulate('click');
    expect(wrapper.instance().container).toBeUndefined();
    expect(wrapper.state('visible')).toBeFalsy();
    expect(document.body.querySelectorAll(cls)).toHaveLength(0);
  });

  test('componentWillUnmount', () => {
    const wrapper = shallow(<ImgView src="pic.png" />);
    sinon.spy(ImgView.prototype, 'componentWillUnmount');
    wrapper.find('img').simulate('click');
    expect(ImgView.prototype.componentWillUnmount.calledOnce).toBeFalsy();
    wrapper.unmount();
    expect(ImgView.prototype.componentWillUnmount.calledOnce).toBeTruthy();
    expect(document.body.querySelectorAll(cls)).toHaveLength(0);
  });
});

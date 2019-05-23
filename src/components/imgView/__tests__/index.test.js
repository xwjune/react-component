import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import sinon from 'sinon';
import ImgView from '../index';

describe('ImgView', () => {
  beforeAll(() => {
    document.body.removeAttribute('style');
  });

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
    const wrapper = shallow(
      <ImgView src="pic.png" />
    );
    // 点击放大
    wrapper.find('img').simulate('click');
    expect(wrapper.instance().view).not.toBeUndefined();
    expect(document.body.getAttribute('style')).toBe('overflow: hidden;');
    expect(document.body.querySelectorAll('.jun-img-view')).toHaveLength(1);

    // 全屏快照
    expect(wrapper.instance().view).toMatchSnapshot();
    expect(document.body).toMatchSnapshot();

    // 点击还原
    document.body.querySelector('.jun-img-view').click();
    expect(wrapper.instance().view).toBeUndefined();
    expect(document.body.getAttribute('style')).toBe('');
    expect(document.body.querySelectorAll('.jun-img-view')).toHaveLength(0);
  });

  test('body样式', () => {
    document.body.setAttribute('style', 'background: #fff');
    const wrapper = mount(<ImgView src="pic.png" />);
    wrapper.find('img').simulate('click');
    expect(document.body.getAttribute('style')).toBe('background: #fff; overflow: hidden;');
    wrapper.unmount();
  });

  test('body样式2', () => {
    document.body.setAttribute('style', 'background: #fff;');
    const wrapper = mount(<ImgView src="pic.png" />);
    wrapper.find('img').simulate('click');
    expect(document.body.getAttribute('style')).toBe('background: #fff; overflow: hidden;');
    wrapper.unmount();
  });

  test('图片异常点击不放大', () => {
    const wrapper = shallow(<ImgView src="pic.png" />);
    wrapper.find('img').simulate('error');
    wrapper.find('img').simulate('click');
    expect(wrapper.instance().view).toBeUndefined();
    expect(document.body.querySelectorAll('.jun-img-view')).toHaveLength(0);
  });

  test('componentWillUnmount', () => {
    const wrapper = shallow(<ImgView src="pic.png" />);
    sinon.spy(ImgView.prototype, 'componentWillUnmount');
    wrapper.find('img').simulate('click');
    expect(ImgView.prototype.componentWillUnmount.calledOnce).toBeFalsy();
    wrapper.unmount();
    expect(ImgView.prototype.componentWillUnmount.calledOnce).toBeTruthy();
    expect(document.body.querySelectorAll('.jun-img-view')).toHaveLength(0);
  });
});

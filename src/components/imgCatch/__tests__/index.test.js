import React from 'react';
import { shallow } from 'enzyme';
import ImgCatch from '../index';

describe('ImgCatch', () => {
  test('renders correctly', () => {
    const wrapper = shallow(
      <ImgCatch
        width="100"
        height="100"
        src="pic.png"
        blanksrc="blanksrc.png"
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('图片资源加载异常', () => {
    const onError = jest.fn();
    const wrapper = shallow(
      <ImgCatch
        width="100"
        height="100"
        src="pic.png"
        blanksrc="blanksrc.png"
        onError={onError}
      />
    );
    expect(onError).not.toHaveBeenCalled();
    wrapper.find('img').simulate('error');
    expect(wrapper.state('imgErr')).toBeTruthy();
    expect(wrapper.render()).toMatchSnapshot();
    expect(onError).toHaveBeenCalled();
    expect(wrapper.prop('src')).toBe('blanksrc.png');

    // 空白页图片资源加载异常
    // 测试当替换资源也异常时，此时不再回调onError，防止死循环
    wrapper.find('img').simulate('error');
    expect(onError).toHaveBeenCalledTimes(1);

    // 测试覆盖未传入onError
    const wrapper1 = shallow(
      <ImgCatch
        src="pic.png"
        blanksrc="blanksrc.png"
      />
    );
    wrapper1.find('img').simulate('error');
  });
});

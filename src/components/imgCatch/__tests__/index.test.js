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
        blanksrc="http://pic/blanksrc.png"
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('renders correctly', () => {
    const wrapper = shallow(
      <ImgCatch
        width="100"
        height="100"
        src="xx.png"
        blanksrc="http://pic/blanksrc.png"
      />
    );
    expect(wrapper.prop('src')).toBe('xx.png');
  });
});

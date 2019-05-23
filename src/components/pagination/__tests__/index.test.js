import React from 'react';
import { shallow, mount } from 'enzyme';
import Pagination from '../index';

const PAGE_SIZE = 10;

describe('Pagination', () => {
  test('renders: disable prev', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={10}
        current={1}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('renders: disable next', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={8}
        current={2}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('renders: disable prev and next', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={8}
        current={1}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('renders: showQuickJumper, showSizeChanger', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={10}
        current={1}
        showQuickJumper
        showSizeChanger
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('click prev and next', () => {
    let wrapper = null;
    const total = 19;
    const onChange = (pageNum, pageSize) => {
      const left = total - (pageNum - 1) * PAGE_SIZE;
      const dataSize = left > PAGE_SIZE ? PAGE_SIZE : left;
      wrapper.setProps({
        dataSize,
        pageSize,
        current: pageNum,
      });
    };
    wrapper = mount(
      <Pagination
        dataSize={10}
        current={1}
        onChange={onChange}
        showQuickJumper
        showSizeChanger
      />
    );
    expect(wrapper.find('.page').text()).toBe('页码: 1');
    // 第一页点击上一页-禁止点击
    wrapper.find('.prev').simulate('click');
    expect(wrapper.prop('current')).toBe(1);

    // 下一页点击
    wrapper.find('.next').simulate('click');
    expect(wrapper.prop('current')).toBe(2);
    expect(wrapper.find('.next').hasClass('disabled')).toBeTruthy();

    // 最后一页点击下一页-禁止点击
    wrapper.find('.next').simulate('click');
    expect(wrapper.prop('current')).toBe(2);

    // 上一页点击
    wrapper.find('.prev').simulate('click');
    expect(wrapper.prop('current')).toBe(1);
    expect(wrapper.find('.prev').hasClass('disabled')).toBeTruthy();

    // 跳转至某页
    wrapper.find('input').simulate('change', {
      target: {
        value: 2,
      },
    });
    wrapper.find('input').simulate('keydown', {
      key: 'Enter',
      keyCode: 13,
    });
    expect(wrapper.prop('current')).toBe(2);

    // 更改每页条数
    wrapper.find('select').simulate('change', {
      target: {
        value: 20,
      },
    });
    expect(wrapper.prop('pageSize')).toBe(20);
  });

  test('current、pageSize内部维护', () => {
    const wrapper = shallow(
      <Pagination dataSize={10} />
    );
    expect(wrapper.state('current')).toBe(1);

    // 下一页点击
    wrapper.find('.next').simulate('click');
    expect(wrapper.state('current')).toBe(2);

    // 上一页点击
    wrapper.find('.prev').simulate('click');
    expect(wrapper.state('current')).toBe(1);
    expect(wrapper.find('.prev').hasClass('disabled')).toBeTruthy();
  });

  test('跳转至某页', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={10}
        showQuickJumper
      />
    );
    // 跳转页码格式错误
    wrapper.find('input').simulate('change', {
      target: {
        value: 3.2,
      },
    });
    wrapper.find('input').simulate('keydown', {
      key: 'Enter',
      keyCode: 13,
    });
    expect(wrapper.state('current')).toBe(1);

    // 正确跳转
    wrapper.find('input').simulate('change', {
      target: {
        value: 2,
      },
    });
    // 非enter键
    wrapper.find('input').simulate('keydown', {
      key: 'Shift',
      keyCode: 16,
    });
    expect(wrapper.state('current')).toBe(1);
    // enter键
    wrapper.find('input').simulate('keydown', {
      key: 'Enter',
      keyCode: 13,
    });
    expect(wrapper.state('current')).toBe(2);
  });

  test('更改每页条数', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={10}
        showSizeChanger
      />
    );
    wrapper.find('select').simulate('change', {
      target: {
        value: 20,
      },
    });
    expect(wrapper.state('pageSize')).toBe(20);
  });

  test('设置pageSizeOptions', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={10}
        pageSize={8}
        pageSizeOptions={['10', '20']}
        showSizeChanger
      />
    );
    expect(wrapper.state('pageSizeOptions')).toEqual(['8', '10', '20']);
  });
});

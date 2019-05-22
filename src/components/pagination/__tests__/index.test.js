import React from 'react';
import { shallow, mount } from 'enzyme';
import Pagination from '../index';

const PAGE_SIZE = 10;

describe('Pagination', () => {
  test('renders: 一页', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={8}
        current={1}
        pageSize={10}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('renders: 有下一页', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={10}
        current={1}
        pageSize={10}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('renders: 页码更改，快速跳转', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={10}
        current={1}
        pageSize={10}
        showQuickJumper
        showSizeChanger
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('上下页点击', () => {
    let wrapper = null;
    const total = 19;
    let pageSize = PAGE_SIZE;
    let pageNum = 1;
    let dataSize = 10;
    const onChange = () => {
      const left = total - (pageNum - 1) * PAGE_SIZE;
      dataSize = left > PAGE_SIZE ? PAGE_SIZE : left;
      wrapper.setProps({
        dataSize,
        pageSize,
        current: pageNum,
      });
    };
    wrapper = mount(
      <Pagination
        dataSize={dataSize}
        current={pageNum}
        pageSize={pageSize}
        onChange={onChange}
        showQuickJumper
        showSizeChanger
      />
    );
    // 第一页点击上一页
    wrapper.find('.prev').simulate('click');
    expect(wrapper.find('.page').text()).toBe('页码: 1');

    // 下一页点击
    pageNum += 1;
    wrapper.find('.next').simulate('click');
    expect(wrapper.find('.page').text()).toBe('页码: 2');
    expect(wrapper.find('.next').hasClass('disabled')).toBeTruthy();

    // 最后一页点击下一页
    wrapper.find('.next').simulate('click');

    // 上一页点击
    pageNum -= 1;
    wrapper.find('.prev').simulate('click');
    expect(wrapper.find('.page').text()).toBe('页码: 1');
    expect(wrapper.find('.prev').hasClass('disabled')).toBeTruthy();

    // 跳转至某页
    pageNum = 2;
    wrapper.find('input').simulate('change', {
      target: {
        value: 2,
      },
    });
    wrapper.find('input').simulate('keydown', {
      key: 'Enter',
      keyCode: 13,
    });
    expect(wrapper.find('.page').text()).toBe('页码: 2');

    // 更改每页条数
    pageSize = 20;
    wrapper.find('select').simulate('change', {
      target: {
        value: 20,
      },
    });
    expect(wrapper.find('select').getDOMNode().value).toBe('20');
  });

  test('current、pageSize内部维护', () => {
    const wrapper = shallow(
      <Pagination dataSize={10} />
    );
    expect(wrapper.find('.page').text()).toBe('页码: 1');

    // 下一页点击
    wrapper.find('.next').simulate('click');
    expect(wrapper.find('.page').text()).toBe('页码: 2');

    // 上一页点击
    wrapper.find('.prev').simulate('click');
    expect(wrapper.find('.page').text()).toBe('页码: 1');
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
    expect(wrapper.find('.page').text()).toBe('页码: 1');

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
    expect(wrapper.find('.page').text()).toBe('页码: 1');
    // enter键
    wrapper.find('input').simulate('keydown', {
      key: 'Enter',
      keyCode: 13,
    });
    expect(wrapper.find('.page').text()).toBe('页码: 2');
  });

  test('更改每页条数', () => {
    const wrapper = mount(
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
    expect(wrapper.find('select').getDOMNode().value).toBe('20');
  });

  test('设置pageSizeOptions', () => {
    const wrapper = mount(
      <Pagination
        dataSize={10}
        pageSize={8}
        pageSizeOptions={['10', '20']}
        showSizeChanger
      />
    );
    expect(wrapper.find('select').text()).toBe('8条/页10条/页20条/页');
  });
});

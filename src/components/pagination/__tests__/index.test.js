import React from 'react';
import { shallow, mount } from 'enzyme';
import Pagination from '../index';
import getPrefixCls from '../../../utils/getPrefixCls';

const getCls = cls => getPrefixCls(`pagination-${cls}`);
const queryCls = cls => `.${getCls(cls)}`;

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

  test('renders: disabled', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={10}
        disabled
        showQuickJumper
        showSizeChanger
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
    // 下一页点击
    wrapper.find(queryCls('next')).simulate('click');
    expect(wrapper.state('current')).toBe(1);
  });

  test('renders: error page', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={10}
        current={-1}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.find(queryCls('prev')).hasClass(getCls('disabled'))).toBeTruthy();
    wrapper.find(queryCls('prev')).simulate('click');
    expect(wrapper.state('current')).toBe(-1);
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
      const left = total - (pageNum - 1) * 10;
      const dataSize = left > 10 ? 10 : left;
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
        pageSize={10}
        onChange={onChange}
        showQuickJumper
        showSizeChanger
      />
    );
    expect(wrapper.find(queryCls('page')).text()).toBe('页码: 1');
    // 第一页点击上一页-禁止点击
    wrapper.find(queryCls('prev')).simulate('click');
    expect(wrapper.state('current')).toBe(1);

    // 下一页点击
    wrapper.find(queryCls('next')).simulate('click');
    expect(wrapper.state('current')).toBe(2);
    expect(wrapper.find(queryCls('next')).hasClass(getCls('disabled'))).toBeTruthy();

    // 最后一页点击下一页-禁止点击
    wrapper.find(queryCls('next')).simulate('click');
    expect(wrapper.state('current')).toBe(2);

    // 上一页点击
    wrapper.find(queryCls('prev')).simulate('click');
    expect(wrapper.state('current')).toBe(1);
    expect(wrapper.find(queryCls('prev')).hasClass(getCls('disabled'))).toBeTruthy();

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
    expect(wrapper.state('current')).toBe(2);

    // 更改每页条数
    wrapper.find('select').simulate('change', {
      target: {
        value: 20,
      },
    });
    expect(wrapper.state('pageSize')).toBe(20);
  });

  test('props without current、pageSize', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Pagination dataSize={10} onChange={onChange} />
    );
    expect(wrapper.state('current')).toBe(1);

    // 下一页点击
    wrapper.find(queryCls('next')).simulate('click');
    expect(wrapper.state('current')).toBe(2);
    expect(onChange).toHaveBeenCalled();

    // 上一页点击
    wrapper.find(queryCls('prev')).simulate('click');
    expect(wrapper.state('current')).toBe(1);
    expect(wrapper.find(queryCls('prev')).hasClass(getCls('disabled'))).toBeTruthy();
  });

  test('jump to a page', () => {
    const wrapper = mount(
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

  test('change pageSize', () => {
    const wrapper = shallow(
      <Pagination
        dataSize={10}
        showSizeChanger
      />
    );
    expect(wrapper.find(queryCls('next')).hasClass(getCls('disabled'))).toBeFalsy();
    wrapper.find('select').simulate('change', {
      target: {
        value: 20,
      },
    });
    expect(wrapper.state('pageSize')).toBe(20);
    expect(wrapper.find(queryCls('next')).hasClass(getCls('disabled'))).toBeTruthy();
  });

  test('set pageSizeOptions', () => {
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

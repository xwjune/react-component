/**
 * 缺省总条数的分页
 * 若未传属性current、pageSize，则组件内部维护
 *
 * @date 2018/04/17
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getPrefixCls from '../../utils/getPrefixCls';

function noop() {}

export default class Pagination extends React.PureComponent {
  static propTypes = {
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    current: PropTypes.number,
    pageSize: PropTypes.number,
    dataSize: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    showQuickJumper: PropTypes.bool,
    showSizeChanger: PropTypes.bool,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    prefixCls: getPrefixCls('pagination'),
    style: {},
    className: '',
    disabled: false,
    showQuickJumper: false,
    showSizeChanger: false,
    pageSizeOptions: ['10', '20', '30', '40'], // 默认指定每页可以显示条数
    onChange: noop,
  };

  static getDerivedStateFromProps(props, state) {
    const newState = {};

    if ('current' in props && props.current !== state.current) {
      newState.current = props.current;
    }
    if ('pageSize' in props && props.pageSize !== state.pageSize) {
      newState.pageSize = props.pageSize;
    }

    return newState;
  }

  state = {
    current: this.props.current || 1, // 当前页数
    pageSize: this.props.pageSize || 10, // 每页条数
    jumpPage: '', // 跳转页
  };

  getPageSizeOptions() {
    const { pageSize } = this.state;
    const { pageSizeOptions } = this.props;
    if (pageSizeOptions.some(option => option.toString() === pageSize.toString())) {
      return pageSizeOptions;
    }
    return pageSizeOptions.concat([pageSize.toString()]).sort((a, b) => {
      const numberA = Number.isNaN(Number(a)) ? 0 : Number(a);
      const numberB = Number.isNaN(Number(b)) ? 0 : Number(b);
      return numberA - numberB;
    });
  }

  // 跳转至某页
  handleJump = (e) => {
    if (e.keyCode === 13) {
      // Enter键
      this.setState({
        jumpPage: '',
      });
      const { jumpPage } = this.state;
      if (/^\d+$/.test(jumpPage) && Number(jumpPage) > 0) {
        this.handleChange(Number(jumpPage));
      }
    }
  };

  onJumperChange = (e) => {
    this.setState({
      jumpPage: e.target.value,
    });
  };

  onPageSizeChange = (e) => {
    const pageSize = Number(e.target.value);
    const current = 1;

    if (!('current' in this.props)) {
      this.setState({ current });
    }
    if (!('pageSize' in this.props)) {
      this.setState({ pageSize });
    }
    this.props.onChange(current, pageSize);
  };

  handleChange = (page) => {
    if (!('current' in this.props)) {
      this.setState({
        current: page,
      });
    }
    this.props.onChange(page, this.state.pageSize);
  };

  // 上一页跳转
  prev = () => {
    if (!this.props.disabled && this.hasPrev()) {
      this.handleChange(this.state.current - 1);
    }
  };

  // 下一页跳转
  next = () => {
    if (!this.props.disabled && this.hasNext()) {
      this.handleChange(this.state.current + 1);
    }
  };

  hasPrev = () => {
    return this.state.current > 1;
  };

  hasNext = () => {
    // 当前页数据总数>=每页条数，将有下一页
    return this.props.dataSize >= this.state.pageSize;
  };

  render() {
    const {
      prefixCls,
      showQuickJumper,
      showSizeChanger,
      style,
      className,
      disabled,
    } = this.props;
    const { current, pageSize } = this.state;
    const prevDisabled = disabled || !this.hasPrev(); // 上一页禁用
    const nextDisabled = disabled || !this.hasNext(); // 下一页禁用
    let changeSelect = null;
    if (showSizeChanger) {
      const pageSizeOptions = this.getPageSizeOptions();
      changeSelect = (
        <li className={`${prefixCls}-options`}>
          <select
            value={pageSize}
            onChange={this.onPageSizeChange}
            disabled={disabled}
            aria-disabled={disabled}
          >
            {
              pageSizeOptions.map((el) => (
                <option value={el} key={el}>
                  {el}
                  条/页
                </option>
              ))
            }
          </select>
        </li>
      );
    }

    return (
      <ul
        className={classNames(prefixCls, className)}
        style={style}
        unselectable="unselectable"
      >
        <li className={`${prefixCls}-page`}>
          页码:
          {' '}
          {current}
        </li>
        <li
          className={`${prevDisabled ? `${prefixCls}-disabled ` : ''}${prefixCls}-prev`}
          onClick={this.prev}
          aria-disabled={prevDisabled}
        >
          上一页
        </li>
        <li
          className={`${nextDisabled ? `${prefixCls}-disabled ` : ''}${prefixCls}-next`}
          onClick={this.next}
          aria-disabled={nextDisabled}
        >
          下一页
        </li>
        {changeSelect}
        {
          showQuickJumper && (
            <li className={`${prefixCls}-jumper`}>
              跳至
              <input
                type="text"
                value={this.state.jumpPage}
                onChange={this.onJumperChange}
                onKeyDown={this.handleJump}
                disabled={disabled}
                aria-disabled={disabled}
              />
              页
            </li>
          )
        }
      </ul>
    );
  }
}

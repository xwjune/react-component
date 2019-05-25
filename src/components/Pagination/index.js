/**
 * 缺省总条数的分页
 * 若未传属性current、pageSize，则组件内部维护
 *
 * @param {number} dataSize - 当前返回数据条数【用于判断是否为最后一页】
 * @param {number} [current] - 当前页码
 * @param {function} [onChange] - 页码改变的回调【function(page, pageSize)】
 * @param {number} [pageSize=10] - 每页条数
 * @param {boolean} [showQuickJumper=false] - 是否可以快速跳转至某页
 * @param {boolean} [showSizeChanger=false] - 是否可以改变pageSize
 * @param {string[]} [pageSizeOptions=['10','20','30','40']] - 指定每页可以显示多少条
 *
 * @date 2018/04/17
 */
import React from 'react';
import PropTypes from 'prop-types';
import getPrefixCls from '../../utils/getPrefixCls';

const prefixCls = getPrefixCls('pagination');

export default class Pagination extends React.PureComponent {
  static propTypes = {
    dataSize: PropTypes.number.isRequired,
    current: PropTypes.number,
    pageSize: PropTypes.number,
    onChange: PropTypes.func,
    showQuickJumper: PropTypes.bool,
    showSizeChanger: PropTypes.bool,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    showQuickJumper: false,
    showSizeChanger: false,
    pageSizeOptions: ['10', '20', '30', '40'], // 默认指定每页可以显示条数
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
    pageSize: this.props.pageSize || 10, // 每页条数
    current: this.props.current || 1, // 当前页数
    jumpPage: '', // 跳转页
  };

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

    if (!('pageSize' in this.props)) {
      this.setState({ pageSize });
    }
    if (!('current' in this.props)) {
      this.setState({ current });
    }
    if (this.props.onChange !== undefined) {
      this.props.onChange(current, pageSize);
    }
  };

  handleChange = (page) => {
    if (!('current' in this.props)) {
      this.setState({
        current: page,
      });
    }
    if (this.props.onChange !== undefined) {
      this.props.onChange(page, this.state.pageSize);
    }
  };

  // 上一页跳转
  prev = () => {
    if (this.hasPrev()) {
      this.handleChange(this.state.current - 1);
    }
  };

  // 下一页跳转
  next = () => {
    if (this.hasNext()) {
      this.handleChange(this.state.current + 1);
    }
  };

  hasPrev = () => {
    return this.state.current > 1;
  };

  hasNext = () => {
    return this.props.dataSize === this.state.pageSize;
  };

  render() {
    const {
      pageSizeOptions,
      showQuickJumper,
      showSizeChanger,
    } = this.props;
    const {
      current,
      pageSize,
    } = this.state;
    const prevDisabled = !this.hasPrev(); // 上一页禁用
    const nextDisabled = !this.hasNext(); // 下一页禁用

    return (
      <ul
        className={prefixCls}
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
        {
          showSizeChanger && (
            <li className={`${prefixCls}-options`}>
              <select
                value={pageSize}
                onChange={this.onPageSizeChange}
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
          )
        }
        {
          showQuickJumper && (
            <li className={`${prefixCls}-jumper`}>
              跳至
              <input
                type="text"
                value={this.state.jumpPage}
                onChange={this.onJumperChange}
                onKeyDown={this.handleJump}
              />
              页
            </li>
          )
        }
      </ul>
    );
  }
}

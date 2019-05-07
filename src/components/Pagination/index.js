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
import cs from 'classnames';
import getPrefixCls from '../../utils/getPrefixCls';

const PAGE_SIZE = 10;

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

  state = {
    pageSizeOptions: this.props.pageSizeOptions, // 每页可以显示条数
    pageSize: PAGE_SIZE, // 每页条数
    current: 1, // 当前页数
    jumpPage: '', // 跳转至指定某页
  };

  componentDidMount() {
    const { pageSize, pageSizeOptions } = this.props;
    if (typeof pageSize !== 'undefined') {
      const set = new Set([...pageSizeOptions, `${pageSize}`]);
      this.setState({
        pageSizeOptions: Array.from(set).sort((a, b) => a - b),
      });
    }
  }

  // 跳转至某页
  onJumper = (e) => {
    if (e.keyCode === 13) {
      // Enter键
      const { onChange } = this.props;
      const { jumpPage } = this.state;
      const pageSize = typeof this.props.pageSize !== 'undefined' ? this.props.pageSize : this.state.pageSize;
      this.setState({ jumpPage: '' });
      if (/^\d+$/.test(jumpPage)) {
        // 页码校验
        const page = Number(jumpPage) || 1;
        if (typeof this.props.current === 'undefined') {
          this.setState({
            current: page,
          });
        }
        if (onChange) {
          onChange(page, pageSize);
        }
      }
    }
  };

  onPageSizeChange = (e) => {
    const { onChange } = this.props;
    const pageSize = Number(e.target.value);
    const current = 1;

    if (typeof this.props.pageSize === 'undefined') {
      this.setState({ pageSize });
    }
    if (typeof this.props.current === 'undefined') {
      this.setState({ current });
    }
    if (onChange) {
      onChange(current, pageSize);
    }
  };

  onJumperChange = (e) => {
    this.setState({
      jumpPage: e.target.value,
    });
  };

  onPageChange(type) {
    const { current, dataSize, onChange } = this.props;
    const pageSize = typeof this.props.pageSize !== 'undefined' ? this.props.pageSize : this.state.pageSize;
    let page = typeof current !== 'undefined' ? current : this.state.current;

    if (type === 'prev') {
      // 前一页
      if (page === 1) return; // 第一页
      if (page > 1) page -= 1;
    } else {
      // 后一页
      if (dataSize < pageSize) return; // 最后一页
      page += 1;
    }

    if (typeof current === 'undefined') {
      this.setState({ current: page });
    }
    if (onChange) {
      onChange(page, pageSize);
    }
  }

  render() {
    const {
      dataSize,
      current,
      showQuickJumper,
      showSizeChanger,
    } = this.props;
    const { pageSizeOptions } = this.state;
    const pageSize = typeof this.props.pageSize !== 'undefined' ? this.props.pageSize : this.state.pageSize;
    const page = typeof current !== 'undefined' ? current : this.state.current;
    const isFirst = page === 1; // 是否第一页
    const isLast = dataSize < pageSize; // 是否最后一页

    return (
      <ul
        className={getPrefixCls('pagination')}
        unselectable="unselectable"
      >
        {(showQuickJumper || showSizeChanger) && (
          <li className="options">
            {showQuickJumper && (
              <div className="jumper">
                跳至
                <input
                  type="text"
                  value={this.state.jumpPage}
                  onChange={this.onJumperChange}
                  onKeyDown={this.onJumper}
                />
                页
              </div>
            )}
            {showSizeChanger && (
              <div className="pages">
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
              </div>
            )}
          </li>
        )}
        <li className="pages">
          页码:
          {' '}
          {page}
        </li>
        <li
          className={cs('prev', isFirst ? 'disabled' : '')}
          onClick={() => this.onPageChange('prev')}
        >
          上一页
        </li>
        <li
          className={cs('next', isLast ? 'disabled' : '')}
          onClick={() => this.onPageChange('next')}
        >
          下一页
        </li>
      </ul>
    );
  }
}

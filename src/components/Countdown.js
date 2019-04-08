/**
 * 倒计时
 *
 * @param {number} count - 计数
 * @param {string} [type='normal'] - 类型【normal-常规，hour-小时，minute-分钟】
 * @param {string } [prefix] - 文案前缀
 * @param {string } [suffix] - 文案后缀
 * @param {function } [onComplete] - 倒计时结束回调
 *
 * @date 2019/01/30
 */
import React from 'react';
import PropTypes from 'prop-types';

function zeroFill(data) {
  return data < 10 ? `0${data}` : data;
}

function secToMin(seconds) {
  return `${zeroFill(parseInt(seconds / 60, 10))}:${zeroFill(seconds % 60)}`;
}

export default class Countdown extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    type: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    type: 'normal',
    prefix: '',
    suffix: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      tip: this.renderTip(this.props.count),
    };
  }

  componentDidMount() {
    const { count } = this.props;
    if (count > 0) {
      this.startTimer(count);
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startTimer = (count) => {
    this.intervalId = setInterval(() => {
      count--;
      if (count > 0) {
        this.setState({
          tip: this.renderTip(count),
        });
      } else {
        this.setState({ tip: '' });
        clearInterval(this.intervalId);
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }
    }, 1000);
  };

  renderTip = (count) => {
    if (count <= 0) {
      return '';
    }

    let result = '';
    switch (this.props.type) {
      case 'normal':
        result = count;
        break;
      case 'hour':
        result = `${secToMin(count)}`;
        break;
      case 'minute':
        result = `${zeroFill(count)}`;
        break;
      // no default
    }

    return result;
  };

  render() {
    const {
      prefix,
      suffix,
    } = this.props;
    const { tip } = this.state;

    return <span>{`${prefix}${tip}${suffix}`}</span>;
  }
}

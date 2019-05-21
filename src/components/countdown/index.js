/**
 * 倒计时
 *
 * @param {number} count - 计数
 * @param {string} [type='normal'] - 类型【normal-常规，hour-小时】
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
    count: PropTypes.number,
    type: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    count: 0,
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
    const {
      type,
      prefix,
      suffix,
    } = this.props;
    if (count <= 0) {
      return '';
    }

    let result;
    switch (type) {
      case 'normal':
        result = count;
        break;
      case 'hour':
        result = `${secToMin(count)}`;
        break;
      default:
        result = count;
    }

    return `${prefix}${result}${suffix}`;
  };

  render() {
    const { tip } = this.state;
    if (tip === '') {
      return null;
    }
    return <span>{tip}</span>;
  }
}

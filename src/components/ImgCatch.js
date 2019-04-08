/**
 * 图片异常捕获
 *
 * @param {string} src - 图片资源
 * @param {string} [blanksrc] - 空白页图片资源
 * @param {function} [onError] - 回调
 * @param {*} - img其他属性
 *
 * @date 2019/01/15
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class ImgCatch extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string,
    blanksrc: PropTypes.string.isRequired,
    onError: PropTypes.func,
  };

  state = {
    imgErr: false,
  };

  onError = () => {
    if (!this.state.imgErr) {
      this.setState({
        imgErr: true,
      });
      if (this.props.onError) {
        this.props.onError();
      }
    }
  };

  render() {
    return (
      <img
        alt="图片"
        {...this.props}
        src={this.state.imgErr ? this.props.blanksrc : this.props.src}
        onError={this.onError}
      />
    );
  }
}

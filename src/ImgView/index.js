/**
 * 移动端图片全屏预览
 *
 * @author 小巷 <xwjune@163.com>
 * @date 2019/01/17
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ImgCatch from '../ImgCatch';
import styles from './index.scss';

export default class ImgView extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string,
    onError: PropTypes.func,
  };

  state = {
    isErr: false,
  };

  componentWillUnmount() {
    if (this.view) {
      this.handleHide();
    }
  }

  onError = () => {
    this.setState({
      isErr: true,
    });
    if (this.props.onError) {
      this.props.onError();
    }
  };

  renderView = (src) => {
    return (
      <div
        className={styles.view}
        onClick={this.handleHide}
      >
        <img src={src} alt="预览图片" />
      </div>
    );
  };

  handleShow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.src && !this.state.isErr) {
      this.view = document.createElement('div');
      document.body.appendChild(this.view);
      let style = document.body.getAttribute('style');
      if (style) {
        style += `${/;$/.test(style.trimEnd()) ? '' : ';'} overflow: hidden;`;
      } else {
        style = 'overflow: hidden;';
      }
      document.body.setAttribute('style', style);
      ReactDOM.render(this.renderView(this.props.src), this.view);
    }
  };

  handleHide = () => {
    let style = document.body.getAttribute('style');
    style = style.replace(/\s?overflow: hidden;/, '');
    document.body.setAttribute('style', style);
    document.body.removeChild(this.view);
    this.view = null;
  };

  render() {
    return (
      <ImgCatch
        {...this.props}
        onError={this.onError}
        onClick={this.handleShow}
      />
    );
  }
}

/**
 * 移动端图片全屏预览
 *
 * @date 2019/01/17
 */
import React from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import getPrefixCls from '../../utils/getPrefixCls';

export default class ImgView extends React.Component {
  static propTypes = {
    src: PropTypes.string,
  };

  state = {
    isErr: false,
    visible: false,
  };

  componentWillUnmount() {
    if (this.state.visible) {
      document.body.style.overflow = '';
      document.body.removeChild(this.container);
      delete this.container;
    }
  }

  onError = () => {
    this.setState({
      isErr: true,
    });
  };

  handleShow = () => {
    if (this.props.src && !this.state.isErr) {
      if (!this.container) {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
      }
      document.body.style.overflow = 'hidden';
      this.setState({
        visible: true,
      });
    }
  };

  handleCancel = () => {
    document.body.style.overflow = '';
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <img
          alt="图片"
          {...this.props}
          onError={this.onError}
          onClick={this.handleShow}
        />
        {
          this.state.visible && (
            <Portal
              src={this.props.src}
              container={this.container}
            >
              <div
                className={getPrefixCls('img-view')}
                onClick={this.handleCancel}
              >
                <img
                  src={this.props.src}
                  alt="预览图片"
                />
              </div>
            </Portal>
          )
        }
      </React.Fragment>
    );
  }
}

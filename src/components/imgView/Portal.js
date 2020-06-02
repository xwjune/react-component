import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ children, container }) => {
  return ReactDOM.createPortal(children, container);
};

Portal.propTypes = {
  children: PropTypes.node,
  container: PropTypes.object,
};

export default Portal;

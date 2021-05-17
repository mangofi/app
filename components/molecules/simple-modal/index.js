import React from 'react';
import PropTypes from 'prop-types';

import CloseButton from 'components/atoms/close-button';

import Modal from 'components/molecules/modal';

import * as Styles from './styles';

const SimpleModal = ({
  className, title, show, onHide, children, footer,
}) => (
  <Modal
    centered
    show={show}
    onHide={onHide}
    className={className}
  >
    <Modal.Header closeButton={false}>
      <Modal.Title as="h5">
        {title}
      </Modal.Title>
      <CloseButton onClick={onHide} />
    </Modal.Header>
    <Modal.Body as={Styles.Body}>
      {children}
    </Modal.Body>
    <Modal.Footer as={Styles.ModalFooter}>
      {footer}
    </Modal.Footer>
  </Modal>
);

SimpleModal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  show: PropTypes.bool,
  title: PropTypes.element,
  footer: PropTypes.element,
  onHide: PropTypes.func,
};

SimpleModal.defaultProps = {
  className: null,
  children: null,
  show: false,
  title: null,
  footer: null,
  onHide: () => {},
};

export default SimpleModal;

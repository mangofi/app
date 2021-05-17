import React from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from 'components/atoms/button';
import CloseButton from 'components/atoms/close-button';

import Modal from 'components/molecules/modal';

import {
  bnToNumber,
} from 'utils/number';

import * as Styles from './styles';

const DetailsModal = ({
  contractUrl, totalStaked, show, onHide, token, loading,
}) => (
  <Modal
    centered
    show={show}
    onHide={onHide}
  >
    <Modal.Header closeButton={false}>
      <Modal.Title as="h5">
        Details
      </Modal.Title>
      <CloseButton onClick={onHide} />
    </Modal.Header>
    <Modal.Body as={Styles.Body}>
      <div className="d-flex flex-direction-row justify-content-between">
        <Styles.Label>Total staked</Styles.Label>
        <Styles.Value>
          {loading ? <CircularProgress size={22} /> : `${bnToNumber(totalStaked).toFormat()} ${token}`}
        </Styles.Value>
      </div>
    </Modal.Body>
    <Modal.Footer as={Styles.ModalFooter}>
      {contractUrl && (
      <Button
        flat
        fixedWidth={164}
        leftIcon={<FontAwesomeIcon className="mr-1" icon={faExternalLinkAlt} fixedWidth />}
        secondary
        href={contractUrl}
        target="new"
      >
        View contract
      </Button>
      )}
    </Modal.Footer>
  </Modal>
);

DetailsModal.propTypes = {
  show: PropTypes.bool,
  loading: PropTypes.bool,
  onHide: PropTypes.func,
  contractUrl: PropTypes.string,
  totalStaked: PropTypes.string,
  token: PropTypes.string.isRequired,
};

DetailsModal.defaultProps = {
  show: false,
  loading: false,
  onHide: () => {},
  contractUrl: null,
  totalStaked: '0',
};

export default DetailsModal;

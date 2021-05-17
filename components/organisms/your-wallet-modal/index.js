import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import Button from 'components/atoms/button';
import Address from 'components/atoms/address';

import SimpleModal from 'components/molecules/simple-modal';

import * as Styles from './styles';

const YourWalletModal = ({
  show, onHide, address, avatarUrl, onLogout, walletUrl,
}) => (
  <SimpleModal
    footer={(
      <>
        <Button
          flat
          fixedWidth={97}
          href={walletUrl}
          leftIcon={<FontAwesomeIcon className="mr-1" icon={faExternalLinkAlt} fixedWidth />}
          secondary
          target="new"
        >
          View on BscScan
        </Button>
        <Button
          flat
          fixedWidth={97}
          grayedOut
          onClick={onLogout}
        >
          Log out
        </Button>
      </>
    )}
    show={show}
    title="Your wallet"
    onHide={onHide}
  >
    <Styles.Avatar src={avatarUrl} />
    <Address>{address}</Address>
  </SimpleModal>
);

YourWalletModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

YourWalletModal.defaultProps = {
  avatarUrl: '/img/lemon.svg',
  show: false,
  onHide: () => {},
};

export default YourWalletModal;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/atoms/button';
import Input from 'components/atoms/input';
import CloseButton from 'components/atoms/close-button';

import Modal from 'components/molecules/modal';
import MangoSlider from 'components/molecules/mango-slider';

import { div, add } from 'utils/number';

import * as Styles from './styles';

const StakeTokenModal = ({
  token, show, onHide, onStake, onBuy, balance,
}) => {
  const [amountToStake, setAmountToStake] = useState(0);
  const [invalidAmount, setInvalidAmount] = useState(false);

  const sanitizeAmount = (value) => {
    const numericValue = parseFloat(value);

    if (value.trim().length === 0 || (value.slice(-1) === '.' && amountToStake.toString().indexOf('.') === -1)) {
      return value;
    }
    if (numericValue >= 0) {
      return numericValue;
    }

    return amountToStake;
  };

  const onStakeClick = () => {
    if (amountToStake > 0) {
      onStake(amountToStake.toString());
    } else {
      setInvalidAmount(true);
    }
  };

  const onInputChange = (event) => {
    setInvalidAmount(false);
    setAmountToStake(sanitizeAmount(event.target.value));
  };

  const onSliderChange = (value) => {
    switch (value) {
      case 0:
        setAmountToStake(0);
        break;
      case 0.25:
        setAmountToStake(div(balance, 3));
        break;
      case 0.50:
        setAmountToStake(div(balance, 2));
        break;
      case 0.75:
        setAmountToStake(add(div(balance, 2), div(balance, 3)));
        break;
      default:
        setAmountToStake(balance);
    }
  };

  useEffect(() => {
    if (show) setAmountToStake('');
  }, [show]);

  return (
    <Modal
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton={false}>
        <Modal.Title as="h5">
          Stake
          {' '}
          {token}
        </Modal.Title>
        <CloseButton onClick={onHide} />
      </Modal.Header>
      <Modal.Body as={Styles.Body}>
        <Styles.Figure src={`/img/stake/${token.toLowerCase()}.svg`} />
        <Styles.BalanceContainer>
          <Styles.Balance>Balance</Styles.Balance>
          <span>
            {balance}
            {' '}
            {token}
          </span>
        </Styles.BalanceContainer>
        <div className="mt-2">
          <Input
            isInvalid={invalidAmount}
            value={amountToStake}
            onChange={onInputChange}
            placeholder={0}
            suffix={token}
            size="lg"
          />
        </div>
        <MangoSlider className="mt-4" onChange={onSliderChange} />
        <div className="mt-2">
          You will need
          {' '}
          {token}
          {' '}
          to stake in this pool. Buy some
          {' '}
          {token}
          , or make sure your
          {' '}
          {token}
          {' '}
          isn’t in another pool or farm.
        </div>
      </Modal.Body>
      <Modal.Footer as={Styles.ModalFooter}>
        <Button flat fixedWidth={140} secondary onClick={onBuy}>
          Buy Mango
        </Button>
        <div>
          <Button className="mr-1" grayedOut flat onClick={onHide}>
            Cancel
          </Button>
          &nbsp;
          <Button flat fixedWidth={138} onClick={onStakeClick}>
            Stake
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

StakeTokenModal.propTypes = {
  token: PropTypes.string.isRequired,
  balance: PropTypes.string,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onStake: PropTypes.func,
  onBuy: PropTypes.func,
};

StakeTokenModal.defaultProps = {
  show: false,
  balance: '0.000',
  onHide: () => {},
  onStake: () => {},
  onBuy: () => {},
};

export default StakeTokenModal;

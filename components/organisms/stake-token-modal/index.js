import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/atoms/button';
import Input from 'components/atoms/input';
import CloseButton from 'components/atoms/close-button';

import Modal from 'components/molecules/modal';
import MangoSlider from 'components/molecules/mango-slider';

import {
  div, bnToNumber, perc,
} from 'utils/number';

import * as Styles from './styles';

const StakeTokenModal = ({
  token, show, onHide, onStake, onBuy, balance, loading,
}) => {
  const [amountToStake, setAmountToStake] = useState('');
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [sliderPercentage, setSliderPercentage] = useState(0);

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

  const roundedBalance = useMemo(() => bnToNumber(balance).precision(3).toString(), [balance]);

  const onStakeClick = () => {
    if (loading) return;

    if (amountToStake > 0) {
      onStake(amountToStake.toString());
    } else {
      setInvalidAmount(true);
    }
  };

  const onInputChange = (event) => {
    const sanitizedAmount = sanitizeAmount(event.target.value);

    setInvalidAmount(false);
    setAmountToStake(sanitizedAmount);
    setSliderPercentage(div(sanitizedAmount, roundedBalance));
  };

  const onSliderChange = (value) => {
    setAmountToStake(perc(roundedBalance, value));
  };

  useEffect(() => {
    if (show) {
      setAmountToStake('');
      setInvalidAmount(false);
      setSliderPercentage(0);
    }
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
            {bnToNumber(balance).toString()}
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
        <MangoSlider className="mt-4 mb-2" onChange={onSliderChange} modifiedValue={sliderPercentage} />
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
          <Button loading={loading} flat fixedWidth={138} onClick={!loading && onStakeClick}>
            Stake
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

StakeTokenModal.propTypes = {
  balance: PropTypes.string,
  loading: PropTypes.bool,
  show: PropTypes.bool,
  token: PropTypes.string.isRequired,
  onHide: PropTypes.func,
  onStake: PropTypes.func,
  onBuy: PropTypes.func,
};

StakeTokenModal.defaultProps = {
  balance: '0.000',
  loading: false,
  show: false,
  onHide: () => {},
  onStake: () => {},
  onBuy: () => {},
};

export default StakeTokenModal;

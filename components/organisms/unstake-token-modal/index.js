import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/atoms/button';
import Input from 'components/atoms/input';
import CloseButton from 'components/atoms/close-button';

import Modal from 'components/molecules/modal';
import MangoSlider from 'components/molecules/mango-slider';

import { div, bnToNumber, perc } from 'utils/number';

import * as Styles from './styles';

const UnstakeTokenModal = ({
  token, show, onHide, onUnstake, balance, loading,
}) => {
  const [amountToUnstake, setAmountToUnstake] = useState('');
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [sliderPercentage, setSliderPercentage] = useState(0);

  const sanitizeAmount = (value) => {
    const numericValue = parseFloat(value);

    if (value.trim().length === 0 || (value.slice(-1) === '.' && amountToUnstake.toString().indexOf('.') === -1)) {
      return value;
    }
    if (numericValue >= 0) {
      return numericValue;
    }

    return amountToUnstake;
  };

  const roundedBalance = useMemo(() => bnToNumber(balance).precision(3).toString(), [balance]);

  const onUnstakeClick = () => {
    if (loading) return;

    if (amountToUnstake > 0) {
      onUnstake(amountToUnstake.toString());
    } else {
      setInvalidAmount(true);
    }
  };

  const onInputChange = (event) => {
    const sanitizedAmount = sanitizeAmount(event.target.value);

    setInvalidAmount(false);
    setAmountToUnstake(sanitizedAmount);
    setSliderPercentage(div(sanitizedAmount, roundedBalance));
  };

  const onSliderChange = (value) => {
    setAmountToUnstake(perc(roundedBalance, value));
  };

  useEffect(() => {
    if (show) {
      setAmountToUnstake('');
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
          Unstake
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
            value={amountToUnstake}
            onChange={onInputChange}
            placeholder={0}
            suffix={token}
            size="lg"
          />
        </div>
        <MangoSlider className="mt-4 mb-2" onChange={onSliderChange} modifiedValue={sliderPercentage} />
        <div className="mt-2">
          Your earnings and staked balance will be withdrawn into your wallet. You will need to stake again in order to keep earning.
        </div>
      </Modal.Body>
      <Modal.Footer as={Styles.ModalFooter}>
        <div />
        <div>
          <Button className="mr-1" grayedOut flat onClick={onHide}>
            Cancel
          </Button>
          &nbsp;
          <Button disabled={amountToUnstake == 0} flat fixedWidth={138} loading={loading} onClick={!loading && onUnstakeClick}>
            Unstake
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

UnstakeTokenModal.propTypes = {
  balance: PropTypes.string,
  loading: PropTypes.bool,
  show: PropTypes.bool,
  token: PropTypes.string.isRequired,
  onHide: PropTypes.func,
  onUnstake: PropTypes.func,
  onBuy: PropTypes.func,
};

UnstakeTokenModal.defaultProps = {
  balance: '0.000',
  loading: false,
  show: false,
  onHide: () => {},
  onUnstake: () => {},
  onBuy: () => {},
};

export default UnstakeTokenModal;

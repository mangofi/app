import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/atoms/button';
import Input from 'components/atoms/input';

import SimpleModal from 'components/molecules/simple-modal';
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

  const balanceToNumber = useMemo(() => bnToNumber(balance), [balance]);

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
    setSliderPercentage(div(sanitizedAmount, balanceToNumber.toString()));
  };

  const onSliderChange = (value) => {
    if (value === 1) {
      setAmountToUnstake(balanceToNumber.toString());
    } else {
      setAmountToUnstake(perc(balanceToNumber.toString(), value));
    }
  };

  const onUnstakeButtonClick = () => {
    if (loading) return;

    onUnstakeClick();
  };

  useEffect(() => {
    if (show) {
      setAmountToUnstake('');
      setInvalidAmount(false);
      setSliderPercentage(0);
    }
  }, [show]);

  return (
    <SimpleModal
      footer={(
        <>
          <div />
          <div>
            <Button className="mr-1" grayedOut flat onClick={onHide}>
              Cancel
            </Button>
            &nbsp;
            <Button disabled={amountToUnstake == 0} flat fixedWidth={138} loading={loading} onClick={onUnstakeButtonClick}>
              Unstake
            </Button>
          </div>
        </>
      )}
      show={show}
      title={`Unstake ${token}`}
      onHide={onHide}
    >
      <Styles.Figure src={`/img/stake/${token.toLowerCase()}.svg`} />
      <Styles.BalanceContainer>
        <Styles.Balance>Balance</Styles.Balance>
        <span>
          {balanceToNumber.toFormat()}
          {' '}
          {token}
        </span>
      </Styles.BalanceContainer>
      <div className="mt-2">
        <Input
          isInvalid={invalidAmount}
          value={amountToUnstake}
          onChange={onInputChange}
          onEnterPressed={onUnstakeButtonClick}
          placeholder={0}
          suffix={token}
          size="lg"
        />
      </div>
      <MangoSlider className="mt-4 mb-2" onChange={onSliderChange} modifiedValue={sliderPercentage} />
      <div className="mt-2">
        Your earnings and staked balance will be withdrawn into your wallet. You will need to stake again in order to keep earning.
      </div>
    </SimpleModal>
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

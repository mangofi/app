import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/atoms/button';
import Input from 'components/atoms/input';

import SimpleModal from 'components/molecules/simple-modal';
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

  const balanceToNumber = useMemo(() => bnToNumber(balance), [balance]);
  const hasBalance = useMemo(() => balanceToNumber.gt(0), [balanceToNumber]);

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
    setSliderPercentage(div(sanitizedAmount, balanceToNumber.toString()));
  };

  const onSliderChange = (value) => {
    if (value === 1) {
      setAmountToStake(balanceToNumber.toString());
    } else {
      setAmountToStake(perc(balanceToNumber.toString(), value));
    }
  };

  const onStakeButtonClick = () => {
    if (loading) return;

    onStakeClick();
  };

  useEffect(() => {
    if (show) {
      setAmountToStake('');
      setInvalidAmount(false);
      setSliderPercentage(0);
    }
  }, [show]);

  return (
    <SimpleModal
      footer={(
        <>
          {hasBalance ? (
            <Button flat fixedWidth={140} secondary onClick={onBuy}>
              Buy
              {' '}
              {token}
            </Button>
          ) : <div />}
          <div>
            <Button className="mr-1" grayedOut flat onClick={onHide}>
              Cancel
            </Button>
            {hasBalance ? (
              <Button disabled={amountToStake == 0} loading={loading} flat fixedWidth={138} onClick={onStakeButtonClick}>
                Stake
              </Button>
            ) : (
              <Button flat fixedWidth={138} onClick={onBuy}>
                Buy
                {' '}
                {token}
              </Button>
            )}
          </div>
        </>
      )}
      show={show}
      title={hasBalance ? `Stake ${token}` : `${token} required`}
      onHide={onHide}
    >
      <>
        <Styles.Figure src={`/img/stake/${token.toLowerCase()}.svg`} />
        <Styles.BalanceContainer>
          <Styles.Balance>Balance</Styles.Balance>
          {hasBalance ? (
            <span>
              {balanceToNumber.toFormat()}
              {' '}
              {token}
            </span>
          ) : (
            <Styles.ErrorText>
              Insufficient
              {' '}
              {token}
            </Styles.ErrorText>
          )}
        </Styles.BalanceContainer>
        {hasBalance && (
          <>
            <div className="mt-2">
              <Input
                isInvalid={invalidAmount}
                value={amountToStake}
                onChange={onInputChange}
                onEnterPressed={onStakeButtonClick}
                placeholder={0}
                suffix={token}
                size="lg"
              />
            </div>
            <MangoSlider className="mt-4 mb-2" onChange={onSliderChange} modifiedValue={sliderPercentage} />
          </>
        )}
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
      </>
    </SimpleModal>
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

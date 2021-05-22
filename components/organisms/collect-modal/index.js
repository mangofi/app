import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/atoms/button';
import Switch from 'components/atoms/switch';

import SimpleModal from 'components/molecules/simple-modal';
import Coin from 'components/molecules/coin';

import {
  div, bnToNumber,
} from 'utils/number';

import { COMPOUND, HARVEST } from './constants';

import * as Styles from './styles';

const OPTIONS = [COMPOUND, HARVEST];

const CollectModal = ({
  token, show, onHide, loading, initialEarnings, newStakedBalance, onCompound, onHarvest,
}) => {
  const [selectedOption, setSelectedOption] = useState(COMPOUND);
  const [earnings, setEarnings] = useState(initialEarnings);
  const onCompoundHarvestClick = () => {
    if (selectedOption === COMPOUND) {
      onCompound();
    } else {
      onHarvest();
    }
  };

  const setSwitchOption = (value) => {
    setSelectedOption(OPTIONS[value]);
  };

  useEffect(() => {
    if (show) {
      setSelectedOption(COMPOUND);
    }
  }, [show]);

  useEffect(() => {
    if (!loading) setEarnings(initialEarnings);
  }, [initialEarnings]);

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
            <Button
              flat
              loading={loading}
              fixedWidth={138}
              onClick={!loading && onCompoundHarvestClick}
            >
              {selectedOption}
            </Button>
          </div>
        </>
      )}
      show={show}
      title={`Collect ${token}`}
      onHide={onHide}
    >
      <Switch
        options={OPTIONS}
        selectedIndex={OPTIONS.indexOf(selectedOption)}
        onChange={setSwitchOption}
      />
      <div className="d-flex flex-direction-row align-items-center mt-3">
        <Coin name={token} small />
        <Styles.Earnings className="ml-2">
          {bnToNumber(earnings).toFormat()}
        </Styles.Earnings>
      </div>
      {selectedOption === COMPOUND ? (
        <>
          <Styles.Text className="mt-3">
            Compound adds your earned tokens into your staked balance.
          </Styles.Text>
          <Styles.Text>
            Your new staked balance will be
            {' '}
            <strong>{newStakedBalance.toFormat()}</strong>
          </Styles.Text>
        </>
      ) : (
        <Styles.Text className="mt-3 mb-4">
          Harvest adds your earned tokens into your wallet.
        </Styles.Text>
      )}
    </SimpleModal>
  );
};

CollectModal.propTypes = {
  initialEarnings: PropTypes.string,
  loading: PropTypes.bool,
  newStakedBalance: PropTypes.string,
  show: PropTypes.bool,
  token: PropTypes.string.isRequired,
  onHide: PropTypes.func,
  onCompound: PropTypes.func,
  onHarvest: PropTypes.func,
};

CollectModal.defaultProps = {
  initialEarnings: '0',
  loading: false,
  newStakedBalance: '0',
  show: false,
  onHide: () => {},
  onCompound: () => {},
  onHarvest: () => {},
};

export default CollectModal;

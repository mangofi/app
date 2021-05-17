import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const MangoSlider = ({ className, onChange, modifiedValue }) => {
  const [value, setValue] = useState(0);

  const setSlideValue = (_, newValue) => {
    setValue(newValue);
    onChange(value);
  };

  useEffect(() => {
    setValue(modifiedValue.toString() === 'NaN' ? 0 : modifiedValue);
  }, [modifiedValue]);

  const renderMangoHandle = (props) => (
    <Styles.MangoHandle {...props}>
      <img src="/img/mango-solid.svg" />
      <Styles.ValueLabel>
        {`${Math.floor((props['aria-valuenow'] || 0) * 100)}%`}
      </Styles.ValueLabel>
    </Styles.MangoHandle>
  );

  return (
    <Styles.Container className={className}>
      <Styles.StyledSlider
        step={0.01}
        marks={[
          { value: 0.25 },
          { value: 0.50 },
          { value: 0.75 },
          { value: 1 },
        ]}
        max={1}
        min={0}
        onChange={setSlideValue}
        onChangeCommitted={setSlideValue}
        value={value}
        valueLabelDisplay="on"
        ThumbComponent={renderMangoHandle}
      />
      <Styles.Labels>
        <Styles.Label>Min</Styles.Label>
        <Styles.Label>Max</Styles.Label>
      </Styles.Labels>
    </Styles.Container>
  );
};

MangoSlider.propTypes = {
  className: PropTypes.string,
};

MangoSlider.defaultProps = {
  className: null,
};

export default MangoSlider;

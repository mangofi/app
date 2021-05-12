import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const MangoSlider = ({ className, onChange }) => {
  const [value, setValue] = useState(0);

  const setSlideValue = (_, newValue) => {
    setValue(newValue);
    onChange(value);
  };

  const renderMangoHandle = (props) => {
    console.log(props);
    return (
      <Styles.MangoHandle {...props}>
        <img src="/img/mango-solid.svg" />
        <Styles.ValueLabel>
          {`${props['aria-valuenow'] * 100}%`}
        </Styles.ValueLabel>
      </Styles.MangoHandle>
    );
  };

  return (
    <Styles.Container className={className}>
      <Styles.StyledSlider
        step={0.25}
        marks
        max={1}
        min={0}
        onChange={setSlideValue}
        value={value}
        valueLabelFormat={(valueOnSlide) => `${valueOnSlide * 100}%`}
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

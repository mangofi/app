import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const MangoSlider = ({ className, onChange }) => {
  const [value, setValue] = useState(0);

  const setSlideValue = (_, newValue) => {
    setValue(newValue);
    onChange(value);
  };

  return (
    <Styles.Container className={className}>
      <Slider
        step={0.25}
        marks={[0, 0.25, 0.5, 0.75, 1]}
        max={1}
        min={0}
        onChange={setSlideValue}
        value={value}
        valueLabelFormat={(value) => `${value * 100}%`}
        valueLabelDisplay="auto"
      />
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

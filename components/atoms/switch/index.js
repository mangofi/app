import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const Switch = ({ options, selectedIndex = 0, onChange }) => {
  const onOptionClick = (index) => {
    onChange(index);
  };

  return (
    <Styles.Container>
      <Styles.Options>
        <Styles.Option active={selectedIndex === 0} onClick={() => { onOptionClick(0); }}>
          {options[0]}
        </Styles.Option>
        <Styles.Option active={selectedIndex === 1} onClick={() => { onOptionClick(1); }}>
          {options[1]}
        </Styles.Option>
      </Styles.Options>
    </Styles.Container>
  );
};

Switch.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  selectedIndex: 0,
  onChange: () => {},
};

export default Switch;

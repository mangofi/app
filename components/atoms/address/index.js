import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import * as Styles from './styles';

const INITIAL_TOOLTIP_TEXT = 'Copy address';

const Address = ({ children }) => {
  const [tooltipText, setTooltipText] = useState(INITIAL_TOOLTIP_TEXT);

  const onCopy = async () => {
    if (!navigator.clipboard) return;

    await navigator.clipboard.writeText(children);
    setTooltipText('Address copied!');
  };

  const resetTooltip = () => {
    setTooltipText(INITIAL_TOOLTIP_TEXT);
  };

  return (
    <Styles.Container arrow className="mt-3" title={tooltipText} placement="top" onOpen={resetTooltip}>
      <div onClick={onCopy}>
        <Styles.Address>{children}</Styles.Address>
        <Styles.CopyIcon className="ml-1" icon={faCopy} fixedWidth />
      </div>
    </Styles.Container>
  );
};

Address.propTypes = {
  children: PropTypes.string,
};

export default Address;

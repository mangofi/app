import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const SidebarMenuItem = ({
  active, icon, children, href, disabled, small,
}) => {
  const onPress = (event) => {
    if (disabled) {
      event.preventDefault();
    }
  };

  return (
    <Styles.Container>
      <Link passHref href={!disabled ? href : '#'} scroll={false} onPress={onPress}>
        <Styles.Link active={active} disabled={disabled} small={small}>
          <i>{icon}</i>
          {' '}
          {children}
        </Styles.Link>
      </Link>
    </Styles.Container>
  );
};

SidebarMenuItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  icon: PropTypes.string,
  children: PropTypes.element,
  href: PropTypes.string,
};

SidebarMenuItem.defaultProps = {
  active: false,
  disabled: false,
  small: false,
  icon: null,
  children: null,
  href: null,
};

export default SidebarMenuItem;

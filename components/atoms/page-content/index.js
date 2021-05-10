import React from 'react';

import * as Styles from './styles';

const PageContent = ({ className, children }) => (
  <Styles.Container className={`d-flex flex-fill flex-column ${className}`}>
    {children}
  </Styles.Container>
);

export default PageContent;

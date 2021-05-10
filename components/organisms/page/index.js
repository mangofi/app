import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import PageContent from 'components/atoms/page-content';

import Sidebar from 'components/organisms/sidebar';

import * as Styles from './styles';

const Page = ({ children, currentPage }) => (
  <Container fluid className="p-0 w-100 pt-3">
    <Styles.Content>
      <Sidebar currentPage={currentPage} />
      <PageContent>
        {children}
      </PageContent>
    </Styles.Content>
  </Container>
);

Page.propTypes = {
  children: PropTypes.element,
  currentPage: PropTypes.string,
};

Page.defaultProps = {
  children: null,
  currentPage: '#',
};

export default Page;

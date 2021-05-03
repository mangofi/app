import React from 'react';
import {
  Container,
} from 'react-bootstrap';

import PageContent from '../atoms/page-content';

import Sidebar from '../organisms/sidebar';

export default function Home() {
  return (
    <Container fluid className="p-0 w-100 mt-3">
      <div style={{
        paddingLeft: 114, paddingRight: 114, display: 'flex', flexDirection: 'row',
      }}
      >
        <Sidebar currentPage="/" />
        <PageContent>
          <h1>Welcome to MangoFi</h1>
        </PageContent>
      </div>
    </Container>
  );
}

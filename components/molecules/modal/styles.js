import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  & .modal-content {
    background-color: var(--black800);
    border-radius: 16px;
  }
  
  & .modal-header {
    align-items: center;
    border-bottom: none;
    padding: 24px;
  }
  
  & .modal-body {
    padding: 24px;
  }
  
  & .modal-footer {
    background-color: #161C22;
    border-radius: 16px;
    border-top: none;
    padding-bottom: 24px;
  }
`;

import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const Container = styled(Button)`
  background-color: var(--primary500);
  border: none;
  border-radius: 39px;
  -webkit-box-shadow: 0px 2px 4px rgba(255, 102, 0, 0.15), 0px 8px 16px rgba(255, 102, 0, 0.16);
  -moz-box-shadow:    0px 2px 4px rgba(255, 102, 0, 0.15), 0px 8px 16px rgba(255, 102, 0, 0.16);
  box-shadow:         0px 2px 4px rgba(255, 102, 0, 0.15), 0px 8px 16px rgba(255, 102, 0, 0.16);
  cursor: pointer;
  font-size: 14px;
  height: 42px;
  line-height: 24px;
  min-width: ${({ fixedWidth }) => (fixedWidth ? '100px' : 'auto')};
  padding: 8px 28px;
  
  ${({ secondary }) => {
    if (secondary) {
      return `
        background-color: var(--primary100);
        color: var(--primary500);
      `;
    }

    return null;
  }}
  
  ${({ small }) => {
    if (small) {
      return `
        background-color: var(--black200);
        color: var(--black400);
        font-size: 14px;
        height: auto;
        padding: 3px;
      `;
    }

    return null;
  }}
  
  ${({ flat }) => {
    if (flat) {
      return `
        -webkit-box-shadow: none;
        -moz-box-shadow:    none;
        box-shadow:         none;
      `;
    }

    return null;
  }}
  
  &:hover, &:active, &:focus {
    background-color: var(--primary600) !important;
    border-color: var(--primary500) !important;
    
    ${({ secondary }) => {
    if (secondary) {
      return `
          background-color: var(--primary200) !important;
          color: var(--primary500);
        `;
    }

    return null;
  }}
  }
  
  &:disabled {
    background-color: var(--black200) !important;
    border: none;
    -webkit-box-shadow: none;
    -moz-box-shadow:    none;
    box-shadow:         none;
    color: var(--black400) !important;
    cursor: auto;
  }
`;

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
  min-width: ${({ fixedWidth }) => (fixedWidth ? `${fixedWidth}px` : 'auto')};
  padding: 8px 28px;
  
  ${({ secondary }) => {
    if (secondary) {
      return `
        background-color: #2A1E16;
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
  
  ${({ grayedOut }) => {
    if (grayedOut) {
      return `
        background-color: var(--black700);
        color: var(--black200);
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
          background-color: #773E18 !important;
          color: var(--primary500);
        `;
    }

    return null;
  }}
    
    ${({ grayedOut }) => {
    if (grayedOut) {
      return `
          background-color: var(--black600) !important;
          color: var(--black200);
        `;
    }

    return null;
  }}
  }
  
  &:disabled {
    background-color: var(--black700) !important;
    border: none;
    -webkit-box-shadow: none;
    -moz-box-shadow:    none;
    box-shadow:         none;
    color: ${({ grayedOut }) => { grayedOut ? 'var(--black200)' : 'var(--black600)'; }} !important;
    cursor: auto;
  }
`;

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
  padding: 8px 28px;

  &:hover, &:active {
    background-color: var(--primary600) !important;
    border-color: var(--primary500) !important;
  }
  
  &:disabled {
    background-color: var(--black200) !important;
    border: none;
    -webkit-box-shadow: none;
    -moz-box-shadow:    none;
    box-shadow:         none;
    color: var(--black400) !important;
  }
  
  ${({ small }) => {
    if (small) {
      return `
        background-color: var(--black200);
        -webkit-box-shadow: none;
        -moz-box-shadow:    none;
        box-shadow:         none;
        color: var(--black400);
        font-size: 14px;
        height: auto;
        padding: 3px;
      `;
    }

    return null;
  }}
`;

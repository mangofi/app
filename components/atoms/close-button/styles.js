import styled from 'styled-components';
import BSButton from 'react-bootstrap/Button';

export const Button = styled(BSButton)`
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: var(--black500);
  font-size: 16px;
  padding: 4px 6px;

  &:hover, &:focus, &:active {
    background-color: var(--black600) !important;
    border: none !important;
    box-shadow: none !important;
    color: var(--black500) !important;
  }
  
  &:disabled {
    background-color: var(--black800) !important;
    border: none;
    color: var(--black700) !important;
  }
  
  ${({ disabled }) => {
    if (disabled) {
      return `
        background-color: var(--black800) !important;
        border: none;
        color: var(--black700) !important;
      `;
    }
    return '';
  }}
`;

import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const TokenName = styled.span`
  color: var(--black500);
  font-weight: 450;
  font-size: 16px;
  line-height: 28px;
  position: absolute;
  right: ${({ isInvalid }) => (isInvalid ? '32px' : '20px')};
  top: 50%;
  margin-top: -14px;
`;

export const Input = styled(Form.Control)`
  background-color: var(--black700);
  border-color: transparent;
  border-radius: 26px;
  color: #fff;
  font-weight: 450;
  font-size: 16px;
  line-height: 28px;
  padding-right: ${({ isInvalid }) => (isInvalid ? '92px' : '80px')};
  
  &:active, &:focus {
    background-color: var(--black900);
    border: 1px solid var(--primary500);
    box-shadow: none;
    color: #fff;
  }
  
  ::-webkit-input-placeholder, :-moz-placeholder, ::-moz-placeholder, :-ms-input-placeholder, ::-ms-input-placeholder, ::placeholder {
    color: var(--black500);
    opacity: 1;
  }
`;

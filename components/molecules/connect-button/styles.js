import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Address = styled.button`
  align-items: center;
  background-color: #ffffff;
  border: none;
  border-radius: 39px;
  box-shadow: 0px 2px 4px 0px #60617029, 0px 0px 1px 0px #28293D0A;
  color: var(--black500);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  height: 50px;
  line-height: 17px;
  padding: 0 10px;
  width: 100%;
  
  &:hover, &:active {
    border-color: orange;
  }
`;

export const ConnectBtn = styled(Button)`
  background-color: var(--primary500);
  border: none;
  border-radius: 39px;
  -webkit-box-shadow: 0px 2px 4px rgba(255, 102, 0, 0.15), 0px 8px 16px rgba(255, 102, 0, 0.16);
  -moz-box-shadow:    0px 2px 4px rgba(255, 102, 0, 0.15), 0px 8px 16px rgba(255, 102, 0, 0.16);
  box-shadow:         0px 2px 4px rgba(255, 102, 0, 0.15), 0px 8px 16px rgba(255, 102, 0, 0.16);
  cursor: pointer;
  font-size: 16px;
  height: 50px;
  padding: 0 10px;
  
  &:hover, &:active {
    background-color: var(--primary600);
  }
`;

export const Avatar = styled.img`
  border-radius: 100%;
  margin-right: 18px;
`;

export const AccountInfo = styled.div`
  text-align: left;
`;

export const AccountNumber = styled.div`
  font-size: 14px;
`;

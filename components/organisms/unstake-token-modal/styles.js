import styled from 'styled-components';

export const Figure = styled.img`
  height: 100%;
  margin: 0 auto;
  max-height: 180px;
  max-width: 180px;
  width: 100%;
`;

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: 450;
  justify-content: space-between;
  margin-top: 24px;
  width: 100%;
`;

export const Balance = styled.span`
  color: var(--black400);
  font-weight: 500;
`;

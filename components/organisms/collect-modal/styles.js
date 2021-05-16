import styled from 'styled-components';

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

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

export const Earnings = styled.span`
  color: #fff;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: -0.35px;
  line-height: 37px;
`;

export const Text = styled.div`
  font-size: 16px;
  font-weight: 450;
  line-height: 28px;
  
  & strong {
    font-weight: 700;
  }
`;

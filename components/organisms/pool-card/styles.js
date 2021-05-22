import styled, { keyframes } from 'styled-components';

import Card from '../../atoms/card';

const colorMutation = keyframes`
  from {
    border-color: var(--primary400) var(--primary500) var(--primary400) var(--primary200);
  }
  
  25% {
    border-color: var(--primary200) var(--primary400) var(--primary500) var(--primary400);
  }
  
  50% {
    border-color: var(--primary400) var(--primary200) var(--primary500) var(--primary400);
  }
  
  75% {
    border-color: var(--primary500) var(--primary400) var(--primary200) var(--primary400);
  }

  to {
    border-color: var(--primary400) var(--primary500) var(--primary400) var(--primary200);
  }
`;

export const StyledCard = styled(Card)`
  animation: ${colorMutation} 3s linear infinite;
  border-width: 2px;
  transition: border-color 2s ease;
  
  ${({ working }) => (working ? null : 'border-color: var(--black700) !important;')}
`;

export const VerifiedIconContainer = styled.span`
  color: #0094FF;
  font-size: 15px;
  margin-top: 3px;
  margin-left: 6px;
`;

export const EarningsContainer = styled.div`
`;

import styled from 'styled-components';

export const Container = styled.div`
  background-color: var(--black800);
  border: 1px solid var(--black700);
  border-radius: 8px;
  box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.04), 0px 2px 4px rgba(96, 97, 112, 0.16);
  margin-top: 55px;
  max-width: 423px;
  padding: 28px;
  padding-bottom: 34px;
  padding-top: 24px;
  position: relative;
  
  a {
    color: var(--primary500);
  }
  
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }
  
  h6.bold {
    font-size: 20px;
    font-weight: 900;
  }
  
  small {
    font-size: 12px;
    line-height: 21px;
  }
  small.text-gray {
    color: var(--black500);
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

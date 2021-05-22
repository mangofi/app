import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

export const Container = styled.div`
  
`;

export const StyledSlider = styled(Slider)`
  & .MuiSlider-rail {
    background-color: var(--black700);
    height: 4px;
    opacity: 1;
  }
  
  & .MuiSlider-track {
    border-radius: 8px;
    height: 4px;
  }
  
  & .MuiSlider-mark {
    background-color: var(--black600);
    border-radius: 50%;
    height: 4px;
    width: 4px;
    opacity: 1;
  }
  
  & .MuiSlider-markActive {
    background-color: var(--primary600);
  }
`;

export const MangoHandle = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ValueLabel = styled.div`
  background-color: var(--primary500);
  border-radius: 58px;
  bottom: 0;
  color: white;
  font-size: 12px;
  font-weight: 500;
  line-height: 21px;
  padding: 0 6px;
  position: absolute;
  transform: translate(-4px, 30px);
`;

export const Labels = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.span`
  color: var(--black400);
  font-size: 14px;
  font-weight: 500;
  line-height: 10px;
`;

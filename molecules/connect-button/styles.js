import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`

export const Address = styled.a`
  background: none;
  border: 1px solid #888;
  border-radius: 6px;
  color: #AAA;
  cursor: pointer;
  font-size: 14px;
  padding: 10px;
  
  &:hover {
    border-color: orange;
  }
`

export const ConnectBtn = styled.button`
  background-color: orange;
  border: none;
  cursor: pointer;
  font-size: 14px;
  height: 50px;
  padding: 0 10px;
  
  &:hover {
    background-color: red;
  }
  
  &:active {
    background-color: gray;
  }
`
import styled from "styled-components"

export const Container = styled.div`
  background-color: ${({color}) => color ? color : "gray" };
  height: 33px;
`

export const InputContainer = styled.div`
  display: inline-block;
  height: 100%;
  padding: 3px;
  width: 79%;
`

export const Input = styled.input`
  background-color: #333;
  border: none;
  color: ${({color}) => color ? color : "white" };
  display: inline-block;
  height: 100%;
  outline: none;
  padding: 10px 8px;
  width: 100%;
`

export const ButtonContainer = styled.div`
  display: inline-block;
  height: 100%;
  min-width: 39px;
  width: 21%;
`

export const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  height: 100%;
  padding-right: 12px;
  text-align: center;
  transition: all 0.21s ease;
  width: 100%;
  
  &:hover {
    color: white;
  }
`
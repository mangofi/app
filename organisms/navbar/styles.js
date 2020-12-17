import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 74px;
`

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const MenuContainer = styled.nav`
  display: flex;
  align-items: center;
  min-width: 700px;
  padding: 0 20px;
`

export const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
`

export const MenuItem = styled.li`
  margin: 0 10px;
`

export const MenuLink = styled.a`
  text-decoration: none;
  
  &:hover {
    color: orange;
  }
`

export const AccountContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
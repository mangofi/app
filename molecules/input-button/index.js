import React from 'react'

import * as Styles from './styles'

export default ({color, placeholder, text}) => {
  return (
    <Styles.Container color={color}>
      <Styles.InputContainer>
        <Styles.Input color={color} placeholder={placeholder} />
      </Styles.InputContainer>
      <Styles.ButtonContainer>
        <Styles.Button>
          {text}
        </Styles.Button>
      </Styles.ButtonContainer>
    </Styles.Container>
  )
}
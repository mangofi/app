import React from 'react'

import * as Styles from './styles'

export default ({color, placeholder, text, ...props}) => {
  return (
    <Styles.Container color={color}>
      <Styles.InputContainer>
        <Styles.Input color={color} placeholder={placeholder} {...props}/>
      </Styles.InputContainer>
      <Styles.ButtonContainer>
        <Styles.Button>
          {text}
        </Styles.Button>
      </Styles.ButtonContainer>
    </Styles.Container>
  )
}
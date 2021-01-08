import React from 'react'

import * as Styles from './styles'

export default function Amount({ children }) {
  return (
    <Styles.Container>
      {children} MNGO
    </Styles.Container>
  )
}
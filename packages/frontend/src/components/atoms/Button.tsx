import React from 'react'

interface ButtonProps {
  text: string
  onClick: () => void
  isDisabled?: boolean
}

function Button(props: ButtonProps): JSX.Element {
  return (
    <button onClick={props.onClick} disabled={props.isDisabled}>
      {props.text}
    </button>
  )
}

export default Button

import React from 'react'

interface ButtonProps {
  text: string
  callback: () => void
  isDisabled?: boolean
}

function Button(props: ButtonProps): JSX.Element {
  return (
    <button onClick={props.callback} disabled={props.isDisabled}>
      {props.text}
    </button>
  )
}

export default Button

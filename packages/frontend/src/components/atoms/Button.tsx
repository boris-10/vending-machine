import React from 'react'

interface ButtonProps {
  text: string
  onClick: () => void
  isDisabled?: boolean
}

function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      disabled={props.isDisabled}
      className="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {props.text}
    </button>
  )
}

export default Button

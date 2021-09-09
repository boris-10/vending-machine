import React from 'react'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string
  onClick?: () => void
  variation?: 'primary' | 'success' | 'warning' | 'danger'
  isDisabled?: boolean
}

function Button(props: ButtonProps): JSX.Element {
  const color = () => {
    if (props.isDisabled) {
      return 'bg-gray-400 cursor-not-allowed'
    }

    switch (props.variation) {
      case 'success':
        return 'bg-green-500 hover:bg-green-600'
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600'
      case 'danger':
        return 'bg-red-500 hover:bg-red-600'
      case 'primary':
      default:
        return 'bg-indigo-600 hover:bg-indigo-700'
    }
  }

  return (
    <button
      onClick={props.onClick}
      disabled={props.isDisabled}
      className={`${color()} ${
        props.className
      } justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
    >
      {props.text}
    </button>
  )
}

export default Button

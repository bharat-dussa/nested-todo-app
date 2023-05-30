import React from 'react'

const ErrorText = ({errorText}: {errorText: string}) => {
  return (
    <p className="text-orange-600 text-sm mt-1 ml-1">{errorText}</p>
  )
}

export default ErrorText
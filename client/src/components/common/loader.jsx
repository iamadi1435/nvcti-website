import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({ variant, message, extraStyle, bool }) => {
  return (
    <div className="align-center justify-center">
      <Spinner
        animation="border"
        variant={variant}
        style={{
          height: '1.2rem',
          width: '1.2rem',
          borderWidth: '0.2rem',
          marginRight: '3px'
        }}
      />
      <p style={extraStyle} className="mb-0">
        {bool ? 'Loading...' : message}
      </p>
    </div>
  )
}

export default Loader

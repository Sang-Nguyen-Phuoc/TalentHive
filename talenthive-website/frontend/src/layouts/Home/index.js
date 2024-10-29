import React, { Fragment } from 'react'

const LayoutHome = ({children}) => {
  return (
    <Fragment>
        <header>Header</header>
        <div>{children}</div>
    </Fragment>
  )
}

export default LayoutHome
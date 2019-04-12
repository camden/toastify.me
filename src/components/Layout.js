import React from "react"

import "typeface-merriweather"
import "typeface-roboto"
import "typeface-ultra"

import "./Layout.css"

export default ({ children }) => {
  return <div className="layout-wrapper">{children}</div>
}

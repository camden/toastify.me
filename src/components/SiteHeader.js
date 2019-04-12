import React from "react"
import { Link } from "gatsby"

import "./SiteHeader.css"

export default () => (
  <section className="site-header">
    <Link to="/">
      <div className="site-title">toastcards</div>
    </Link>
    {/* <div className="site-link-area">
      <Link to="/resume">
        <div className="site-link">Résumé</div>
      </Link>
    </div> */}
  </section>
)

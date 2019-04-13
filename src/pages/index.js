import React, { useEffect } from "react"
import Helmet from "react-helmet"

import SiteHeader from "components/SiteHeader"
import Layout from "components/Layout"

import "./index.css"
import convertImageToToast from "../utils/convertImageToToast"

const IndexPage = ({ data }) => {
  useEffect(() => {
    convertImageToToast()
  })

  return (
    <Layout>
      <Helmet>
        <title>toastcards</title>
      </Helmet>
      <div className="site-wrapper">
        <div className="title-wrapper">
          <div className="title">toastify.me</div>
          <div id="info-message">Enable your camera to get started! 🍞</div>
          <div id="success-message">
            <button id="pause-button">Pause</button>
            <button id="resume-button">Resume</button>
          </div>
        </div>
        <main className="toast-wrapper">
          <canvas id="toast-image" width={1024} height={1024} />
        </main>
      </div>
    </Layout>
  )
}

export default IndexPage

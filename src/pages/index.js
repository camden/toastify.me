import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"
import Helmet from "react-helmet"

import RecipeCard from "components/RecipeCard"
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
        <div className="title">toastify.me</div>
        <main className="toast-wrapper">
          <canvas id="normal-image" width={200} height={200} />
          <canvas id="toast-image" width={1000} height={1000} />
        </main>
      </div>
    </Layout>
  )
}

export default IndexPage

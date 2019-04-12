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
        <SiteHeader />
        <main className="portfolio-wrapper">
          <canvas id="normal-image" width={200} height={200} />
        </main>
        <footer className="site-footer" />
      </div>
    </Layout>
  )
}

export default IndexPage

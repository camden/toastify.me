import React from "react"
import { Link, graphql } from "gatsby"
import Helmet from "react-helmet"

import RecipeCard from "components/RecipeCard"
import SiteHeader from "components/SiteHeader"
import Layout from "components/Layout"

import "./index.css"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>toastcards</title>
      </Helmet>
      <div className="site-wrapper">
        <SiteHeader />
        <main className="portfolio-wrapper">
          <RecipeCard />
        </main>
        <footer className="site-footer" />
      </div>
    </Layout>
  )
}

export default IndexPage

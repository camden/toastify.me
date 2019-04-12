import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"

import "./projectPage.css"
import SiteHeader from "components/SiteHeader"
import Layout from "components/Layout"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const projectExtraClass = frontmatter.type === "grid" ? "project-grid" : ""
  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <div className="project-wrapper">
        <SiteHeader />
        <div className="project-info">
          <h1 className="project-title">{frontmatter.title}</h1>
          <h2 className="project-subtitle">{frontmatter.subtitle}</h2>
        </div>
        <div
          className={`project-content ${projectExtraClass}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        subtitle
        type
      }
    }
  }
`

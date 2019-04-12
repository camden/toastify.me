const path = require("path")

exports.RENAMEDcreatePages = ({ actions, graphql }) => {
  const { createPage } = actions

  const projectPageTemplate = path.resolve(
    `src/templates/projectPageTemplate.js`
  )

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: projectPageTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}

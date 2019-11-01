const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`./src/templates/post.js`)
  const result = await graphql(
    `
      {
        allContentfulPost {
          edges {
            node {
              slug
              title
              subtitle
              publishDate
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allContentfulPost.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.slug,
      component: postTemplate,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    })
  })
}

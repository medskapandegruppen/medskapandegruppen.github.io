import React from "react"
import { Link, graphql } from "gatsby"

//import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulPost
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.title}
          description={post.excerpt}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.publishDate}
            </p>
          </header>
          {/* <section dangerouslySetInnerHTML={{ __html: post.content }} /> */}
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            {/* <Bio /> */}
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.slug} rel="prev">
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.slug} rel="next">
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    contentfulPost(slug: { eq: $slug }) {
      title
      content {
        json
      }
    }
  }
`

// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import status from '../../../helpers/status'
import { fetchArticle } from '../redux'

export class BlogArticle extends Component {


  render(){

    console.log( "BLOG ARTICLES PROPS...." );
    console.log( this.props );
    console.log( "....BLOG ARTICLES PROPS" );

    const { article } = this.props.redux.blog
    /* is set to "loading" via reducer in respective redux.js file */
    if (!article && article === "loading") {
      return (
        <article>
          <Helmet title="Loading..." />
          <h1>Loading...</h1>
        </article>
      )
    }

    if (!article) {
      status(404)

      return (
        <article>
          <Helmet title="Not Found" />
          <h1>Not Found</h1>
        </article>
      )
    }

    return (
      <article>
        <Helmet title={ article.title } />
        <h1>{ article.title }</h1>
        <div>{ article.body }</div>
      </article>
    )
  }
}

/*
  'displayName' should definitely be set - this will help tell you which component is being
  debugged when in dev mode, ie: "Blog {...error...}" instead of just "A Component {...error...}"
*/
BlogArticle.displayName = 'BlogArticle'

/*
  'propTypes' should also definitely be set - this will help tell you what data is being worked with on the Component.
    - Notice that only the data we are working with needs to be type-checked.
*/
BlogArticle.propTypes = {
  redux: PropTypes.shape({
    blog: PropTypes.shape({
      article: PropTypes.oneOfType([
          PropTypes.string, // "loading"
          PropTypes.shape({ // API returned data.
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired
          })
      ]),
    })
  }),
}

BlogArticle.onEnter = ({ dispatch }, { params }) => dispatch(fetchArticle(params.slug))

export default BlogArticle
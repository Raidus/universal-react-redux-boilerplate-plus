// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

import { fetchArticles } from './redux'

export class Blog extends Component {

  render(){
    // grab Component styles.
    const styles = require('./Blog.scss')
    // redux: passed in from App.js via React.cloneElement(children, {redux:redux})
    // pluck objects from this.props for more readable code.
    const { redux, actions } = this.props
    // access global state.
    console.log( redux );

    return (
      <div className={ styles.Blog }>

        {/* will show on all nested blog pages unless overwritten */}
        <Helmet titleTemplate="%s | YOUR SITE KNOWLEDGE BASE MORE KEYWORDS" >
          <title>Show Me On SERPs, Put Keywords Here</title>
          <meta name="description" content="This is our blog" />
          <body className="bodywrapper-blog" />
        </Helmet>

        <aside className={ styles.overview }>
          <nav>
            <ul>
              { redux.blog.articles.map(({ slug, title }) => (
                <li key={ slug }>
                  <Link to={ `/blog/${ slug }` }>{ title }</Link>
                </li>
              )) }
            </ul>
          </nav>
        </aside>
        <main className={ styles.article }>
          {/* Enables child components to access the global state via `this.props.redux` */}
          {/* Components within this component should be functional components for the most part, with redux props being passes through props. */}
          { React.cloneElement( this.props.children, { redux, actions } ) }
        </main>
      </div>
    )
  }
}

/*
  'displayName' should definitely be set - this will help tell you which component is being
  debugged when in dev mode, ie: "Blog {...error...}" instead of just "A Component {...error...}"
*/
Blog.displayName = 'Blog'


/*
  'propTypes' should also definitely be set - this will help tell you what data is being worked with on the Component
    - Notice that only the data we are working with needs to be type-checked.
*/
Blog.propTypes = {
  children: PropTypes.element.isRequired,
  redux: PropTypes.shape({
    blog: PropTypes.shape({
      articles: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })
        ).isRequired
    })
  })
}

Blog.onEnter = ({ dispatch }) => dispatch(fetchArticles())

export default Blog

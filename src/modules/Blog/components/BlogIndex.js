// @flow
import React, { Component } from 'react'
import Helmet from 'react-helmet'

class BlogIndex extends Component {
  render(){
    return(
      <div>
        {/* will only show on the blog index page */}
        <Helmet>
          <title>Blog List</title>
          <body className="bodywrapper-blog bodywrapper-blog-index" />
        </Helmet>

        <h1>Blog</h1>
      </div>
    )
  }
}

/*
  'displayName' should definitely be set - this will help tell you which component is being
  debugged when in dev mode, ie: "Blog {...error...}" instead of just "A Component {...error...}"
*/
BlogIndex.displayName = 'BlogIndex'

export default BlogIndex

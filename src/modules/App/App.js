// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

/*
  Import all the Actions from a Component's "redux" file.
  All exports should be actions(or action creators) only.
*/
import * as blogActions from '../Blog/redux'

import Header from './components/Header'

export const mapStateToProps = state => {
    return {
        redux: {
            blog: {
                articles: state.blog.articles,
                article: state.blog.article,
                // yourSliceOfState: state.blog.yourSliceOfState
            }
        }
    }
}

const mapDispatchToProps = dispatch => {
    return { actions : {...bindActionCreators({...blogActions}, dispatch) } }
}

class App extends Component {

  static displayName = 'App';

  static propTypes = {
    children: PropTypes.element.isRequired,
    actions: PropTypes.object.isRequired,
    redux: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss')

    const { children, redux, actions } = this.props

    return (
      <div className={ styles.container }>

        <Helmet
          defaultTitle="YOUR SITE NAME" // if no nested elements are inheriting the `titleTempalte`
          titleTemplate="%s | YOUR SITE NAME" // nested elements inherit this template.
          >
          <meta name="description" content="This will show up on SERPs" />
          <body className="bodywrapper-app" />
        </Helmet>

        <Header />
        {React.cloneElement(children, {redux: redux, actions: actions})}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)





/*------------------------------------------------*/





{/*

        React-Helment Examples/Reference:

        <Helmet
          encodeSpecialCharacters={true}
          titleTemplate="MySite.com - %s"
          // fallback if not template is inheriting title
          defaultTitle="My Default Title"
          // `newState` returns an object with all the new Helmet attributes in the Component
          onChangeClientState={(newState) => {console.log(newState) }}
          >
          <html lang="en" amp />
          <body className="bodywrapper-blog" />

          <title itemProp="name" lang="en">My Title</title>

          <base target="_self" href="//localhost:3000/" />

          <meta name="description" content="Helmet application" />
          <meta property="og:type" content="article" />

          <link rel="canonical" href="https://localhost:3000/" />
          <link rel="apple-touch-icon" href="http://localhost:3000/img/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="http://localhost:3000/img/apple-touch-icon-72x72.png" />

          <link href="https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.css" rel="stylesheet" />
          <script src="https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js" type="text/javascript" />

          <script type="application/ld+json">{`
              {
                  "@context": "http://schema.org"
              }
          `}</script>
          <noscript>{`
              <link rel="stylesheet" type="text/css" href="foo.css" />
          `}</noscript>
          <style type="text/css">{`
              body {
                  background-color: blue;
              }
          `}</style>
        </Helmet>
*/}
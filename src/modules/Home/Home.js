// @flow
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'


class Home extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    // can access actions. Here.
    // be CAREFUL making async requests in components here. Async should be completed in the Container Component.
    // this.props.actions.fetchArticles()
  }

  render(){
    return (
      <main>
        <Helmet title="Home" />
        <h1>Home</h1>
      </main>
      )
  }
}
  Home.displayName = 'Home'

  /*
    if asynchronously grabbing data on "onEnter", the actionCreator action needs to be imported, "this" is not accessible.
    EXAMPLE:
    import { fetchArticles } from './../Blog/redux'
    Home.onEnter = ({dispatch}) => dispatch(fetchArticles())
  */

  export default Home

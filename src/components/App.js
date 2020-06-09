/*
Top level application component
*/

import React, { Component } from "react"
import Search from "./Search"
import SearchNav from "./SearchNav"
import NotFound from "./NotFound"

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <Search />
        <SearchNav />
        <NotFound />
      </div>
    )
  }
}

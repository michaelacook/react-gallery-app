/*
Top level application component
Flickr API docs <https://www.flickr.com/services/api/>
<https://www.flickr.com/services/api/flickr.photos.search.html>
tut: <https://www.w3resource.com/API/flickr/tutorial.php>
*/

import React, { Component } from "react"
import Search from "./Search"
import SearchNav from "./SearchNav"
import NotFound from "./NotFound"
import apiKey from "../config.js"
import axios from "axios"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos = null,
      loading: true
    }
  }

  /**
   * Seach for photos matching a search term or set of search terms
   */
  search = (query = "animals") => {
    const baseURL = "https://www.flickr.com/services/rest/"
    const method = "flickr.photos.search"
    axios
      .get(
        `${baseURL}?method=${method}&text=${query}&api_key=${apiKey}&format=json`
      )
      .then((res) => {
        console.log(res)
        this.setState({ loading: false })
      })
      .catch((err) => console.log("Something went wrong."))
  }

  componentDidMount() {
    this.search()
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

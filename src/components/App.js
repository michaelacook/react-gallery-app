/*
Top level application component
Flickr API docs <https://www.flickr.com/services/api/>
<https://www.flickr.com/services/api/flickr.photos.search.html>
tut: <https://www.w3resource.com/API/flickr/tutorial.php>
*/

import React, { Component } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import axios from "axios"
import Search from "./Search"
import SearchNav from "./SearchNav"
import PhotoList from "./PhotoList"
import NotFound from "./NotFound"
import Pagination from "./Pagination"
import apiKey from "../config.js"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      photos: [],
      pages: null,
    }
    this.baseURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&nojsoncallback=1&format=json&per_page=24&api_key=${apiKey}`
  }

  /**
   * Seach for photos matching a search term or set of search terms
   * @param {String} query - search term
   * @param {Number} page - results page. Defaults to page 1
   */
  search = (query, page = 1) => {
    const url = `${this.baseURL}&tags=${query}&page=${page}`
    this.setState({ loading: true }, () => {
      axios
        .get(url)
        .then(({ data: { photos } }) => {
          this.setState({
            loading: false,
            photos: photos.photo.map((image) => {
              return {
                src: `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`,
                id: image.id,
              }
            }),
            pages: photos.pages,
          })
        })
        .catch((err) => console.log(err.message))
    })
  }

  /**
   * Return a random keyword
   * Used to generate the home page images
   * Each time the user navigates to the home path,
   * a random keyword will be used in the redirect
   * In the future this will not be hardcoded but
   * will pull in trending photos
   */
  initialQuery = () => {
    return [
      "animals",
      "plants",
      "beautiful",
      "historic",
      "trees",
      "scenic",
      "birds",
    ][Math.floor(Math.random() * 7)]
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route
            path="/"
            render={(props) => <Search history={props.history} />}
          />
          <SearchNav />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Redirect to={`/search/${this.initialQuery()}/1`} />
              )}
            />
            <Route
              exact
              path="/search/:query/:page"
              render={({ match }) => (
                <PhotoList
                  // query={this.state.query}
                  match={match}
                  search={this.search}
                  images={this.state.photos}
                  loading={this.state.loading}
                  pages={this.state.pages}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

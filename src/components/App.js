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
import apiKey from "../config.js"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      photos: [],
    }
  }

  /**
   * Seach for photos matching a search term or set of search terms
   */
  search = (query, page = 1) => {
    const baseURL = "https://www.flickr.com/services/rest/"
    const method = "flickr.photos.search"
    const url = `${baseURL}?method=${method}&tags=${query}&api_key=${apiKey}&per_page=24&nojsoncallback=1&format=json&page=${page}`
    this.setState({ loading: true }, () => {
      axios
        .get(url)
        .then(
          ({
            data: {
              photos: { photo },
            },
          }) => {
            console.log(url)
            this.setState({
              loading: false,
              photos: photo.map(
                (image) =>
                  `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`
              ),
            })
          }
        )
        .catch((err) => console.log(err.message))
    })
  }

  componentDidMount() {
    this.search("monkeys")
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route
            path="/"
            render={(props) => (
              <Search onSearch={this.search} history={props.history} />
            )}
          />
          <SearchNav />
          <Switch>
            <Redirect exact to="/search" from="/" />
            <Route
              path="/search"
              render={() => (
                <PhotoList
                  images={this.state.photos}
                  loading={this.state.loading}
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

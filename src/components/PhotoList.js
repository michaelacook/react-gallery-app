import React, { Component } from "react"
import Photo from "./Photo"

export default class PhotoList extends Component {
  state = {
    query: null,
  }

  /**
   * Set component query state to the query parameter in match
   * Execute the search callback passed from App passing it the query value
   */
  updateQuery = () => {
    this.setState({ query: this.props.match.params.query }, () => {
      this.props.search(this.state.query)
    })
  }

  /**
   * When the component mounts after redirect, call updateQuery
   * App will then get photos and pass them down via props
   */
  componentDidMount() {
    this.updateQuery()
  }

  /**
   * If the query parameter changes, call updateQuery
   * This is needed because otherwise, updateQuery will keep
   * using the previous query parameter and the photos won't
   * change with the URL
   */
  componentDidUpdate() {
    if (this.props.match.params.query !== this.state.query) {
      this.updateQuery()
    }
  }

  render() {
    const photos = this.props.images.map((image) => {
      return (
        <li key={image.id}>
          <Photo src={image.src} alt="Photo pulled from the Flickr API" />
        </li>
      )
    })
    return (
      <div className="photo-container">
        {this.props.loading ? <h3>Loading...</h3> : <ul>{photos}</ul>}
      </div>
    )
  }
}

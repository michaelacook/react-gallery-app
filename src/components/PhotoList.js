import React, { Component } from "react"
import Photo from "./Photo"
import Pagination from "./Pagination"

export default class PhotoList extends Component {
  state = {
    query: null,
    page: null,
  }

  /**
   * Set component query state to the query parameter in match
   * Execute the search callback passed from App passing it the query value
   */
  updateQuery = () => {
    this.setState({ query: this.props.match.params.query }, () => {
      this.props.search(this.state.query, this.state.page)
    })
  }

  /**
   * Update the page for pagination purposes
   * After page is updated, update query
   * Done in this order so that when search is called, it is
   * always passing the current page
   */
  updatePage = () => {
    this.setState({ page: this.props.match.params.page }, () => {
      this.updateQuery()
    })
  }

  /**
   * When the component mounts after redirect, call updatePage
   * Update page will first update the current page, then
   * update the query, then call search with both query and page
   * App photos state will the be updated and pass the photos down
   * via props
   */
  componentDidMount() {
    this.updatePage()
  }

  /**
   * If the query or page parameters change, call updatePage
   * This is needed because otherwise, updateQuery will keep
   * using the previous query and page parameters and the photos won't
   * change with the URL
   */
  componentDidUpdate() {
    if (
      this.props.match.params.query !== this.state.query ||
      this.props.match.params.page !== this.state.page
    ) {
      this.updatePage()
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
        <Pagination pages={this.props.pages} match={this.props.match} />
      </div>
    )
  }
}

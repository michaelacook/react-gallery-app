import React from "react"
import { NavLink } from "react-router-dom"

/*
It would be nice to display a pagination link for every page the API 
returns, but this isn't feasible since most searches return thousands of pages.
I tried to find a way to limit the number of pages the API returns, but there 
doesn't appear to be such an option. I therefore chose 25 pages as the maximum
to display, because more than 25 pagination NavLinks does not display well on 
the page
*/

const Pagination = (props) => {
  const { pages, match } = props
  let max
  if (pages < 2) {
    return null
  } else if (pages < 25) {
    max = pages
  } else if (pages >= 25) {
    max = 25
  }
  const arr = []
  for (let i = 1; i <= max; i++) {
    arr.push(
      <NavLink
        activeStyle={{ background: "#275270" }}
        className="pagination-button"
        key={i}
        to={`/search/${match.params.query}/${i}`}
      >
        {i}
      </NavLink>
    )
  }
  return <nav className="pagination-nav">{arr}</nav>
}

export default Pagination

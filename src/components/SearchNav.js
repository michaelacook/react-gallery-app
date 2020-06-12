import React from "react"
import { NavLink } from "react-router-dom"

const SearchNav = (props) => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/search/cats">
            Cats
          </NavLink>
        </li>
        <li>
          <NavLink to="/search/mountains">
            Mountains
          </NavLink>
        </li>
        <li>
          <NavLink to="/search/cities">
            Cities
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default SearchNav

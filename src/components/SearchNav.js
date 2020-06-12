import React from "react"
import { NavLink } from "react-router-dom"

const SearchNav = (props) => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/search/flowers/1">Flowers</NavLink>
        </li>
        <li>
          <NavLink to="/search/mountains/1">Mountains</NavLink>
        </li>
        <li>
          <NavLink to="/search/cities/1">Cities</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default SearchNav

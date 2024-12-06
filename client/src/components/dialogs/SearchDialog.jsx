import React, { lazy } from 'react'

const Search = lazy(() => import("../specific/Search"))
function SearchDialog() {
  return (
    <div><Search/></div>
  )
}

export default SearchDialog
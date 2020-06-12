import React from "react"
import Photo from "./Photo"

const PhotoList = ({ images, loading }) => {
  const photos = images.map((image) => {
    return (
      <li>
        <Photo src={image} alt="Photo pulled from the Flickr API" />
      </li>
    )
  })

  return (
    <div className="photo-container">
      {/* <h2>Results:</h2> */}
      {loading ? <h3>Loading...</h3> : <ul>{photos}</ul>}
    </div>
  )
}

export default PhotoList

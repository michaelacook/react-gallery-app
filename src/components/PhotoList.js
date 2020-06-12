import React from "react"
import Photo from "./Photo"
import { useParams } from 'react-router-dom'

const PhotoList = ({ images, search, loading }) => {

  const { query } = useParams()

  search(query);

  const photos = images.map((image) => {
    return (
      <li key={image.id}>
        <Photo src={image.src} alt="Photo pulled from the Flickr API" />
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

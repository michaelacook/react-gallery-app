import React from "react"
import Photo from "./Photo"

const PhotoList = (props) => {
  const photos = props.photos.map((photo) => {
    return <Photo src={photo.src} alt="" />
  })

  return (
    <div className="photo-container">
      <ul>{photos}</ul>
    </div>
  )
}

export default PhotoList

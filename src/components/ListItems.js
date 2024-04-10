import React from 'react'
import { Link } from 'react-router-dom'

let getTime  = (note) =>{
  return new Date(note.updated).toLocaleDateString()
}

let getTitle = (note) =>{
  let title = note.body.split('\n')[0]
  if (title.length > 45) {
    return title.slice(0, 45)
  }
  return title
}

let getContent= (note) =>{
  let content1 = note.body.split('\n').slice(1).join('\n') // Exclude the first line (title)
  // let content = note.body.replaceAll('\n', '')

  if (content1.length > 45) {
    return content1.slice(0, 45) + '...'
  } else {
    return content1
  }
}

const ListItems = ({note}) => {
  return (
    <Link to={`/note/${note.id}`}>
        <div className="notes-list-item">
          <h3>{getTitle(note)}</h3>
          <p><span>{getTime(note)}</span>{getContent(note)}</p>
        </div>
    </Link>
  )
}

export default ListItems
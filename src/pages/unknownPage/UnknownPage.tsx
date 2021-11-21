import React from 'react'
import { Link } from 'react-router-dom'
import "./unknownPage.css"

/**
 * Simple page for 404 errors
 */
export default function UnknownPage() {
  return (
    <div className="unknown-page">
      <p>The page you are looking for was not found.</p>
      <p>You can <Link to="/create">create a new session</Link> or <Link to="/join">join an existing session</Link>.</p>
    </div>
  )
}

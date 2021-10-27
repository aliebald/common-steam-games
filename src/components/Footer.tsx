import React from 'react'
import "../styles/footer.css"
import packageJSON from "../../package.json"

export default function Footer() {
  return (
    <div className="footer">
      <div className="f-left">
        This project is not affiliated with Valve or Steam
      </div>
      <a
        className="f-right"
        href="https://github.com/aliebald/common-steam-games"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub Repository"
      >
        <img src={`${packageJSON.subUrl}/github.png`} alt="github" height="20px" width="20px" />
      </a>
    </div>
  )
}

import React from "react";
import { Link } from "react-router-dom";
import toMail from "../../security/mail";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="f-left">This project is not affiliated with Valve or Steam</div>
      <div className="f-right">
        <Link to="/about" className="footer-link">
          About
        </Link>
        <a
          className="footer-link"
          href="https://impressum.liebald.dev"
          target="_blank"
          rel="noopener noreferrer"
          title="Impressum gemäß § 5 TMG"
        >
          Impressum
        </a>
        <div title="Send me a mail" onClick={() => toMail("𝕔𝕠𝕟𝕥𝕒𝕔𝕥@𝕝𝕚𝕖𝕓𝕒𝕝𝕕.𝕕𝕖𝕧")}>
          <img src="/email.svg" alt="contact" height="20px" width="20px" className="contact" />
        </div>
        <a
          href="https://github.com/aliebald/common-steam-games"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Repository"
        >
          <img src="/github.svg" alt="github" height="18px" width="18px" className="github" />
        </a>
      </div>
    </div>
  );
}

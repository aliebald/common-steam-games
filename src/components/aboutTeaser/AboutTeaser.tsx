import React from "react";
import { Link } from "react-router-dom";
import Collapsible from "../collapsible/Collapsible";
import "./aboutTeaser.css";

export default function AboutTeaser() {
  return (
    <div className="about-teaser">
      <Collapsible btnClassName="about-teaser-header" header={<h2>About</h2>}>
        <div className="about-teaser-content">
          <h3>What Is Common Steam Games?</h3>
          <p>
            Common Steam Games is a web application that enables groups of users to discover common games regarding
            their steam accounts and vote on games to find common preferences.
          </p>
          <p>
            <Link to="about">Read more</Link>
          </p>
        </div>
      </Collapsible>
    </div>
  );
}

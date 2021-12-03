import React from "react"
import { Link, useHistory } from "react-router-dom"
import Button from "../../components/button/Button"
import Container from "../../components/container/Container";
import "./about.css"

export default function About() {
  const history = useHistory();

  return (
    <Container className="about">
      <Link to="/create" className="title">
        <h1>About Common Steam Games</h1>
      </Link>
      <h2>What Is Common Steam Games?</h2>
      <p>
        Common Steam Games is a web application that enables groups of users
        to discover common games regarding their steam accounts and vote on
        games to find common preferences.
      </p>
      <h2>Use Case</h2>
      <p>
        Ever played with a group of friends and could not decide on what to
        play? Then Common Steam Games is for you!
      </p>
      <p>
        Create a session, invite your friends and instantly see your common
        games. Sort your preferences using easy to use drag n drop and see
        the group preferences adopt.
        Find old classics or games you did not know all of you had in common.
      </p>
      <h2>Requirements</h2>
      <p>
        To allow Common Steam Games to access your steam games, your steam
        profile and game details must be set to public.
        <br />
        Optionally: set friends list public to access it in this app.
      </p>
      <p>
        If any of the above settings are not correct, you will receive an
        error. You can change your settings under: <em>your profile</em> &gt;
        edit profile &gt; privacy settings.
      </p>
      <h2>
        Features
      </h2>
      <ul>
        <li>Live sessions with your peers</li>
        <li>Preference matching</li>
        <li>Games search &amp; drag n drop</li>
        <li>Steam games &amp; friendslist integration</li>
        <li>Custom games for your favorite common, non-steam games</li>
        <li><em>...</em></li>
      </ul>
      <h2>Contact</h2>
      <p>
        For suggestions, bug reports or other project related topics, feel
        free to create an issue on{" "}
        <a href="https://github.com/aliebald/common-steam-games">GitHub</a>.
        <br />
        Otherwise, for general feedback or other inquiries, please contact me
        via mail: contact.liebald (at) gmail.com.
      </p>
      <div className="about-nav">
        <Button onClick={history.goBack}>
          Go&nbsp;Back
        </Button>
        <Button onClick={() => history.push("create")}>
          Create&nbsp;new&nbsp;Session
        </Button>
        <Button onClick={() => history.push("join")}>
          Join&nbsp;Session
        </Button>
      </div>
    </Container>
  )
}

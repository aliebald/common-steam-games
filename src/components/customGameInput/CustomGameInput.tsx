import React, { useEffect, useState } from "react"
import Button from "../button/Button";
import Container from "../container/Container";
import Game from "../game/Game";
import Modal from "../modal/Modal"
import "./customGameInput.css"


export default function CustomGameInput(props: {
  visible: boolean,
  close: () => void,
  addGame: (game: Game) => void,
  addError: (error: ErrorType) => void
}) {
  const [game, setGame] = useState<Game>({
    appid: 0,
    name: "",
    img_icon_url: "",
    playtime_forever: 0,
    isCustom: true
  });

  /* confirm if enter is pressed */
  useEffect(() => {
    const listener = (event: any) => {
      if (props.visible && (event.code === "Enter" || event.code === "NumpadEnter")) {
        event.preventDefault();
        confirm();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleModal = (visible: boolean) => {
    if (!visible) {
      props.close();
    }
  }

  const confirm = () => {
    if (game.name.length === 0) {
      props.addError({
        status: 400,
        msg: "Please enter a name for the custom game.",
        timeout: 3000
      })
      return;
    }
    props.addGame(game);
    props.close();
  }

  const handleNameChange = (event: any) => {
    event.preventDefault();
    const newGame = { ...game };
    newGame.name = event.target.value.trim();
    setGame(newGame);
  }

  return (
    <Modal visible={props.visible} setVisible={handleModal}>
      <Container className="custom-game-input">
        <h3 className="title">Add Custom Game</h3>
        <p className="description">
          Custom games are added to all users in this session.
          This can be used to add non-Steam games, e.g. games from different platforms,
          browser games, or other activities.
        </p>
        <label htmlFor="customGameName">Name: &nbsp; </label>
        <input type="text"
          id="customGameName"
          onChange={handleNameChange}
          defaultValue={game.name}
          placeholder="Name for Custom Game"
          required
        />
        <h3 className="preview">Preview</h3>
        <Game game={game} />
        <div className="buttons">
          <Button danger onClick={props.close}>
            Abort
          </Button>
          <Button onClick={confirm}>
            Add&nbsp; Game
          </Button>
        </div>
      </Container>

    </Modal>
  )
}

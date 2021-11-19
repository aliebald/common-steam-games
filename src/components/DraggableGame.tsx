import React, { memo } from "react"
import { Draggable } from "react-beautiful-dnd"
import Game from "./Game"

type DraggableGameProps = {
  game: Game,
  index: number,
  hide?: boolean,
  DnDHighlight?: boolean
}

function DraggableGame(props: DraggableGameProps) {
  return (
    <Draggable draggableId={`${props.game.appid}`} index={props.index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.hide ? <></> :
            <Game
              game={props.game}
              isDnD
              DnDHighlight={props.DnDHighlight}
            />
          }
        </div>
      )}
    </Draggable>

  )
}

function areEqual(prevProps: DraggableGameProps, nextProps: DraggableGameProps) {
  return (prevProps.game.appid === nextProps.game.appid
    && prevProps.index === nextProps.index
    && prevProps.hide === nextProps.hide
    && prevProps.DnDHighlight === nextProps.DnDHighlight
  );
}

export default memo(DraggableGame, areEqual);

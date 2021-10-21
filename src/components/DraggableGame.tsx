import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Game from './Game'


export default function DraggableGame(props: { game: Game, index: number }) {
  return (
    <Draggable draggableId={`${props.game.appid}`} index={props.index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Game game={props.game} />
        </div>
      )}
    </Draggable>

  )
}

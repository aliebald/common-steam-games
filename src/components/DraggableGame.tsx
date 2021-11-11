import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Game from './Game'


export default function DraggableGame(props: { game: Game, index: number, className?: string }) {
  return (
    <Draggable draggableId={`${props.game.appid}`} index={props.index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={props.className}
        >
          <Game game={props.game} isDnD />
        </div>
      )}
    </Draggable>

  )
}

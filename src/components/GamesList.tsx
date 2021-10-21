import React from 'react'
import { DragDropContext, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import DraggableGame from './DraggableGame';
import Game from './Game';

export default function GamesList(props: {
  games: Game[] | MatchedGame[],
  droppableId?: string, // If this is given, the output list will be a drag & drop list
  onDragEnd?: (result: DropResult, provided: ResponderProvided) => void,
  header?: JSX.Element,
  className?: string
}) {
  const header = props.header ?? "";
  if (props.droppableId && props.onDragEnd) {
    return (
      <div className={`games-list ${props.className ?? ""}`}>
        <DragDropContext onDragEnd={props.onDragEnd}>
          {header}
          <div className="scroll-container">
            <Droppable droppableId={props.droppableId}>
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <InnerList games={props.games} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    )
  }
  return (
    <div className={`games-list ${props.className ?? ""}`}>
      {header}
      <div className="scroll-container">
        {props.games.map((game, index) => <Game game={game} key={index} />)}
      </div>
    </div>
  )
}

// do not re-render if the games list reference has not changed
const InnerList = React.memo(function InnerList(props: { games: Game[] }) {
  const list = props.games.map((game: Game, index: number) => (
    <DraggableGame key={game.appid} game={game} index={index} />
  ))
  return <>{list}</>
});

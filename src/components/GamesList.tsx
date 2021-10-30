import React from 'react'
import { DragDropContext, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import DraggableGame from './DraggableGame';
import Game from './Game';

export default function GamesList(props: {
  games: Game[] | MatchedGame[],
  onlyCommonGames?: boolean,
  commonAppIds: number[],
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
                  <InnerList
                    games={props.games}
                    onlyCommonGames={props.onlyCommonGames ?? false}
                    commonAppIds={props.commonAppIds}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    )
  }

  const games = props.onlyCommonGames ? props.games.filter(game => props.commonAppIds.includes(game.appid)) : props.games;
  return (
    <div className={`games-list ${props.className ?? ""}`}>
      {header}
      <div className="scroll-container">
        {games.map((game, index) => <Game game={game} key={index} />)}
      </div>
    </div>
  )
}

// do not re-render if the games list reference has not changed
const InnerList = React.memo(function InnerList(props: { games: Game[], commonAppIds: number[], onlyCommonGames: boolean }) {
  // const games = props.onlyCommonGames ? props.games.filter(game => game.ownedByAll) : props.games;
  const list = props.games.map((game: Game, index: number) => {
    if (!props.onlyCommonGames || props.commonAppIds.includes(game.appid)) {
      return <DraggableGame key={game.appid} game={game} index={index} />
    } else {
      return <DraggableGame key={game.appid} game={game} index={index} className="d-none" />
    }
  })
  return <>{list}</>
});

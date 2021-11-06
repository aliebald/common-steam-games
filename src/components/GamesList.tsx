import { DragDropContext, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import React, { createRef, RefObject, useEffect } from "react"
import { compareTwoStrings } from "string-similarity";
import DraggableGame from "./DraggableGame";
import Game from "./Game";


export default function GamesList(props: {
  games: Game[] | MatchedGame[],
  onlyCommonGames?: boolean,
  commonAppIds: number[],
  droppableId?: string, // If this is given, the output list will be a drag & drop list
  onDragEnd?: (result: DropResult, provided: ResponderProvided) => void,
  header?: JSX.Element,
  gameSearch?: string,
  className?: string
}) {
  const header = props.header ?? "";
  const dndListRef: RefObject<HTMLDivElement> = createRef();
  const onlyCommonGames = props.onlyCommonGames ?? false;

  useEffect(() => {
    /** Finds the index of the game in games with the highest similarity with a search query */
    const searchGamePosition = (search: string): number => {
      // Keeps the name for debugging purposes.
      const similarities = props.games.map(game => ({
        name: game.name,
        similarity: compareTwoStrings(game.name, search)
      }));
      let largest = 0;
      let indexOfLargest = 0;
      similarities.forEach((entry, index) => {
        if (entry.similarity > largest) {
          largest = entry.similarity;
          indexOfLargest = index;
        }
      });
      console.log(`Best match for game search ("${search}"): ${similarities[indexOfLargest].name}. Similarity: ${largest}`);
      return indexOfLargest;
    }

    if (props.gameSearch && props.gameSearch.length > 1 && dndListRef.current) {
      console.log("scrolling");
      const pos = searchGamePosition(props.gameSearch) * 60;
      dndListRef.current.scrollTo({ top: pos, behavior: "smooth" });
    }
  }, [dndListRef, props.games, props.gameSearch])

  // Return games as drag & drop list
  if (props.droppableId && props.onDragEnd) {
    return (
      <div className={`games-list ${props.className ?? ""}`}>
        <DragDropContext onDragEnd={props.onDragEnd}>
          {header}
          <div className="scroll-container" ref={dndListRef}>
            <Droppable droppableId={props.droppableId}>
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <InnerList
                    games={props.games}
                    onlyCommonGames={onlyCommonGames}
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

  // Return games as static list if droppableId or onDragEnd is not defined in props
  const games = onlyCommonGames ? props.games.filter(game => props.commonAppIds.includes(game.appid)) : props.games;
  return (
    <div className={`games-list ${props.className ?? ""}`}>
      {header}
      <div className="scroll-container">
        {games.map((game, index) => <Game game={game} key={index} showOwners={!onlyCommonGames} />)}
      </div>
    </div>
  )
}

// do not re-render if the games list reference has not changed
const InnerList = React.memo(function InnerList(props: { games: Game[], commonAppIds: number[], onlyCommonGames: boolean }) {
  const list = props.games.map((game: Game, index: number) => {
    if (!props.onlyCommonGames || props.commonAppIds.includes(game.appid)) {
      return <DraggableGame key={game.appid} game={game} index={index} />
    } else {
      return <DraggableGame key={game.appid} game={game} index={index} className="d-none" />
    }
  })
  return <>{list}</>
});

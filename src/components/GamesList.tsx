import { DragDropContext, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import React, { createRef, RefObject, useEffect, useState } from "react"
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
      let match = {
        similarity: 0,
        index: 0,
        name: ""
      };
      props.games.forEach((game, index) => {
        if (!props.onlyCommonGames || props.commonAppIds.includes(game.appid)) {
          const similarity = compareTwoStrings(game.name.toLowerCase(), search.toLowerCase());
          if (similarity > match.similarity) {
            match = {
              similarity: similarity,
              index: index,
              name: game.name
            }
          }
        }
      });
      console.log(`Best match for game search ("${search}"): ${match.name}. Similarity: ${match.similarity}`);
      return match.index;
    }

    /** Finds the depth in px of the game with the given index. Used for scrollTo() */
    const getDepthForGame = (index: number) => {
      if (!dndListRef.current) {
        return 0;
      }
      let depth = 0;
      for (let i = 0; i < index; i++) {
        depth += dndListRef.current.children[0].children[i].scrollHeight;
      }
      return depth;
    }

    if (props.gameSearch && props.gameSearch.length > 1 && dndListRef.current) {
      const index = searchGamePosition(props.gameSearch);
      const pos = getDepthForGame(index);
      dndListRef.current.scrollTo({ top: pos, behavior: "smooth" });
    }
  }, [dndListRef, props.games, props.gameSearch, props.commonAppIds, props.onlyCommonGames])

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
  const [highlightDnd, setHighlightDnd] = useState(false);

  // Increases brightness of dnd icon for a few seconds after first render
  useEffect(() => {
    const timeoutStart = setTimeout(() => {
      setHighlightDnd(true);
    }, 1000);

    const timeoutEnd = setTimeout(() => {
      setHighlightDnd(false);
    }, 6000);

    return () => {
      clearTimeout(timeoutStart);
      clearTimeout(timeoutEnd);
    }
  }, []);

  const list = props.games.map((game: Game, index: number) => {
    if (!props.onlyCommonGames || props.commonAppIds.includes(game.appid)) {
      return <DraggableGame key={game.appid} game={game} index={index} DnDHighlight={highlightDnd} />
    } else {
      return <DraggableGame key={game.appid} game={game} index={index} className="d-none" DnDHighlight={highlightDnd} />
    }
  })
  return <>{list}</>
});

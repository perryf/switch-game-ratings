import { useEffect, useState } from 'react'
import { Masonry } from 'masonic'
// import { SwitchGameEditType } from '../../interfaces'
import { useWindowSize } from '../../hooks/windowSize'
import SwitchGame from '../switchGame/SwitchGame'
import './switch-game-list.css'

const getColumnCount = (windowSize = { width: 0, height: 0 }) => {
  if (windowSize.width > 1400) return 3
  if (windowSize.width > 992) return 2
  return 1
}

interface SwitchGameListProps {
  games: any
}

function SwitchGameList(props: SwitchGameListProps) {
  const { games } = props
  const size = useWindowSize()
  const [gameTiles, setGameTiles] = useState(games)

  useEffect(() => {
    setGameTiles(games)
  }, [games.length, size])

  return (
    <div className="switch-game-list">
      <Masonry
        key={games.length}
        items={gameTiles}
        render={SwitchGame}
        columnGutter={4}
        rowGutter={4}
        maxColumnCount={getColumnCount(size)}
        overscanBy={20}
        itemHeightEstimate={350}
      />

      {
        // games.map((game: SwitchGameEditType) => (
        //   <li key={game.id} className="switch-game-list-item">
        //     <SwitchGame game={game} />
        //     {/* <button onClick={() => deleteGame(game.id)}>X</button> */}
        //   </li>
        // ))
      }
    </div>
  )
}

export default SwitchGameList

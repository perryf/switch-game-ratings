import { Masonry } from 'masonic'
// import { SwitchGameType } from '../../interfaces'
import { useWindowSize } from '../../hooks/windowSize'
import SwitchGame from '../switchGame/SwitchGame'
import './switch-game-list.css'

const getColumnCount = (windowSize = { width: 0, height: 0 }) => {
  if (windowSize.width > 1400) return 3
  if (windowSize.width > 992) return 2
  return 1
}

interface SwitchGameListProps {
  deleteGame: (a: string) => void
  games: any
}

function SwitchGameList(props: SwitchGameListProps) {
  const {
    // deleteGame,
    games,
    // startEdit,
  } = props

  const size = useWindowSize()

  return (
    <div className="switch-game-list">
      <Masonry
        items={games}
        render={SwitchGame}
        columnGutter={4}
        rowGutter={4}
        maxColumnCount={getColumnCount(size)}
        overscanBy={5}
        itemHeightEstimate={350}
      />

      {
        // games.map((game: SwitchGameType) => (
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

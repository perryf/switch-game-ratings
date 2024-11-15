import { Masonry } from 'masonic'
// import { SwitchGameType } from '../../interfaces'
import SwitchGame from '../switchGame/SwitchGame'
import './switch-game-list.css'

interface SwitchGameListProps {
  deleteGame: (a: string) => void
  games: any
}

function SwitchGameList(props: SwitchGameListProps) {
  const {
    // deleteGame,
    games
  } = props

  return (
    <ul className="switch-game-list">
      <Masonry
        items={games}
        render={SwitchGame}
        // Adds 8px of space between the grid cells
        columnGutter={6}
        // Sets the minimum column width to 172px
        // columnWidth={400}
        columnCount={2}
        // Pre-renders 5 windows worth of content
        // overscanBy={5}
      />

      {
        // games.map((game: SwitchGameType) => (
        //   <li key={game.id} className="switch-game-list-item">
        //     <SwitchGame game={game} />
        //     {/* <button onClick={() => deleteGame(game.id)}>X</button> */}
        //   </li>
        // ))
      }
    </ul>
  )
}

export default SwitchGameList

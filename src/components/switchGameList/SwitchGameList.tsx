import { SwitchGameType } from '../../interfaces'
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
      {games.map((game: SwitchGameType) => (
        <li key={game.id} className="switch-game-list-item">
          <SwitchGame game={game} />
          {/* <button onClick={() => deleteGame(game.id)}>X</button> */}
        </li>
      ))}
    </ul>
  )
}

export default SwitchGameList

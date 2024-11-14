import { SwitchGameType } from '../../interfaces'
import SwitchGame from '../switchGame/SwitchGame'
import './switch-game-list.css'

interface SwitchGameListProps {
  deleteGame: (a: string) => void
  games: any
}

function SwitchGameList(props: SwitchGameListProps) {
  const { deleteGame, games } = props

  return (
    <ul>
      {games.map((game: SwitchGameType) => (
        <li className="game-box" key={game.id}>
          <SwitchGame game={game} />
          {/* <button onClick={() => deleteGame(game.id)}>X</button> */}
        </li>
      ))}
    </ul>
  )
}

export default SwitchGameList

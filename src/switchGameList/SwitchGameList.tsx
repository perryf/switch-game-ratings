import { SwitchGameType } from '../interfaces'
import './switch-game-list.css'

interface SwitchGameListProps {
  deleteGame: (a: string) => void
  games: any
}

function SwitchGameList(props: SwitchGameListProps) {
  const { deleteGame, games } = props
  console.log(games)

  return (
    <ul>
      {games.map((game: SwitchGameType) => (
        <li className="game-box" key={game.id}>
          <p>{game.name}</p>
          <button onClick={() => deleteGame(game.id)}>X</button>
        </li>
      ))}
    </ul>
  )
}

export default SwitchGameList

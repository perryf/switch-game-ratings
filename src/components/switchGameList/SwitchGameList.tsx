import { SwitchGameEditType } from '../../interfaces'
import SwitchGame from '../switchGame/SwitchGame'
import './switch-game-list.css'

interface SwitchGameListProps {
  games: SwitchGameEditType[]
}

function SwitchGameList(props: SwitchGameListProps) {
  const { games } = props

  return (
    <div className="switch-game-list">
      {games.map((game: SwitchGameEditType) => (
        <SwitchGame game={game} key={game.id} />
      ))}
    </div>
  )
}

export default SwitchGameList

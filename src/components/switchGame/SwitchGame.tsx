import { SwitchGameType } from '../../interfaces'
import './switch-game.css'

interface SwitchGameProps {
  game: SwitchGameType
}

function SwitchGame(props: SwitchGameProps) {
  const { game } = props

  return (
    <div>
      <p>{game.title}</p>
    </div>
  )
}

export default SwitchGame

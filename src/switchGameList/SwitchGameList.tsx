import './switch-game-list.css'

interface SwitchGameListProps {
  deleteGame: (a: string) => void
  games: any
}

interface SwitchGame {
  content: string
  datePlayed: Date
  developedBy: string
  genre: string[]
  id: string
  imagePath: string
  imagePathSmall: string
  name: string
  publishedBy: string
  releaseDate: string
  rating: number // 1 -5
  remake: boolean
}

function SwitchGameList(props: SwitchGameListProps) {
  const { deleteGame, games } = props

  return (
    <ul>
      {games.map((game: SwitchGame) => (
        <li className="game-box" key={game.id}>
          <p>{game.name}</p>
          <button onClick={() => deleteGame(game.id)}>X</button>
        </li>
      ))}
    </ul>
  )
}

export default SwitchGameList

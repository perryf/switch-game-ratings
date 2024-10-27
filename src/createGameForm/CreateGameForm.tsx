import { useState } from 'react'
import { SwitchGameTypeNew } from '../interfaces'
import './create-game-form.css'

const newGameInit: SwitchGameTypeNew = {
  datePlayed: '',
  developedBy: '',
  genre: [],
  imagePath: '',
  imagePathSmall: '',
  multiplayer: false,
  multiplayerType: [],
  multiplayerNumberOfPlayers: 1,
  mood: '', // turn into an array on submit
  name: '',
  onlineFeatures: false,
  onlineMultiplayer: false,
  price: 0,
  publishedBy: '',
  releaseDate: '',
  rating: 1,
  remake: false,
  review: '',
  tags: ''
}

const switchGenreList = [
  { name: 'Action', value: 'action' },
  { name: 'Adventure', value: 'adventure' },
  { name: 'Fighting', value: 'fighting' }, // TODO -> Better name for this?
  { name: 'Puzzle', value: 'puzzle' },
  { name: 'Racing', value: 'racing' },
  { name: 'First Person Shooter', value: 'fps' },
  { name: 'RPG', value: 'rpg' },
  { name: 'Simulation', value: 'simulation' },
  { name: 'Tactics', value: 'tactics' }
]

interface CreateGameFormProps {
  createGame: (a: SwitchGameTypeNew) => void
}

function CreateGameForm(props: CreateGameFormProps) {
  const { createGame } = props

  const [isCreating, setIsCreating] = useState<boolean>(false)

  const [newGame, setNewGame] = useState<SwitchGameTypeNew>(newGameInit)

  const handleUpdateGame = (e: {
    target: {
      checked?: boolean
      name: string
      type: string
      value: string | number
    }
  }) => {
    const { checked, name, type, value } = e.target

    setNewGame(game => {
      if (type === 'checkbox') {
        return { ...game, [name]: checked }
      }
      return { ...game, [name]: value }
    })
  }

  const handleUpdateSelectMulti = (e: {
    target: {
      name: string
      selectedOptions: HTMLCollectionOf<HTMLOptionElement>
    }
  }) => {
    const { name, selectedOptions } = e.target

    setNewGame(game => ({
      ...game,
      [name]: Array.from(selectedOptions).map((o: any) => o.value)
    }))
  }

  const handleGameSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    createGame(newGame)
  }

  return (
    <div className="create-form-box">
      <button onClick={() => setIsCreating(state => !state)}>+ create</button>

      {isCreating && (
        <form onSubmit={handleGameSubmit} className="create-form">
          <div>
            <label htmlFor="game-name">Name</label>
            <input
              id="game-name"
              name="game-name"
              onChange={handleUpdateGame}
              value={newGame.name}
            />
          </div>

          <div>
            <label htmlFor="review">Review</label>
            <input
              id="review"
              name="review"
              onChange={handleUpdateGame}
              value={newGame.review}
            />
          </div>

          <div>
            <label htmlFor="rating">Rating</label>
            <input
              id="rating"
              name="rating"
              onChange={handleUpdateGame}
              step={1}
              type="number"
              value={newGame.rating}
              min={1}
              max={5}
            />
          </div>

          <div>
            <label htmlFor="developedBy">Developed By</label>
            <input
              id="developedBy"
              name="developedBy"
              onChange={handleUpdateGame}
              value={newGame.developedBy}
            />
          </div>

          <div>
            <label htmlFor="publishedBy">Published By</label>
            <input
              id="publishedBy"
              name="publishedBy"
              onChange={handleUpdateGame}
              value={newGame.publishedBy}
            />
          </div>

          <div>
            <label htmlFor="releaseDate">Release Date</label>
            <input
              id="releaseDate"
              name="releaseDate"
              onChange={handleUpdateGame}
              type="date"
              value={newGame.releaseDate}
            />
          </div>

          <div>
            <label htmlFor="datePlayed">Date Played</label>
            <input
              id="datePlayed"
              name="datePlayed"
              onChange={handleUpdateGame}
              type="date"
              value={newGame.datePlayed}
            />
          </div>

          <div>
            <label htmlFor="remake">Remake?</label>
            <input
              id="remake"
              name="remake"
              onChange={handleUpdateGame}
              type="checkbox"
              checked={newGame.remake}
            />
          </div>

          <div>
            <label htmlFor="multiplayer">Multiplayer?</label>
            <input
              id="multiplayer"
              name="multiplayer"
              onChange={handleUpdateGame}
              type="checkbox"
              checked={newGame.multiplayer}
            />
          </div>

          <div>
            <label htmlFor="multiplayerType">Multiplayer type</label>
            <input
              id="multiplayerType"
              name="multiplayerType"
              onChange={handleUpdateGame}
              value={newGame.multiplayerType}
            />
          </div>

          <div>
            <label htmlFor="multiplayerNumberOfPlayers">
              Number of Players
            </label>
            <input
              id="multiplayerNumberOfPlayers"
              name="multiplayerNumberOfPlayers"
              onChange={handleUpdateGame}
              step={1}
              type="number"
              value={newGame.multiplayerNumberOfPlayers}
              min={1}
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              onChange={handleUpdateGame}
              step={0.01}
              type="number"
              value={newGame.price}
              min={0}
            />
          </div>

          <div>
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              multiple
              name="genre"
              onChange={handleUpdateSelectMulti}
              value={newGame.genre}
            >
              {switchGenreList.map(genre => (
                <option key={genre.value} value={genre.value}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="mood">Mood (separate by commas)</label>
            <input
              id="mood"
              name="mood"
              onChange={handleUpdateGame}
              value={newGame.mood}
            />
          </div>

          <div>
            <label htmlFor="tags">Tags (separate by commas)</label>
            <input
              id="tags"
              name="tags"
              onChange={handleUpdateGame}
              value={newGame.tags}
            />
          </div>

          <button type="submit" disabled={!newGame.name}>
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default CreateGameForm

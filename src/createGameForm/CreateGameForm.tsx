import { useState } from 'react'
import { SwitchGameTypeNew } from '../interfaces'
import './create-game-form.css'

const newGameInit: SwitchGameTypeNew = {
  datePlayed: '',
  developedBy: '',
  genre: [],
  imagePath: '',
  imagePathSmall: '',
  lengthOfGame: '',
  mood: '', // turn into an array on submit
  multiplayer: false,
  multiplayerNumberOfPlayers: 1,
  multiplayerType: '',
  name: '',
  onlineFeatures: false,
  onlineMultiplayer: false,
  price: 0,
  publishedBy: '',
  rating: 1,
  recommended: false,
  releaseDate: '',
  remake: false,
  review: '',
  tags: ''
}

const switchGenreList: { name: string; value: string }[] = [
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
          <div className="create-form-row">
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                onChange={handleUpdateGame}
                required
                value={newGame.name}
              />
            </div>

            <div>
              <label htmlFor="rating">Rating</label>
              <input
                id="rating"
                name="rating"
                max={5}
                min={1}
                onChange={handleUpdateGame}
                required
                step={1}
                type="number"
                value={newGame.rating}
              />
            </div>
          </div>

          <div className="create-form-individual-box">
            <label htmlFor="review">Review</label>
            <textarea
              id="review"
              name="review"
              onChange={handleUpdateGame}
              required
              value={newGame.review}
            />
          </div>

          <hr />

          <div className="create-form-row">
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
          </div>

          <div className="create-form-row">
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

          <hr />

          <div className="create-form-individual-box">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              multiple
              name="genre"
              onChange={handleUpdateSelectMulti}
              size={switchGenreList.length}
              value={newGame.genre}
            >
              {switchGenreList.map(genre => (
                <option key={genre.value} value={genre.value}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="create-form-row">
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
              <label htmlFor="remake">Remake?</label>
              <input
                id="remake"
                name="remake"
                onChange={handleUpdateGame}
                type="checkbox"
                checked={newGame.remake}
              />
            </div>
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

          <button type="submit" disabled={!newGame.name || !newGame.rating}>
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default CreateGameForm

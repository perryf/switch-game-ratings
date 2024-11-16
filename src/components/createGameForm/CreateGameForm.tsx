import { useState } from 'react'
import { SwitchGameBasic } from '../../interfaces'
import './create-game-form.css'

const newGameInit: SwitchGameBasic = {
  title: '',
  description: '',
  displayTitle: '',
  releaseDateDisplay: new Date(),
  images: {
    boxart: '',
    descriptionImage: '',
    horizontalHeaderImage: ''
  },
  gameInfo: {
    developers: [],
    engine: '',
    esrbDescriptors: [],
    esrbRating: '',
    fileSize: '',
    freeToStart: false,
    generalFilters: [],
    genres: [],
    lengthOfGame: '',
    mood: [],
    msrp: 0.0,
    numOfPlayers: '',
    playerFilters: [],
    publishers: [],
    remake: false,
    slug: ''
  },
  myData: {
    datePlayed: '',
    datePurchased: '',
    emulatorSystem: '',
    isEmulator: false,
    physicalCopy: false,
    played: false,
    rating: 0,
    review: ''
  }
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
  createGame: (a: SwitchGameBasic) => void
}

function CreateGameForm(props: CreateGameFormProps) {
  const { createGame } = props

  const [isCreating, setIsCreating] = useState<boolean>(false)

  const [newGame, setNewGame] = useState<SwitchGameBasic>(newGameInit)

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

    // * Remove when ready
    createGame(newGame)
    setNewGame(newGameInit)
  }

  return (
    <div className="create-form-box">
      <button onClick={() => setIsCreating(state => !state)}>
        {isCreating ? 'x Cancel' : '+ Create'}
      </button>
      {isCreating && (
        <form onSubmit={handleGameSubmit} className="create-form">
          <div className="create-form-row">
            <div>
              <label htmlFor="title">Title *</label>
              <input
                id="title"
                name="title"
                onChange={handleUpdateGame}
                // required
                value={newGame.title}
              />
            </div>

            <div>
              <label htmlFor="rating">Rating *</label>
              <input
                id="rating"
                name="rating"
                max={5}
                min={0}
                onChange={handleUpdateGame}
                // required
                step={1}
                type="number"
                value={newGame.myData.rating}
              />
            </div>
          </div>

          <div className="create-form-individual-box">
            <label htmlFor="review">Review *</label>
            <textarea
              id="review"
              name="review"
              onChange={handleUpdateGame}
              // required
              value={newGame.myData.review}
            />
          </div>

          <hr />

          <div className="create-form-row">
            <div>
              <label htmlFor="developedBy">
                Developed By (separate by commas)
              </label>
              <input
                id="developedBy"
                name="developedBy"
                onChange={handleUpdateGame}
                value={newGame.gameInfo.developers}
              />
            </div>

            <div>
              <label htmlFor="publishedBy">
                Published By (separate by commas)
              </label>
              <input
                id="publishedBy"
                name="publishedBy"
                onChange={handleUpdateGame}
                value={newGame.gameInfo.publishers}
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
                value={
                  // TODO -> Clean this up
                  newGame.releaseDateDisplay
                    ? newGame.releaseDateDisplay.toLocaleDateString()
                    : ''
                }
              />
            </div>

            <div>
              <label htmlFor="datePlayed">Date Played</label>
              <input
                id="datePlayed"
                name="datePlayed"
                onChange={handleUpdateGame}
                type="date"
                // ? Make this date type?
                value={newGame.myData.datePlayed}
              />
            </div>
          </div>

          {/* // TODO -> Revisit Multiplayer stuff */}
          {/* <div>
            <label htmlFor="multiplayer">Multiplayer?</label>
            <input
              id="multiplayer"
              name="multiplayer"
              onChange={handleUpdateGame}
              type="checkbox"
              checked={newGame.multiplayer}
            />
          </div> */}
          {/* <div>
            <label htmlFor="multiplayerType">Multiplayer type</label>
            <input
              id="multiplayerType"
              name="multiplayerType"
              onChange={handleUpdateGame}
              value={newGame.multiplayerType}
            />
          </div> */}
          {/* <div>
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
          </div> */}

          <hr />

          <div className="create-form-individual-box">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              multiple
              name="genre"
              onChange={handleUpdateSelectMulti}
              size={switchGenreList.length}
              value={newGame.gameInfo.genres}
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
              {/* ? Should this be a string? */}
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                onChange={handleUpdateGame}
                step={0.01}
                type="number"
                value={newGame.gameInfo.msrp}
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
                checked={newGame.gameInfo.remake}
              />
            </div>
          </div>

          <div>
            <label htmlFor="mood">Mood (separate by commas)</label>
            <input
              id="mood"
              name="mood"
              onChange={handleUpdateGame}
              value={newGame.gameInfo.mood}
            />
          </div>

          <button
            type="submit"
            // disabled={!newGame.name || !newGame.rating || !newGame.review}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default CreateGameForm

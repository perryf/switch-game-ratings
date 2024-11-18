import { useEffect, useState } from 'react'
import { SwitchGameBasic } from '../../interfaces'
import './create-game-form.css'

const newGameInit: SwitchGameBasic = {
  title: '',
  description: '',
  displayTitle: '',
  releaseDateDisplay: new Date().toISOString().slice(0, 10),
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
  { name: 'Arcade', value: 'arcade' },
  { name: 'Board Game', value: 'board game' },
  { name: 'Fighting', value: 'fighting' },
  { name: 'First-Person', value: 'first-person' },
  { name: 'Fitness', value: 'fitness' },
  { name: 'Indie', value: 'indie' },
  { name: 'Multiplayer', value: 'multiplayer' },
  { name: 'Music', value: 'music' },
  { name: 'Other', value: 'other' },
  { name: 'Party', value: 'party' },
  { name: 'Platformer', value: 'platformer' },
  { name: 'Puzzle', value: 'puzzle' },
  { name: 'Racing', value: 'racing' },
  { name: 'Role-Playing', value: 'role-playing' },
  { name: 'Simulation', value: 'simulation' },
  { name: 'Sports', value: 'sports' },
  { name: 'Strategy', value: 'strategy' },
  { name: 'Training', value: 'training' }
]

interface CreateGameFormProps {
  createGame: (a: SwitchGameBasic) => void
  isEditing: boolean
  editInfo: null | SwitchGameBasic
  startEdit: (game: SwitchGameBasic | null) => void
}

function CreateGameForm(props: CreateGameFormProps) {
  const { createGame, isEditing, editInfo, startEdit } = props

  useEffect(() => {
    if (isEditing && editInfo) {
      setNewGame(editInfo)
    }
  }, [editInfo, isEditing])

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
      if (type === 'checkbox') return { ...game, [name]: checked }
      return { ...game, [name]: value }
    })
  }

  const updateMyData = (e: {
    target: {
      checked?: boolean
      name: string
      type: string
      value: string | number
    }
  }) => {
    const { checked, name, type, value } = e.target

    setNewGame(game => ({
      ...game,
      myData: {
        ...game.myData,
        [name]: type === 'checkbox' ? checked : value
      }
    }))
  }

  const updateGameInfo = (e: {
    target: {
      checked?: boolean
      name: string
      type: string
      value: string | number
    }
  }) => {
    const { checked, name, type, value } = e.target

    setNewGame(game => ({
      ...game,
      gameInfo: {
        ...game.gameInfo,
        [name]: type === 'checkbox' ? checked : value
      }
    }))
  }

  const handleUpdateGameInfoMulti = (e: {
    target: {
      name: string
      selectedOptions: HTMLCollectionOf<HTMLOptionElement>
    }
  }) => {
    const { name, selectedOptions } = e.target

    setNewGame(game => ({
      ...game,
      gameInfo: {
        ...game.gameInfo,
        [name]: Array.from(selectedOptions).map((o: any) => o.value)
      }
    }))
  }

  const handleClickCreateCancel = () => {
    setNewGame(newGameInit)
    startEdit(null)

    if (isEditing) {
      setIsCreating(false)
    } else {
      setIsCreating(state => !state)
    }
  }

  const handleGameSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const data: any = {
      ...newGame,
      displayTitle: newGame.title
    }

    createGame(data)
    setNewGame(newGameInit)
  }

  const isCreatingEditing = isCreating || isEditing

  return (
    <div className="create-form-box">
      <button
        className={`nes-btn ${isCreatingEditing ? 'is-error' : 'is-primary'}`}
        onClick={handleClickCreateCancel}
      >
        {isCreatingEditing ? 'x Cancel' : '+ Create'}
      </button>
      {isCreatingEditing && (
        <form
          onSubmit={handleGameSubmit}
          className="create-form nes-container with-title is-centered is-dark is-rounded"
        >
          <p className="title">Create Game Form</p>
          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="title">Title *</label>
              <input
                id="title"
                name="title"
                className="nes-input"
                onChange={handleUpdateGame}
                // required
                value={newGame.title}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="rating">Rating *</label>
              <input
                id="rating"
                name="rating"
                className="nes-input"
                max={5}
                min={0}
                onChange={updateMyData}
                // required
                step={1}
                type="number"
                value={newGame.myData.rating}
              />
            </div>
          </div>

          <div className="nes-field">
            <label htmlFor="review">Review *</label>
            <textarea
              className="nes-textarea"
              id="review"
              name="review"
              onChange={updateMyData}
              // required
              value={newGame.myData.review}
            />
          </div>

          <hr />

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="developers">
                Developed By (separate by commas)
              </label>
              <input
                id="developers"
                name="developers"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.developers}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="publishers">
                Published By (separate by commas)
              </label>
              <input
                id="publishers"
                name="publishers"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.publishers}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="engine">Engine</label>
              <input
                id="engine"
                name="engine"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.engine}
              />
            </div>
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="esrbRating">
                ESRB Rating (separate by commas)
              </label>
              <input
                id="esrbRating"
                name="esrbRating"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.esrbRating}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="fileSize">File Size</label>
              <input
                id="fileSize"
                name="fileSize"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.fileSize}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="freeToStart">
                <input
                  id="freeToStart"
                  name="freeToStart"
                  type="checkbox"
                  className="nes-checkbox"
                  onChange={updateGameInfo}
                  checked={newGame.gameInfo.freeToStart}
                />
                <span>Free to Start?</span>
              </label>
            </div>

            <div className="nes-field">
              <label htmlFor="generalFilters">
                General Filters (separate by commas)
              </label>
              <input
                id="generalFilters"
                name="generalFilters"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.generalFilters}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="lengthOfGame">
                Length of Game (short, medium, or long)
              </label>
              <input
                id="lengthOfGame"
                name="lengthOfGame"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.lengthOfGame}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="slug">Slug</label>
              <input
                id="slug"
                name="slug"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.slug}
              />
            </div>
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="releaseDateDisplay">Release Date</label>
              <input
                id="releaseDateDisplay"
                name="releaseDateDisplay"
                className="nes-input"
                onChange={handleUpdateGame}
                type="date"
                value={
                  // TODO -> Clean this up
                  newGame.releaseDateDisplay
                  // ? newGame.releaseDateDisplay.toLocaleDateString()
                  // : ''
                }
              />
            </div>

            <div className="nes-field">
              <label htmlFor="datePlayed">Date Played</label>
              <input
                id="datePlayed"
                name="datePlayed"
                className="nes-input"
                onChange={updateMyData}
                type="date"
                // ? Make this date type?
                value={newGame.myData.datePlayed}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="datePurchased">Date Purchased</label>
              <input
                id="datePurchased"
                name="datePurchased"
                className="nes-input"
                onChange={updateMyData}
                type="date"
                // ? Make this date type?
                value={newGame.myData.datePurchased}
              />
            </div>
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="isEmulator">
                <input
                  id="isEmulator"
                  name="isEmulator"
                  type="checkbox"
                  className="nes-checkbox"
                  onChange={updateMyData}
                  checked={newGame.myData.isEmulator}
                />
                <span>Is Emulator?</span>
              </label>
            </div>

            <div className="nes-field">
              <label htmlFor="emulatorSystem">Emulator System</label>
              <input
                id="emulatorSystem"
                name="emulatorSystem"
                className="nes-input"
                onChange={updateMyData}
                type="text"
                value={newGame.myData.datePlayed}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="physicalCopy">
                <input
                  id="physicalCopy"
                  name="physicalCopy"
                  type="checkbox"
                  className="nes-checkbox"
                  onChange={updateMyData}
                  checked={newGame.myData.physicalCopy}
                />
                <span>Physical Copy?</span>
              </label>
            </div>

            <div className="nes-field">
              <label htmlFor="played">
                <input
                  id="played"
                  name="played"
                  type="checkbox"
                  className="nes-checkbox"
                  onChange={updateMyData}
                  checked={newGame.myData.played}
                />
                <span>Played?</span>
              </label>
            </div>
          </div>

          <div className="nes-field">
            <label htmlFor="numOfPlayers">Number of Players</label>
            <input
              id="numOfPlayers"
              name="numOfPlayers"
              className="nes-input"
              onChange={handleUpdateGame}
              type="text"
              value={newGame.gameInfo.numOfPlayers}
            />
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="playerFilters">Player Filter</label>
              <select
                id="playerFilters"
                multiple
                name="playerFilters"
                className="nes-select"
                onChange={handleUpdateGameInfoMulti}
                size={switchGenreList.length}
                value={newGame.gameInfo.playerFilters}
              >
                {Array.from({ length: 60 }).map((_, i: number) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <div className="nes-field">
              <label htmlFor="genres">Genre</label>
              <select
                id="genres"
                multiple
                name="genres"
                className="nes-select"
                onChange={handleUpdateGameInfoMulti}
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
          </div>

          <hr />

          <div className="create-form-row">
            <div className="nes-field">
              {/* ? Should this be a string? */}
              <label htmlFor="msrp">Price</label>
              <input
                id="msrp"
                name="msrp"
                onChange={updateGameInfo}
                step={0.01}
                type="number"
                className="nes-input"
                placeholder="0.00"
                value={Number(newGame.gameInfo.msrp)}
                min={0}
                max={1000}

                // onBlur={e => ({})}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="remake">
                <input
                  id="remake"
                  name="remake"
                  type="checkbox"
                  className="nes-checkbox"
                  onChange={updateGameInfo}
                  checked={newGame.gameInfo.remake}
                />
                <span>Remake?</span>
              </label>
            </div>
          </div>

          <div className="nes-field">
            <label htmlFor="mood">Mood (separate by commas)</label>
            <input
              id="mood"
              name="mood"
              className="nes-input"
              onChange={updateGameInfo}
              value={newGame.gameInfo.mood}
            />
          </div>

          <div className="nes-field">
            <label htmlFor="boxart">Boxart (include link to image)</label>
            <input
              id="boxart"
              name="boxart"
              className="nes-input"
              onChange={updateGameInfo}
              value={newGame.images.boxart}
            />
          </div>

          <div className="nes-field">
            <label htmlFor="descriptionImage">
              Description Image (include link to image)
            </label>
            <input
              id="descriptionImage"
              name="descriptionImage"
              className="nes-input"
              onChange={updateGameInfo}
              value={newGame.images.descriptionImage}
            />
          </div>

          <div className="nes-field">
            <label htmlFor="horizontalHeaderImage">
              Horizontal Header Image (include link to image)
            </label>
            <input
              id="horizontalHeaderImage"
              name="horizontalHeaderImage"
              className="nes-input"
              onChange={updateGameInfo}
              value={newGame.images.horizontalHeaderImage}
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

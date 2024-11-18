import { useEffect, useState } from 'react'
import { GameInfoType, SwitchGameBasicType } from '../../interfaces'
import {
  capitalize,
  convertCSVToArray,
  isArray,
  convertArrayToCSV
} from '../../helpers'
import './create-game-form.css'

const gameLengths: string[] = ['short', 'medium', 'long']
const emulatorSystems: string[] = [
  'nes',
  'snes',
  'sega',
  'gameboy',
  'gba',
  'n64'
]

const newGameInit: SwitchGameBasicType = {
  description: '',
  displayTitle: '',
  title: '',
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
    msrp: 0.0,
    numOfPlayers: '',
    playerFilters: [],
    publishers: [],
    remake: false,
    slug: '',
    tags: []
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
  { name: 'Action', value: 'Action' },
  { name: 'Adventure', value: 'Adventure' },
  { name: 'Arcade', value: 'Arcade' },
  { name: 'Board Game', value: 'Board game' },
  { name: 'Fighting', value: 'Fighting' },
  { name: 'First-Person', value: 'First-person' },
  { name: 'Fitness', value: 'Fitness' },
  { name: 'Indie', value: 'Indie' },
  { name: 'Multiplayer', value: 'mMultiplayer' },
  { name: 'Music', value: 'Music' },
  { name: 'Other', value: 'Other' },
  { name: 'Party', value: 'Party' },
  { name: 'Platformer', value: 'Platformer' },
  { name: 'Puzzle', value: 'Puzzle' },
  { name: 'Racing', value: 'Racing' },
  { name: 'Role-Playing', value: 'Role-playing' },
  { name: 'Simulation', value: 'Simulation' },
  { name: 'Sports', value: 'Sports' },
  { name: 'Strategy', value: 'Strategy' },
  { name: 'Training', value: 'Training' }
]

interface CreateGameFormProps {
  editInfo: null | SwitchGameBasicType
  isEditing: boolean
  stopEdit: () => void
  submitCreateGame: (a: SwitchGameBasicType) => void
  submitEditGame: (a: SwitchGameBasicType) => void
}

interface eventTargetType {
  target: {
    checked?: boolean
    name: string
    type: string
    value: string | number
  }
}

interface eventMultiTargetType {
  target: {
    name: string
    selectedOptions: HTMLCollectionOf<HTMLOptionElement>
  }
}

function CreateGameForm(props: CreateGameFormProps) {
  const { editInfo, isEditing, stopEdit, submitCreateGame, submitEditGame } =
    props

  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [newGame, setNewGame] = useState<SwitchGameBasicType>(newGameInit)

  useEffect(() => {
    if (isEditing && editInfo) {
      const { gameInfo }: { gameInfo: GameInfoType } = editInfo
      const editInfoShaped = {
        ...editInfo,
        gameInfo: {
          ...gameInfo,
          developers: convertArrayToCSV(gameInfo.developers),
          esrbDescriptors: convertArrayToCSV(
            convertArrayToCSV(gameInfo.esrbDescriptors)
          ),
          generalFilters: convertArrayToCSV(
            convertArrayToCSV(gameInfo.generalFilters)
          ),
          publishers: convertArrayToCSV(gameInfo.publishers),
          playerFilters: isArray(gameInfo.playerFilters)
            ? gameInfo.playerFilters?.map((f: string) => f.replace('+', ''))
            : []
        }
      }
      setNewGame(editInfoShaped)
    }
  }, [editInfo, isEditing])

  const handleUpdateGame: (target: eventTargetType) => void = ({
    target: { checked, name, type, value }
  }) => {
    setNewGame(game => {
      if (type === 'checkbox') return { ...game, [name]: checked }
      return { ...game, [name]: value }
    })
  }

  const updateMyData: (target: eventTargetType) => void = ({
    target: { checked, name, type, value }
  }) => {
    setNewGame(game => ({
      ...game,
      myData: {
        ...game.myData,
        [name]: type === 'checkbox' ? checked : value
      }
    }))
  }

  const updateGameInfo: (target: eventTargetType) => void = ({
    target: { checked, name, type, value }
  }) => {
    setNewGame(game => ({
      ...game,
      gameInfo: {
        ...game.gameInfo,
        [name]: type === 'checkbox' ? checked : value
      }
    }))
  }

  const handleUpdateGameInfoMulti: (target: eventMultiTargetType) => void = ({
    target: { name, selectedOptions }
  }) => {
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
    if (isEditing) {
      stopEdit()
    } else {
      setIsCreating(state => !state)
    }
  }

  const handleGameSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const { gameInfo } = newGame

    const data: SwitchGameBasicType = {
      ...newGame,
      title: isEditing ? newGame.displayTitle : newGame.title,
      gameInfo: {
        ...gameInfo,
        developers: convertCSVToArray(gameInfo.developers),
        esrbDescriptors: convertCSVToArray(gameInfo.esrbDescriptors),
        generalFilters: convertCSVToArray(gameInfo.generalFilters),
        publishers: convertCSVToArray(gameInfo.publishers),
        tags: convertCSVToArray(gameInfo.tags)
      }
    }

    if (isEditing) {
      submitEditGame(data)
      stopEdit()
    } else {
      submitCreateGame(data)
    }
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
          <p className="displayTitle">Create Game Form</p>
          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="displayTitle">Title *</label>
              <input
                id="displayTitle"
                name="displayTitle"
                className="nes-input"
                onChange={handleUpdateGame}
                required
                value={newGame.displayTitle}
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
                required
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
              required
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
                value={newGame.gameInfo.developers || ''}
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
                value={newGame.gameInfo.publishers || ''}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="engine">Engine</label>
              <input
                id="engine"
                name="engine"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.engine || ''}
              />
            </div>
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="esrbRating">ESRB Rating</label>
              <input
                id="esrbRating"
                name="esrbRating"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.esrbRating || ''}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="esrbDescriptors">
                ESRB Descriptors (separate by commas)
              </label>
              <input
                id="esrbDescriptors"
                name="esrbDescriptors"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.esrbDescriptors || ''}
              />
            </div>
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="fileSize">File Size</label>
              <input
                id="fileSize"
                name="fileSize"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.fileSize || ''}
              />
            </div>
            <div className="nes-field">
              <label htmlFor="slug">Slug</label>
              <input
                id="slug"
                name="slug"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.slug || ''}
              />
            </div>
          </div>
          <div className="nes-field ms-20">
            <label htmlFor="freeToStart">
              <input
                id="freeToStart"
                name="freeToStart"
                type="checkbox"
                className="nes-checkbox is-dark"
                onChange={updateGameInfo}
                checked={newGame.gameInfo.freeToStart || false}
              />
              <span>Free to Start?</span>
            </label>
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="generalFilters">
                {/* From Nintendo API */}
                General Filters (separate by commas)
              </label>
              <input
                id="generalFilters"
                name="generalFilters"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.generalFilters || ''}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="lengthOfGame">
                Length of Game (short, medium, or long)
              </label>
              <div className="nes-select">
                <select
                  id="lengthOfGame"
                  name="lengthOfGame"
                  onChange={updateGameInfo}
                  value={newGame.gameInfo.lengthOfGame || ''}
                >
                  <option value="" />
                  {gameLengths.map((l: string) => (
                    <option key={l} value={l}>
                      {capitalize(l)}
                    </option>
                  ))}
                </select>
              </div>
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
                  newGame.releaseDateDisplay || ''
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
                value={newGame.myData.datePlayed || ''}
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
                value={newGame.myData.datePurchased || ''}
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
                  className="nes-checkbox is-dark"
                  onChange={updateMyData}
                  checked={newGame.myData.isEmulator || false}
                />
                <span>Is Emulator?</span>
              </label>
            </div>
            <div className="nes-field">
              <label htmlFor="emulatorSystem">Emulator System</label>
              <div className="nes-select">
                <select
                  id="emulatorSystem"
                  name="emulatorSystem"
                  onChange={updateMyData}
                  value={newGame.myData.emulatorSystem || ''}
                >
                  <option value="">N/A</option>
                  {emulatorSystems.map((emulator: string) => (
                    <option key={emulator} value={emulator}>
                      {emulator}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="physicalCopy">
                <input
                  id="physicalCopy"
                  name="physicalCopy"
                  type="checkbox"
                  className="nes-checkbox is-dark"
                  onChange={updateMyData}
                  checked={newGame.myData.physicalCopy || false}
                />
                <span>Physical Copy?</span>
              </label>
            </div>
            <div className="nes-field ms-20">
              <label htmlFor="played">
                <input
                  id="played"
                  name="played"
                  type="checkbox"
                  className="nes-checkbox is-dark"
                  onChange={updateMyData}
                  checked={newGame.myData.played || false}
                />
                <span>Played?</span>
              </label>
            </div>
            <div className="nes-field ms-20">
              <label htmlFor="remake">
                <input
                  id="remake"
                  name="remake"
                  type="checkbox"
                  className="nes-checkbox is-dark"
                  onChange={updateGameInfo}
                  checked={newGame.gameInfo.remake || false}
                />
                <span>Remake?</span>
              </label>
            </div>
          </div>

          <div className="nes-field">
            <label htmlFor="numOfPlayers">
              Number of Players (i.e. "1 player", "up to 4 players")
            </label>
            <input
              id="numOfPlayers"
              name="numOfPlayers"
              className="nes-input"
              onChange={handleUpdateGame}
              type="text"
              value={newGame.gameInfo.numOfPlayers || ''}
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
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
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
                value={newGame.gameInfo.genres || ''}
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
              <label htmlFor="tags">Tags (separate by commas)</label>
              <input
                id="tags"
                name="tags"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.gameInfo.tags || ''}
              />
            </div>
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="boxart">Boxart (include link to image)</label>
              <input
                id="boxart"
                name="boxart"
                className="nes-input"
                onChange={updateGameInfo}
                value={newGame.images.boxart || ''}
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
                value={newGame.images.descriptionImage || ''}
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
                value={newGame.images.horizontalHeaderImage || ''}
              />
            </div>
          </div>
          <button
            type="submit"
            className="nes-btn is-primary"
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

import {
  emulatorSystems,
  gameInfoInit,
  gameLengths,
  imagesInit,
  myDataInit,
  newGameInit,
  switchGenreList
} from '../../constants'
import { capitalize, convertCSVToArray } from '../../helpers'
import {
  GameImagesType,
  GameInfoType,
  MyDataType,
  SwitchGameBasicType,
  EventTargetType,
  EventMultiTargetType
} from '../../interfaces'
import './create-game-form.css'

interface CreateGameFormProps {
  deleteGame: (id: number) => void
  formType: 'create' | 'edit'
  handleClickCreateCancel: () => void
  newGame: SwitchGameBasicType
  setNewGame: (
    game:
      | SwitchGameBasicType
      | ((game: SwitchGameBasicType) => SwitchGameBasicType)
  ) => void
  setShowForm: (b: boolean) => void
  showForm: boolean
  stopEdit: () => void
  submitCreateGame: (a: SwitchGameBasicType) => void
  submitEditGame: (a: SwitchGameBasicType) => void
}

function CreateGameForm(props: CreateGameFormProps) {
  const {
    deleteGame,
    formType,
    handleClickCreateCancel,
    newGame,
    setNewGame,
    setShowForm,
    showForm,
    stopEdit,
    submitCreateGame,
    submitEditGame
  } = props

  const images: GameImagesType = newGame.images || imagesInit
  const gameInfo: GameInfoType = newGame.gameInfo || gameInfoInit
  const myData: MyDataType = newGame.myData || myDataInit
  const isEditing: boolean = formType === 'edit'

  const handleUpdateGame: (target: EventTargetType) => void = ({
    target: { checked, name, type, value }
  }) => {
    setNewGame((game: SwitchGameBasicType) => {
      if (type === 'checkbox') return { ...game, [name]: checked }
      return { ...game, [name]: value }
    })
  }

  const updateMyData: (target: EventTargetType) => void = ({
    target: { checked, name, type, value }
  }) => {
    setNewGame((game: SwitchGameBasicType) => ({
      ...game,
      myData: {
        ...game.myData,
        [name]: type === 'checkbox' ? checked : value
      }
    }))
  }

  const updateGameInfo: (target: EventTargetType) => void = ({
    target: { checked, name, type, value }
  }) => {
    setNewGame((game: SwitchGameBasicType) => ({
      ...game,
      gameInfo: {
        ...game.gameInfo,
        [name]: type === 'checkbox' ? checked : value
      }
    }))
  }

  const updateImageInfo: (target: EventTargetType) => void = ({
    target: { name, value }
  }) => {
    setNewGame((game: SwitchGameBasicType) => ({
      ...game,
      images: {
        ...game.images,
        [name]: value
      }
    }))
  }

  const handleUpdateGameInfoMulti: (target: EventMultiTargetType) => void = ({
    target: { name, selectedOptions }
  }) => {
    setNewGame((game: SwitchGameBasicType) => ({
      ...game,
      gameInfo: {
        ...game.gameInfo,
        [name]: Array.from(selectedOptions).map((o: any) => o.value)
      }
    }))
  }

  const handleGameSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const gameInfo: GameInfoType = newGame.gameInfo || gameInfoInit
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
      setShowForm(false)
    }
    setNewGame(newGameInit)
  }

  const handleDelete: () => void = () => {
    if (newGame.id) deleteGame(newGame.id)
  }

  return (
    <div className="create-form-box">
      <button
        className={`nes-btn ${showForm ? 'is-error' : 'is-primary'}`}
        onClick={handleClickCreateCancel}
      >
        {showForm ? 'x Cancel' : '+ Create'}
      </button>
      {showForm && (
        <form
          onSubmit={handleGameSubmit}
          className="create-form nes-container with-title is-centered is-dark is-rounded"
        >
          <h3>{isEditing ? 'Edit' : 'Create'} Game Form</h3>
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
                value={myData.rating}
              />
            </div>
          </div>

          {/* usually got from the nintendo site game's description*/}
          <div className="nes-field review-box">
            <label htmlFor="description">Description *</label>
            <textarea
              className="nes-textarea"
              id="description"
              name="description"
              onChange={handleUpdateGame}
              required
              value={newGame.description}
            />
          </div>

          <div className="nes-field review-box">
            <label htmlFor="review">Review *</label>
            <textarea
              className="nes-textarea"
              id="review"
              name="review"
              onChange={updateMyData}
              required
              value={myData.review}
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
                value={gameInfo.developers || ''}
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
                value={gameInfo.publishers || ''}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="engine">Engine</label>
              <input
                id="engine"
                name="engine"
                className="nes-input"
                onChange={updateGameInfo}
                value={gameInfo.engine || ''}
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
                value={gameInfo.esrbRating || ''}
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
                value={gameInfo.esrbDescriptors || ''}
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
                value={gameInfo.fileSize || ''}
              />
            </div>
            <div className="nes-field">
              <label htmlFor="slug">Slug</label>
              <input
                id="slug"
                name="slug"
                className="nes-input"
                onChange={updateGameInfo}
                value={gameInfo.slug || ''}
              />
            </div>
          </div>
          <div className="nes-field ms-20">
            <label htmlFor="freeToStart" className="checkbox-label">
              <input
                id="freeToStart"
                name="freeToStart"
                type="checkbox"
                className="nes-checkbox is-dark"
                onChange={updateGameInfo}
                checked={gameInfo.freeToStart || false}
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
                value={gameInfo.generalFilters || ''}
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
                  value={gameInfo.lengthOfGame || ''}
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
                value={myData.datePlayed || ''}
              />
            </div>
            {false && (
              <div className="nes-field">
                <label htmlFor="datePurchased">Date Purchased</label>
                <input
                  id="datePurchased"
                  name="datePurchased"
                  className="nes-input"
                  onChange={updateMyData}
                  type="date"
                  // ? Make this date type?
                  value={myData.datePurchased || ''}
                />
              </div>
            )}
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="isEmulator" className="checkbox-label">
                <input
                  id="isEmulator"
                  name="isEmulator"
                  type="checkbox"
                  className="nes-checkbox is-dark"
                  onChange={updateMyData}
                  checked={myData.isEmulator || false}
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
                  value={myData.emulatorSystem || ''}
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
              <label htmlFor="physicalCopy" className="checkbox-label">
                <input
                  id="physicalCopy"
                  name="physicalCopy"
                  type="checkbox"
                  className="nes-checkbox is-dark"
                  onChange={updateMyData}
                  checked={myData.physicalCopy || false}
                />
                <span>Physical Copy?</span>
              </label>
            </div>
            <div className="nes-field ms-20">
              <label htmlFor="played" className="checkbox-label">
                <input
                  id="played"
                  name="played"
                  type="checkbox"
                  className="nes-checkbox is-dark"
                  onChange={updateMyData}
                  checked={myData.played || false}
                />
                <span>Played?</span>
              </label>
            </div>
            <div className="nes-field ms-20">
              <label htmlFor="remake" className="checkbox-label">
                <input
                  id="remake"
                  name="remake"
                  type="checkbox"
                  className="nes-checkbox is-dark"
                  onChange={updateGameInfo}
                  checked={gameInfo.remake || false}
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
              value={gameInfo.numOfPlayers || ''}
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
                value={gameInfo.playerFilters}
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
                value={gameInfo.genres || ''}
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
                value={Number(gameInfo.msrp)}
                min={0}
                max={1000}
              />
            </div>

            <div className="nes-field">
              <label htmlFor="tags">Tags (separate by commas)</label>
              <input
                id="tags"
                name="tags"
                className="nes-input"
                onChange={updateGameInfo}
                value={gameInfo.tags || ''}
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
                onChange={updateImageInfo}
                value={images.boxart || ''}
              />
            </div>
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="descriptionImage">
                Description Image (include link to image)
              </label>
              <input
                id="descriptionImage"
                name="descriptionImage"
                className="nes-input"
                onChange={updateImageInfo}
                value={images.descriptionImage || ''}
              />
            </div>
          </div>

          <div className="create-form-row">
            <div className="nes-field">
              <label htmlFor="horizontalHeaderImage">
                Horizontal Header Image (include link to image)
              </label>
              <input
                id="horizontalHeaderImage"
                name="horizontalHeaderImage"
                className="nes-input"
                onChange={updateImageInfo}
                value={images.horizontalHeaderImage || ''}
              />
            </div>
          </div>

          <div className="create-form-button-box">
            <button className="nes-btn" onClick={handleClickCreateCancel}>
              x Cancel
            </button>
            {isEditing && (
              <button className="nes-btn is-error" onClick={handleDelete}>
                Delete
              </button>
            )}
            <button type="submit" className="nes-btn is-primary">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default CreateGameForm

import { useState } from 'react'
import { SwitchGameEditType } from '../../interfaces'
import { isArray, convertArrayToCSV } from '../../helpers'
import './switch-game.css'

interface SwitchGameTypeEdit extends SwitchGameEditType {
  startEdit: Function
}

interface MasonrySwitchGameProps {
  index: number
  width: number
  data: SwitchGameTypeEdit
}

const getHearts = (rating: number) => {
  return (
    <div className="heart-box">
      <i className={`nes-icon heart ${rating < 1 && 'is-empty'}`} />
      <i className={`nes-icon heart ${rating < 2 && 'is-empty'}`} />
      <i className={`nes-icon heart ${rating < 3 && 'is-empty'}`} />
      <i className={`nes-icon heart ${rating < 4 && 'is-empty'}`} />
      <i className={`nes-icon heart ${rating < 5 && 'is-empty'}`} />
    </div>
  )
}

function SwitchGame(props: MasonrySwitchGameProps) {
  const { data: game } = props
  const { gameInfo, images, myData, startEdit } = game
  const [showMore, setShowMore] = useState(false)

  const gameReleaseDate = game.releaseDateDisplay
    ? new Date(game.releaseDateDisplay)
    : ''

  return (
    <div
      // TODO -> remove game.title after data setup
      key={game.id || game.title}
      className="game-box"
      style={{
        backgroundImage: `url(${images.horizontalHeaderImage})`,
        backgroundColor: '#cccccc',
        backgroundSize: 'cover'
      }}
    >
      <div className="game-box-inners">
        <div className="game-box-top-row">
          <div>
            <h3>
              <span className="game-title">{game.displayTitle}</span>{' '}
              <span className="game-date-display">
                {gameReleaseDate
                  ? `(${gameReleaseDate.toLocaleDateString('en-US')})`
                  : ''}
              </span>
            </h3>
          </div>
          <button onClick={() => startEdit(game)}>Edit</button>
        </div>

        <div className="game-info-box">
          <div className="game-info">
            <img
              src={
                images.boxart ||
                images.horizontalHeaderImage ||
                images.descriptionImage
              }
              alt="box art"
              className="box-art"
            />

            <ul className="game-stats-list">
              <li className="rating-list-item">
                <b>Rating:</b> {getHearts(myData.rating)}
              </li>

              <li>
                {isArray(gameInfo.genres) &&
                  gameInfo.genres.map((genre: string, i: number) => {
                    const genreName = genre === 'Role-Playing' ? 'RPG' : genre
                    return (
                      <p className="nes-badge genre-badge" key={`${genre}${i}`}>
                        <span className="nes-badge is-warning">
                          {genreName}
                        </span>
                      </p>
                    )
                  })}
              </li>
              <li>
                <b>Price:</b> ${gameInfo.msrp}
              </li>
              <li>
                <b>Number of Players:</b> {gameInfo.numOfPlayers}
              </li>
              {showMore && (
                <>
                  <li>
                    <b>Developers:</b> {convertArrayToCSV(gameInfo.developers)}
                  </li>
                  <li>
                    <b>Publishers:</b> {convertArrayToCSV(gameInfo.publishers)}
                  </li>
                  <li>
                    <b>Rated:</b> {gameInfo.esrbRating}{' '}
                    {gameInfo.esrbDescriptors && gameInfo.esrbDescriptors.length
                      ? `(${convertArrayToCSV(gameInfo.esrbDescriptors)})`
                      : ''}
                  </li>
                  {gameInfo.fileSize && (
                    <li>
                      <b>File Size:</b> {gameInfo.fileSize}
                    </li>
                  )}
                  {gameInfo.engine && (
                    <li>
                      <b>Engine:</b> {gameInfo.engine}
                    </li>
                  )}
                  <li>
                    <b>Remake:</b> {gameInfo.remake ? 'Yes' : 'No'}
                  </li>
                </>
              )}
              {!showMore && (
                <button
                  className="show-game-details-button"
                  onClick={() => setShowMore(true)}
                >
                  + Show more
                </button>
              )}
            </ul>
          </div>

          {images.descriptionImage && (
            <img
              src={images.descriptionImage}
              alt="description image"
              className="description-art"
            />
          )}
        </div>

        {showMore && (
          <div className="game-description-box">
            <p className="game-description">{game.description}</p>

            <button
              className="show-game-details-button"
              onClick={() => setShowMore(false)}
            >
              x Show less
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SwitchGame

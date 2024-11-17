import { useState } from 'react'
import {
  SwitchGameType
  // GameInfo,
  // MyData,
  // GameImages,
  // SwitchGameBasic
} from '../../interfaces'
import './switch-game.css'

// interface SwitchGameProps {
//   game: SwitchGameType
// }

interface MasonrySwitchGameProps {
  index: number
  width: number
  data: SwitchGameType
}

function SwitchGame(props: MasonrySwitchGameProps) {
  const { data: game } = props
  const { gameInfo, images } = game
  const [showMore, setShowMore] = useState(false)

  const gameReleaseDate = game.releaseDateDisplay
    ? new Date(game.releaseDateDisplay)
    : ''

  return (
    <div
      className="game-box"
      style={{
        backgroundImage: `url(${images.horizontalHeaderImage})`,
        backgroundColor: '#cccccc',
        backgroundSize: 'cover'
      }}
    >
      <div className="game-box-inners">
        <h3>
          <span className="game-title">{game.displayTitle}</span>{' '}
          <span className="game-date-display">
            {gameReleaseDate
              ? `(${gameReleaseDate.toLocaleDateString('en-US')})`
              : ''}
          </span>
        </h3>

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
            <ul className="nes-list is-disc game-stats-list">
              <li>
                <b>Genres</b>:{' '}
                {gameInfo.genres.map((genre: string) => {
                  const genreName = genre === 'Role-Playing' ? 'RPG' : genre
                  return (
                    <p className="nes-badge genre-badge">
                      <span className="nes-badge is-warning">{genreName}</span>
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
                    <b>Developers:</b> {gameInfo.developers.join(', ')}
                  </li>
                  <li>
                    <b>Publishers:</b> {gameInfo.publishers.join(', ')}
                  </li>
                  <li>
                    <b>Rated:</b> {gameInfo.esrbRating}{' '}
                    {gameInfo.esrbDescriptors && gameInfo.esrbDescriptors.length
                      ? `(${gameInfo.esrbDescriptors.join(', ')})`
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

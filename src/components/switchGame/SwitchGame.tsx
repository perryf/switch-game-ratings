import { useState } from 'react'
import { gameInfoInit, imagesInit, myDataInit } from '../../constants'
import { convertArrayToCSV, isArray, getHearts } from '../../helpers'
import {
  GameImagesType,
  GameInfoType,
  MyDataType,
  SwitchGameEditType
} from '../../interfaces'
import './switch-game.css'

interface SwitchGameProps {
  game: SwitchGameEditType
}

function SwitchGame(props: SwitchGameProps) {
  const { game } = props
  // these or statements are here to prevent if there is a null for gameInfo, images, or myData (shouldn't really be 🤷🏻‍♀️)
  const images: GameImagesType = game.images || imagesInit
  const gameInfo: GameInfoType = game.gameInfo || gameInfoInit
  const myData: MyDataType = game.myData || myDataInit

  const [showMore, setShowMore] = useState(false)

  const gameReleaseDate = game.releaseDateDisplay
    ? new Date(game.releaseDateDisplay)
    : ''

  return (
    <div
      className={`game-box ${showMore ? 'game-box-details' : ''}`}
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
          <button onClick={() => game.startEdit(game)}>Edit</button>
        </div>

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

        {showMore && (
          <div className="game-description-box">
            {images.descriptionImage && (
              <img
                src={images.descriptionImage}
                alt="description image"
                className="description-art"
              />
            )}
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

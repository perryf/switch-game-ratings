import {
  SwitchGameType
  // GameInfo,
  // MyData,
  // GameImages,
  // SwitchGameBasic
} from '../../interfaces'
import './switch-game.css'

interface SwitchGameProps {
  game: SwitchGameType
}

function SwitchGame(props: SwitchGameProps) {
  const { game } = props
  const { gameInfo, images } = game

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
            <li>Genres: {gameInfo.genres.join(', ')}</li>
            <li>Price: ${gameInfo.msrp}</li>
            <li>Number of Players: {gameInfo.numOfPlayers}</li>
            <li>Developers: {gameInfo.developers.join(', ')}</li>
            <li>Publishers: {gameInfo.publishers.join(', ')}</li>
            <li>
              Rated: {gameInfo.esrbRating}{' '}
              {gameInfo.esrbDescriptors && gameInfo.esrbDescriptors.length
                ? `(${gameInfo.esrbDescriptors.join(', ')})`
                : ''}
            </li>
          </ul>
        </div>

        <div className="game-description-box">
          <p className="game-description">{game.description}</p>
        </div>
      </div>
    </div>
  )
}

export default SwitchGame

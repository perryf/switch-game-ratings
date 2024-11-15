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

  const gameReleaseDate = game.releaseDateDisplay
    ? new Date(game.releaseDateDisplay)
    : ''

  return (
    <li key={game.id} className="switch-game-list-item">
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
              <li>
                <b>Genres</b>: {gameInfo.genres.join(', ')}
              </li>
              <li>
                <b>Price:</b> ${gameInfo.msrp}
              </li>
              <li>
                <b>Number of Players:</b> {gameInfo.numOfPlayers}
              </li>
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
            </ul>
          </div>

          <div className="game-description-box">
            <p className="game-description">{game.description}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SwitchGame

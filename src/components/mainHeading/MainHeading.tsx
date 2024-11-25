import { useState } from 'react'
import { getHearts } from '../../helpers'
import Filters from '../filters/Filters'
import './main-heading.css'

interface MainHeadingProps {
  ratingFilter: string
  handleChangeRatingFilter: (x: string) => void
  search: string
  handleChangeSearch: (x: string) => void
  handleSort: (name: string) => void
  currentSort: { sortBy: string; direction: string }
}

function MainHeading(props: MainHeadingProps) {
  const {
    search,
    handleChangeSearch,
    handleSort,
    currentSort,
    ratingFilter,
    handleChangeRatingFilter
  } = props
  const [showInstructions, setShowInstructions] = useState<boolean>(false)

  const handleTitleClick: () => void = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className="main-heading-box">
      <div className="main-heading-box-top">
        <i className="snes-logo heading-icon" />
        <div className="main-heading-middle">
          <h1 onClick={handleTitleClick}>Switch Game Ratings</h1>

          <a href="https://github.com/perryf" className="perry-github-link">
            <p>by Perry</p>
          </a>
        </div>
        <button
          className="question-mark-box"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          ?
        </button>
      </div>
      <div className={`instructions ${showInstructions ? 'show' : ''}`}>
        <p>
          Here's my very subjective rating system. Keep in mind I'm only playing
          games that look decent and I'll think I'll like.
        </p>
        <ul>
          <li>
            {getHearts(1)}
            <span>Yikes! Not good, real stinkeroo</span>
          </li>
          <li>
            {getHearts(2)}
            <span>= Eh, not too great. You can probably skip this one.</span>
          </li>
          <li>
            {getHearts(3)}
            <span>
              = Not bad, may be worth playing if you're into this kind of game.
            </span>
          </li>
          <li>
            {getHearts(4)}
            <span>= Great game! Enjoyable, fun, recommended.</span>
          </li>
          <li>
            {getHearts(5)}
            <span>
              = Wow! Amazing! Such game! One of the best games I've played on
              the switch.
            </span>
          </li>
        </ul>
        <button className="nes-btn" onClick={() => setShowInstructions(false)}>
          Close
        </button>
      </div>
      <Filters
        ratingFilter={ratingFilter}
        search={search}
        handleChangeSearch={handleChangeSearch}
        currentSort={currentSort}
        handleSort={handleSort}
        handleChangeRatingFilter={handleChangeRatingFilter}
      />
    </div>
  )
}

export default MainHeading

import { useState } from 'react'
import Filters from '../filters/Filters'
import Instructions from '../instructions/Instructions'
import './main-heading.css'

interface MainHeadingProps {
  currentSort: { sortBy: string; direction: string }
  handleChangeRatingFilter: (x: string) => void
  handleChangeSearch: (x: string) => void
  handleSort: (name: string) => void
  ratingFilter: string
  search: string
}

function MainHeading(props: MainHeadingProps) {
  const {
    currentSort,
    handleChangeRatingFilter,
    handleChangeSearch,
    handleSort,
    ratingFilter,
    search
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
          <h1 onClick={handleTitleClick}>Switch Ratings</h1>
          <Filters
            currentSort={currentSort}
            handleChangeRatingFilter={handleChangeRatingFilter}
            handleChangeSearch={handleChangeSearch}
            handleSort={handleSort}
            ratingFilter={ratingFilter}
            search={search}
          />
        </div>
        <div className="main-heading-left">
          <button
            className="question-mark-box"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            ?
          </button>
        </div>
      </div>
      <Instructions
        setShowInstructions={setShowInstructions}
        showInstructions={showInstructions}
      />
    </div>
  )
}

export default MainHeading

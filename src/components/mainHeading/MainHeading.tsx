import { useState } from 'react'
import Filters from '../filters/Filters'
import Instructions from '../instructions/Instructions'
import './main-heading.css'

interface MainHeadingProps {
  currentSort: { sortBy: string; direction: string }
  genreFilter: string
  handleSort: (name: string) => void
  isMultiplayer: boolean
  ratingFilter: string
  resetFilters: () => void
  search: string
  setGenreFilter: (s: string) => void
  setIsMultiplayer: (b: boolean) => void
  setRatingFilter: (s: string) => void
  setSearch: (s: string) => void
}

function MainHeading(props: MainHeadingProps) {
  const {
    currentSort,
    genreFilter,
    handleSort,
    isMultiplayer,
    ratingFilter,
    resetFilters,
    search,
    setGenreFilter,
    setIsMultiplayer,
    setRatingFilter,
    setSearch
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
            genreFilter={genreFilter}
            handleSort={handleSort}
            isMultiplayer={isMultiplayer}
            ratingFilter={ratingFilter}
            resetFilters={resetFilters}
            search={search}
            setGenreFilter={setGenreFilter}
            setIsMultiplayer={setIsMultiplayer}
            setRatingFilter={setRatingFilter}
            setSearch={setSearch}
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

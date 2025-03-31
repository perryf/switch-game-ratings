import { useState } from 'react'
import Filters from '../filters/Filters'
import Instructions from '../instructions/Instructions'
import './main-heading.css'

interface MainHeadingProps {
  currentSort: { sortBy: string; direction: string }
  handleSort: (name: string) => void
  ratingFilter: string
  search: string
  isMultiplayer: boolean
  genreFilter: string
  setSearch: (s: string) => void
  setRatingFilter: (s: string) => void
  setGenreFilter: (s: string) => void
  setIsMultiplayer: (b: boolean) => void
}

function MainHeading(props: MainHeadingProps) {
  const {
    currentSort,
    handleSort,
    ratingFilter,
    search,
    isMultiplayer,
    genreFilter,
    setSearch,
    setRatingFilter,
    setGenreFilter,
    setIsMultiplayer
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
            handleSort={handleSort}
            ratingFilter={ratingFilter}
            search={search}
            isMultiplayer={isMultiplayer}
            genreFilter={genreFilter}
            setSearch={setSearch}
            setRatingFilter={setRatingFilter}
            setGenreFilter={setGenreFilter}
            setIsMultiplayer={setIsMultiplayer}
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

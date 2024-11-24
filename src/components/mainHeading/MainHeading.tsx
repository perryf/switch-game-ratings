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
        <button className="question-mark-box">?</button>
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

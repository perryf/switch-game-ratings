import { useState } from 'react'
import './filters.css'

const getDirectionArrow = (direction: string) => {
  if (direction === 'asc') return '↑'
  if (direction === 'desc') return '↓'
  return ''
}

interface FilterProps {
  ratingFilter: string
  handleChangeRatingFilter: (x: string) => void
  search: string
  handleChangeSearch: (x: string) => void
  handleSort: (name: string) => void
  currentSort: { sortBy: string; direction: string }
}

function Filters(props: FilterProps) {
  const {
    search,
    handleChangeSearch,
    handleSort,
    currentSort,
    ratingFilter,
    handleChangeRatingFilter
  } = props
  const [showFilters, setShowFilters] = useState<boolean>(false)

  return (
    <div className="game-filters-box">
      <button
        className="show-filters-btn"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'hide' : 'show'} filters
      </button>
      {showFilters && (
        <div className="game-filters">
          <div className="nes-field">
            <label htmlFor="search-bar">Game Title</label>
            <input
              id="search-bar"
              className="nes-input"
              onChange={e => handleChangeSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="nes-field">
            <label htmlFor="rating-filter">Rating Filter</label>
            <div className="nes-select">
              <select
                id="rating-filter"
                onChange={e => handleChangeRatingFilter(e.target.value)}
                value={ratingFilter}
              >
                <option value="" />
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div className="nes-field">
            <label>Sort</label>
            <button onClick={() => handleSort('title')} className="nes-btn">
              Title{' '}
              {currentSort.sortBy === 'title' &&
                getDirectionArrow(currentSort.direction)}
            </button>
            <button onClick={() => handleSort('rating')} className="nes-btn">
              Rating{' '}
              {currentSort.sortBy === 'rating' &&
                getDirectionArrow(currentSort.direction)}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filters

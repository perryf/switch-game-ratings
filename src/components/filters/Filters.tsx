import { useState } from 'react'
import { switchGenreList } from '../../constants'
import './filters.css'

const getDirectionArrow = (direction: string) => {
  if (direction === 'asc') return '↑'
  if (direction === 'desc') return '↓'
  return ''
}

interface FilterProps {
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

function Filters(props: FilterProps) {
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
  const [showFilters, setShowFilters] = useState<boolean>(false)

  const hasFilter = genreFilter || isMultiplayer || ratingFilter || search

  const handleOpenCloseFilter = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="game-filters-box">
      <div className="game-filters-top-row">
        <button className="show-filters-btn" onClick={handleOpenCloseFilter}>
          {showFilters ? 'Hide' : 'Show'} filters
        </button>
        {hasFilter && (
          <button className="show-filters-btn" onClick={resetFilters}>
            Clear
          </button>
        )}
      </div>
      {showFilters && (
        <div className="game-filters">
          <div className="nes-field">
            <label htmlFor="search-bar">Game Title</label>
            <input
              id="search-bar"
              name="search-bar"
              className="nes-input"
              onChange={e => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="nes-field">
            <label htmlFor="rating-filter">Rating</label>
            <div className="nes-select">
              <select
                id="rating-filter"
                name="rating-filter"
                onChange={e => setRatingFilter(e.target.value)}
                value={ratingFilter}
              >
                <option value="">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div className="nes-field">
            <label htmlFor="genre-filter">Genre</label>
            <div className="nes-select">
              <select
                id="genre-filter"
                name="genre-filter"
                onChange={e => setGenreFilter(e.target.value)}
                value={genreFilter}
              >
                <option value="">All</option>
                {switchGenreList.map(genre => (
                  <option value={genre.value} key={genre.value}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="nes-field">
            <label htmlFor="is-multiplayer">
              <input
                name="is-multiplayer"
                id="is-multiplayer"
                type="checkbox"
                className="nes-checkbox"
                checked={isMultiplayer}
                onChange={e => setIsMultiplayer(e.target.checked)}
              />
              <span>Has Multiplayer</span>
            </label>
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

import { useState } from 'react'
import { switchGenreList } from '../../constants'
import './filters.css'

const getDirectionArrow = (direction: string) => {
  if (direction === 'asc') return '↑'
  if (direction === 'desc') return '↓'
  return ''
}

interface FilterProps {
  ratingFilter: string
  search: string
  handleSort: (name: string) => void
  currentSort: { sortBy: string; direction: string }
  isMultiplayer: boolean
  genreFilter: string
  resetFilters: () => void
  setSearch: (s: string) => void
  setRatingFilter: (s: string) => void
  setGenreFilter: (s: string) => void
  setIsMultiplayer: (b: boolean) => void
}

function Filters(props: FilterProps) {
  const {
    search,
    handleSort,
    currentSort,
    ratingFilter,
    isMultiplayer,
    genreFilter,
    resetFilters,
    setSearch,
    setRatingFilter,
    setGenreFilter,
    setIsMultiplayer
  } = props
  const [showFilters, setShowFilters] = useState<boolean>(false)

  const handleOpenCloseFilter = () => {
    setShowFilters(!showFilters)
    if (showFilters) resetFilters()
  }

  return (
    <div className="game-filters-box">
      <button className="show-filters-btn" onClick={handleOpenCloseFilter}>
        {showFilters ? 'Hide' : 'Show'} filters
      </button>
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
            <label htmlFor="genre-filter">Genre</label>
            <div className="nes-select">
              <select
                id="genre-filter"
                name="genre-filter"
                onChange={e => setGenreFilter(e.target.value)}
                value={genreFilter}
              >
                <option value="" />
                {switchGenreList.map(genre => (
                  <option value={genre.value}>{genre.name}</option>
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

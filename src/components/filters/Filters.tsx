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

  return (
    <div className="game-filters">
      <div className="search-bar">
        <label htmlFor="search-bar">Game Title</label>
        <input
          id="search-bar"
          onChange={e => handleChangeSearch(e.target.value)}
          value={search}
        />
      </div>

      <div>
        <label htmlFor="rating-filter">Rating Filter</label>
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

      <div className="sort-by">
        <button onClick={() => handleSort('title')}>
          Sort By Title{' '}
          {currentSort.sortBy === 'title' &&
            getDirectionArrow(currentSort.direction)}
        </button>
        <button onClick={() => handleSort('rating')}>
          Sort By Rating{' '}
          {currentSort.sortBy === 'rating' &&
            getDirectionArrow(currentSort.direction)}
        </button>
      </div>
    </div>
  )
}

export default Filters

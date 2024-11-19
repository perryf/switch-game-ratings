import './filters.css'

const getDirectionArrow = (direction: string) => {
  if (direction === 'asc') return '↑'
  if (direction === 'desc') return '↓'
  return ''
}

interface FilterProps {
  search: string
  handleChangeSearch: (x: string) => void
  handleSort: (name: string) => void
  currentSort: { sortBy: string; direction: string }
}

function Filters(props: FilterProps) {
  const { search, handleChangeSearch, handleSort, currentSort } = props
  console.log(props.currentSort)

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

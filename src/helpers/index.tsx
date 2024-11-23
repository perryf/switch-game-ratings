// used for searching through Nintendo API for game titles -- makes game titles more universal
export const shapeGameTitle: (text: string) => string = (title: string) => {
  if (!title) return ''

  return title
    .replace(/\™/g, '')
    .replace(/\©/g, '')
    .replace(/\®/g, '')
    .replace(/\’/g, '')
    .replace(/\'/g, '')
    .replace(/\:/g, '')
    .replace(/\./g, '')
    .replace(/\é/g, 'e')
    .replace(/11/g, '') // needed for mortal kombat 11 --- not sure why it wasn't matching
    .toLowerCase()
    .trim()
}

export const capitalize: (text: string) => string = text => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// sorts games by display title -- used in sort function
export const sortGames: (
  a: { displayTitle: string },
  b: { displayTitle: string },
  direction?: string
) => number = (a, b, direction = 'asc') => {
  // console.log(a, b, direction)
  if (!direction) return 0

  const sortNum = direction === 'asc' ? -1 : 1
  const aTitle = a.displayTitle.toLowerCase()
  const bTitle = b.displayTitle.toLowerCase()

  if (aTitle < bTitle) return sortNum
  if (aTitle > bTitle) return -sortNum
  return 0
}

export const sortByRating: (
  a: { displayTitle: string; myData: { rating: number } },
  b: { displayTitle: string; myData: { rating: number } },
  direction?: string
) => number = (a, b, direction = 'asc') => {
  if (!direction) return 0

  const sortNum = direction === 'asc' ? -1 : 1
  const aRating = a.myData.rating || 0
  const bRating = b.myData.rating || 0

  if (aRating < bRating) return sortNum
  if (aRating > bRating) return -sortNum

  // sort by title if ratings match\
  const aTitle = a.displayTitle.toLowerCase()
  const bTitle = b.displayTitle.toLowerCase()
  if (aTitle < bTitle) return -1
  if (aTitle > bTitle) return 1
  return 0
}

// checks if value is type string
export const isString = (value: any) => {
  return typeof value === 'string'
}

// checks if value is type array
export const isArray = (value: any) => {
  return Array.isArray(value)
}

// converts comma separated string into an array and trims whitespace
export const convertCSVToArray = (s: any) => {
  return isString(s) ? s.split(',').map(s => s.trim()) : []
}

export const convertArrayToCSV = (a: any) => {
  return isArray(a) ? a.join(', ') : ''
}

export const getNewSortDirection: (
  currentDirection: string
) => string = currentDirection => {
  if (currentDirection === 'asc') return 'desc'
  if (currentDirection === 'desc') return 'asc'
  return 'asc'
}

// used to show rating (x out of 5 hearts)
export const getHearts = (rating: number) => {
  return (
    <div className="heart-box">
      <i className={`nes-icon heart ${rating < 1 && 'is-empty'}`} />
      <i className={`nes-icon heart ${rating < 2 && 'is-empty'}`} />
      <i className={`nes-icon heart ${rating < 3 && 'is-empty'}`} />
      <i className={`nes-icon heart ${rating < 4 && 'is-empty'}`} />
      <i className={`nes-icon heart ${rating < 5 && 'is-empty'}`} />
    </div>
  )
}

// * Loops through all json test data and POSTs them to DB
// filteredList.forEach(async (game: any) => {
//   try {
//     const res = await client.models.Game.create(game)
//     console.log(res)

//     if (res.errors) {
//       console.log('*****************')
//       console.log(res.errors)
//     }
//   } catch (error) {
//     console.log('--------------')
//     console.error(error)
//   }
// })

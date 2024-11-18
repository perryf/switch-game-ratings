import { a } from '@aws-amplify/backend'

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
  b: { displayTitle: string }
) => number = (a, b) => {
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

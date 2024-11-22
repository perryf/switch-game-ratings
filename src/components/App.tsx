import { useEffect, useState } from 'react'
// import { StorageImage } from '@aws-amplify/ui-react-storage'
import type { Schema } from '../../amplify/data/resource'
// import { ownedGamesReviewable } from '../switch-games-owned'
// import switchGameListFull from '../switch-games-list-full.json'
// @ts-ignore
// import { filteredList } from '../../switch-games-owned-details'
import { isArray, sortGames, sortByRating } from '../helpers'
import { SwitchGameBasicType } from '../interfaces'
import CreateGameForm from './createGameForm/CreateGameForm'
import SwitchGameList from './switchGameList/SwitchGameList'
import MainHeading from './mainHeading/MainHeading'
import Filters from './filters/Filters'

const getNewSortDirection: (
  currentDirection: string
) => string = currentDirection => {
  if (currentDirection === 'asc') return 'desc'
  if (currentDirection === 'desc') return 'asc'
  return 'asc'
}

interface AppProps {
  client: any
}

function App(props: AppProps) {
  const { client } = props
  const [games, setGames] = useState<Array<Schema['Game']['type']>>([])
  const [gamesDisplay, setGamesDisplay] = useState<
    Array<Schema['Game']['type']>
  >([])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editInfo, setEditInfo] = useState<null | SwitchGameBasicType>(null)

  const [search, setSearch] = useState<string>('')
  const [ratingFilter, setRatingFilter] = useState<string>('')
  const [currentSort, setCurrentSort] = useState<{
    sortBy: string
    direction: string
  }>({ sortBy: 'title', direction: 'asc' })

  useEffect(() => {
    const sub = client.models.Game.observeQuery().subscribe({
      next: ({ items = [] }) => {
        // sorts every time a change is made...
        const data = items.sort(sortGames).map((g: any) => {
          const gameInfo = g?.gameInfo || {}
          return {
            ...g,
            gameInfo: {
              ...gameInfo,
              // filtering out empty string in array
              generalFilters: isArray(gameInfo.generalFilters)
                ? gameInfo.generalFilters.filter((g: string) => g)
                : [],
              esrbDescriptors: isArray(gameInfo.esrbDescriptors)
                ? gameInfo.esrbDescriptors.filter((g: string) => g)
                : []
            }
          }
        })

        // * data from local json
        // setGames([...filteredList])
        setGames([...data])
        setGamesDisplay([...data])
        stopEdit()
      },
      error: (error: {}) => console.warn(error)
    })
    return () => sub.unsubscribe()
  }, [client])

  const startEdit = (game: SwitchGameBasicType | null) => {
    setIsEditing(true)
    setEditInfo(game)
  }

  const stopEdit: () => void = () => {
    setIsEditing(false)
    setEditInfo(null)
  }

  const handleChangeSearch = (s: string) => {
    setSearch(s)
    const gamesUpdate = games.filter((g: any) => {
      return g.displayTitle.toLowerCase().includes(s.toLowerCase())
    })

    setGamesDisplay(gamesUpdate)
  }

  const handleChangeRatingFilter = (s: string) => {
    setRatingFilter(s)
    const gamesUpdate = games.filter((g: any) => {
      if (!s) return true
      return g.myData.rating === Number(s)
    })

    setGamesDisplay(gamesUpdate)
  }

  const handleSort = (name: string) => {
    const newDirection =
      name === currentSort.sortBy
        ? getNewSortDirection(currentSort.direction)
        : 'asc'

    setCurrentSort(state => {
      if (name === state.sortBy) {
        return {
          sortBy: name,
          direction: newDirection
        }
      }
      return { sortBy: name, direction: 'asc' }
    })

    const gamesUpdate =
      name === 'title'
        ? gamesDisplay.sort((a, b) => sortGames(a, b, newDirection))
        : // @ts-ignore
          gamesDisplay.sort((a, b) => sortByRating(a, b, newDirection))

    setGamesDisplay(gamesUpdate)
  }

  async function submitCreateGame(newGame: SwitchGameBasicType) {
    const { returnData, errors } = await client.models.Game.create(newGame)
    if (returnData) console.log('-----SUCCESS------', returnData)
    if (errors) console.log('----ERROR----', errors)
  }

  async function submitEditGame(game: SwitchGameBasicType) {
    // * Random stuff to get around typescript && graphql
    const data = {
      ...game,
      includeInReviews: true
    }
    delete data.startEdit

    const { returnData, errors } = await client.models.Game.update(data)
    if (returnData) console.log('-----SUCCESS------', returnData)
    if (errors) console.log('----ERROR----', errors)
  }

  // ! Currently a bug where the Masonry package will throw an error when rendering after a delete is performed
  async function deleteGame(id: number) {
    if (window.confirm('Are you sure you want to delete this game?')) {
      const { returnData, errors } = await client.models.Game.delete({ id })
      if (returnData) console.log('-----SUCCESS------', returnData)
      if (errors) console.log('----ERROR----', errors)
      stopEdit()
    }
  }

  return (
    <main>
      <MainHeading />
      <Filters
        ratingFilter={ratingFilter}
        search={search}
        handleChangeSearch={handleChangeSearch}
        currentSort={currentSort}
        handleSort={handleSort}
        handleChangeRatingFilter={handleChangeRatingFilter}
      />
      <CreateGameForm
        editInfo={editInfo}
        isEditing={isEditing}
        stopEdit={stopEdit}
        submitCreateGame={submitCreateGame}
        submitEditGame={submitEditGame}
        deleteGame={deleteGame}
      />
      <SwitchGameList games={gamesDisplay.map(g => ({ ...g, startEdit }))} />
    </main>
  )
}

export default App

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
  console.log(currentDirection)
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
  const [currentSort, setCurrentSort] = useState<{
    sortBy: string
    direction: string
  }>({ sortBy: 'title', direction: 'asc' })

  useEffect(() => {
    console.log('____________')
    const sub = client.models.Game.observeQuery().subscribe({
      next: ({ items = [] }) => {
        // sorts every time a change is made...
        const data = items.sort(sortGames).map((g: any) => {
          return {
            ...g,
            gameInfo: {
              ...g.gameInfo,
              // filtering out empty string in array
              generalFilters: isArray(g.gameInfo.generalFilters)
                ? g.gameInfo.generalFilters.filter((g: string) => g)
                : [],
              esrbDescriptors: isArray(g.gameInfo.esrbDescriptors)
                ? g.gameInfo.esrbDescriptors.filter((g: string) => g)
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
    console.log('CREATE')
    console.log(newGame)

    try {
      const { returnData, errors } = await client.models.Game.create(newGame)
      console.log(['-----SUCCESS------'])
      console.log(returnData)
      console.log(errors)
    } catch (err) {
      console.log('----ERROR----')
      console.log(err)
    }
  }

  async function submitEditGame(game: SwitchGameBasicType) {
    console.log(game, 'EDIT')

    // * Random stuff to get around typescript && graphql
    const data = {
      ...game,
      includeInReviews: true
    }
    delete data.startEdit
    // const myDataShaped = { ...data.myData }
    // const gameInfoShaped = { ...data.gameInfo }
    // const imagesShaped = { ...data.images }
    // const keys = Object.keys(data) as Array<keyof typeof data>
    // const myDataKeys = Object.keys(myDataShaped) as Array<
    //   keyof typeof myDataShaped
    // >
    // const gameInfoKeys = Object.keys(gameInfoShaped) as Array<
    //   keyof typeof gameInfoShaped
    // >
    // const imagesKeys = Object.keys(imagesShaped) as Array<
    //   keyof typeof imagesShaped
    // >

    // keys.forEach(key => {
    //   if (data[key] === null) delete data[key]
    // })
    // myDataKeys.forEach(key => {
    //   if (myDataShaped[key] === null) delete myDataShaped[key]
    // })
    // gameInfoKeys.forEach(key => {
    //   if (gameInfoShaped[key] === null) delete gameInfoShaped[key]
    // })
    // imagesKeys.forEach(key => {
    //   if (imagesShaped[key] === null) delete imagesShaped[key]
    // })

    // const shapedData = {
    //   ...data,
    //   myData: myDataShaped,
    //   gameInfo: gameInfoShaped,
    //   images: imagesShaped
    // }

    // console.log(shapedData)

    try {
      const res = await client.models.Game.update(data)
      console.log(['-----SUCCESS------'])
      console.log(res)
    } catch (err) {
      console.log('----ERROR----')
      console.log(err)
    }
  }

  // ! Currently a bug where the Masonry package will throw an error when rendering after a delete is performed
  async function deleteGame(id: number) {
    if (window.confirm('Are you sure you want to delete this game?')) {
      await client.models.Game.delete({ id })
      stopEdit()
    }
  }

  return (
    <main>
      <MainHeading />
      <Filters
        search={search}
        handleChangeSearch={handleChangeSearch}
        currentSort={currentSort}
        handleSort={handleSort}
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

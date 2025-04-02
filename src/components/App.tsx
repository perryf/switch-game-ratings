import { useEffect, useState } from 'react'
import { gameInfoInit, newGameInit } from '../constants'
import {
  convertArrayToCSV,
  getNewSortDirection,
  isArray,
  sortByRating,
  sortGames
} from '../helpers'
import { GameInfoType, SwitchGameBasicType } from '../interfaces'
import CreateGameForm from './createGameForm/CreateGameForm'
import SwitchGameList from './switchGameList/SwitchGameList'
import MainHeading from './mainHeading/MainHeading'

interface AppProps {
  client: any
}

function App(props: AppProps) {
  const { client } = props
  const [games, setGames] = useState<SwitchGameBasicType[]>([])
  const [gamesDisplay, setGamesDisplay] = useState<SwitchGameBasicType[]>([])

  const [formType, setFormType] = useState<'create' | 'edit'>('create')
  const [showForm, setShowForm] = useState<boolean>(false)
  const [newGame, setNewGame] = useState<SwitchGameBasicType>(newGameInit)

  const [search, setSearch] = useState<string>('')
  const [ratingFilter, setRatingFilter] = useState<string>('')
  const [genreFilter, setGenreFilter] = useState<string>('')
  const [isMultiplayer, setIsMultiplayer] = useState<boolean>(false)
  const [currentSort, setCurrentSort] = useState<{
    sortBy: string
    direction: string
  }>({ sortBy: 'title', direction: 'asc' })

  useEffect(() => {
    const sub = client.models.Game.observeQuery().subscribe({
      next: ({ items = [] }) => {
        // sorts every time a change is made...
        const data = items.sort(sortGames).map((g: SwitchGameBasicType) => {
          const gameInfo = g?.gameInfo || {}
          return {
            ...g,
            gameInfo: {
              ...gameInfo,
              // filtering out empty string in array
              esrbDescriptors: isArray(gameInfo.esrbDescriptors)
                ? gameInfo.esrbDescriptors.filter((g: string) => g)
                : [],
              developers: isArray(gameInfo.developers)
                ? gameInfo.developers.filter((g: string) => g)
                : [],
              publishers: isArray(gameInfo.publishers)
                ? gameInfo.publishers.filter((g: string) => g)
                : [],
              generalFilters: isArray(gameInfo.generalFilters)
                ? gameInfo.generalFilters.filter((g: string) => g)
                : [],
              tags: isArray(gameInfo.tags)
                ? gameInfo.tags.filter((g: string) => g)
                : []
            }
          }
        })

        // * data from local json -- delete once not needed
        setGames([...data])
        setGamesDisplay([...data])
        stopEdit()
      },
      error: (error: {}) => console.warn(error)
    })
    return () => sub.unsubscribe()
  }, [client])

  useEffect(() => {
    // TODO -> handle sorting
    const gamesUpdate: SwitchGameBasicType[] = games.filter((g: any) => {
      if (search) {
        if (!g.displayTitle.toLowerCase().includes(search.toLowerCase())) {
          return false
        }
      }
      if (ratingFilter) {
        if (g.myData.rating !== Number(ratingFilter)) {
          return false
        }
      }
      if (isMultiplayer) {
        if (g.gameInfo.playerFilters.length <= 1) {
          return false
        }
      }
      if (genreFilter) {
        if (!g.gameInfo.genres.find((genre: string) => genre === genreFilter)) {
          return false
        }
      }
      return true
    })

    setGamesDisplay(gamesUpdate)
  }, [search, ratingFilter, genreFilter, isMultiplayer, currentSort])

  const startEdit = (game: SwitchGameBasicType) => {
    const gameInfo: GameInfoType = game.gameInfo || gameInfoInit
    const editInfoShaped = {
      ...game,
      gameInfo: {
        ...gameInfo,
        // turn some of the arrays into CSVs so they fit into text inputs
        developers: convertArrayToCSV(gameInfo.developers),
        esrbDescriptors: convertArrayToCSV(
          convertArrayToCSV(gameInfo.esrbDescriptors)
        ),
        generalFilters: convertArrayToCSV(
          convertArrayToCSV(gameInfo.generalFilters)
        ),
        publishers: convertArrayToCSV(gameInfo.publishers),
        playerFilters: isArray(gameInfo.playerFilters)
          ? gameInfo.playerFilters?.map((f: string) => f.replace('+', ''))
          : []
      }
    }

    setNewGame(editInfoShaped)
    setFormType('edit')
    setShowForm(true)
  }

  const stopEdit: () => void = () => {
    setShowForm(false)
    setFormType('create')
  }

  const resetFilters: () => void = () => {
    setSearch('')
    setRatingFilter('')
    setGenreFilter('')
    setIsMultiplayer(false)
    setCurrentSort({ sortBy: 'title', direction: 'asc' })
  }

  // TODO -> combine with filter above in useEffect
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
        : gamesDisplay.sort((a, b) => sortByRating(a, b, newDirection))

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

  async function deleteGame(id: number) {
    if (window.confirm('Are you sure you want to delete this game?')) {
      const { returnData, errors } = await client.models.Game.delete({ id })
      if (returnData) console.log('-----SUCCESS------', returnData)
      if (errors) console.log('----ERROR----', errors)
      stopEdit()
    }
  }

  const handleClickCreateCancel = () => {
    setNewGame(newGameInit)
    setShowForm(state => !state)
    setFormType('create')
  }

  return (
    <main>
      <MainHeading
        currentSort={currentSort}
        handleSort={handleSort}
        ratingFilter={ratingFilter}
        search={search}
        isMultiplayer={isMultiplayer}
        genreFilter={genreFilter}
        resetFilters={resetFilters}
        setSearch={setSearch}
        setRatingFilter={setRatingFilter}
        setGenreFilter={setGenreFilter}
        setIsMultiplayer={setIsMultiplayer}
      />
      <CreateGameForm
        deleteGame={deleteGame}
        handleClickCreateCancel={handleClickCreateCancel}
        showForm={showForm}
        formType={formType}
        newGame={newGame}
        setShowForm={setShowForm}
        setNewGame={setNewGame}
        stopEdit={stopEdit}
        submitCreateGame={submitCreateGame}
        submitEditGame={submitEditGame}
      />
      <SwitchGameList games={gamesDisplay.map(g => ({ ...g, startEdit }))} />
    </main>
  )
}

export default App

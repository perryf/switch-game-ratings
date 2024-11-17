import { useEffect, useState } from 'react'
// import { StorageImage } from '@aws-amplify/ui-react-storage'
import type { Schema } from '../../amplify/data/resource'
// import { ownedGamesReviewable } from '../switch-games-owned'
// import switchGameListFull from '../switch-games-list-full.json'
import {
  switchGamesOwnedMasterList,
  filteredList
  // @ts-ignore
} from '../../switch-games-owned-details'
import { SwitchGameBasic } from '../interfaces'
import CreateGameForm from './createGameForm/CreateGameForm'
import SwitchGameList from './switchGameList/SwitchGameList'

// used to sort games when imported
const sortGames = (
  a: { displayTitle: string },
  b: { displayTitle: string }
) => {
  const aTitle = a.displayTitle.toLowerCase()
  const bTitle = b.displayTitle.toLowerCase()
  if (aTitle < bTitle) return -1
  if (aTitle > bTitle) return 1
  return 0
}

interface AppProps {
  client: any
}

// TODO -> Figure out why manually entered games did not get entered into the DB
function App(props: AppProps) {
  const { client } = props
  const [games, setGames] = useState<Array<Schema['Game']['type']>>([])

  useEffect(() => {
    const sub = client.models.Game.observeQuery().subscribe({
      next: ({ items = [] }) => {
        const data = items.sort(sortGames)

        setGames([...filteredList])
        // setGames([...data])
      },
      error: (error: {}) => console.warn(error)
    })
    return () => sub.unsubscribe()
  }, [client])

  // * Data from local json file
  // useEffect(() => {
  //   setGames(
  //     switchGamesOwnedMasterList.sort((a: any, b: any) =>
  //       a.displayTitle < b.displayTitle ? -1 : 1
  //     )
  //   )
  // }, [])

  async function createGame(newGame: SwitchGameBasic) {
    console.log(newGame)
    // ? not sure if this is needed -- probably a better way
    // turns comma separated strings into arrays, changes numbers that are technically strings into numbers
    // const data: {
    //   name: string
    //   rating: number
    //   [key: string]: string | boolean | number | string[]
    // } = {
    //   ...newGame,
    //   mood: newGame.mood ? newGame.mood.split(',').map(m => m.trim()) : [],
    //   tags: newGame.tags ? newGame.tags.split(',').map(m => m.trim()) : [],
    //   multiplayerType: newGame.multiplayerType
    //     ? newGame.multiplayerType.split(',').map(m => m.trim())
    //     : [],
    //   price: +newGame.price,
    //   multiplayerNumberOfPlayers: +newGame.multiplayerNumberOfPlayers,
    //   rating: +newGame.rating
    // }
    // // remove empty strings
    // Object.keys(data).forEach((key: string) => {
    //   if (data[key] === '') delete data[key]
    // })

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
  }

  async function deleteGame(id: string) {
    console.log(id)
    if (window.confirm('Are you sure you want to delete this game?')) {
      // await client.models.Game.delete({ id })
    }
  }

  return (
    <main>
      <h1>
        Switch Game Ratings <i className="snes-logo"></i>
      </h1>
      <CreateGameForm createGame={createGame} />
      <SwitchGameList deleteGame={deleteGame} games={games} />
    </main>
  )
}

export default App

import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'
import {
  getGamesAmerica,
  getQueriedGamesAmerica,
  getShopsAmerica,
  getGamesEurope,
  getGamesJapan
} from 'nintendo-switch-eshop'
// import { StorageImage } from '@aws-amplify/ui-react-storage'
import type { Schema } from '../amplify/data/resource'
// import { ownedGamesReviewable } from '../switch-games-owned'
// import switchGameListFull from '../switch-games-list-full.json'
// import { switchGamesOwnedMasterList } from '../switch-games-owned-details'
import { SwitchGameTypeNew } from './interfaces'
import CreateGameForm from './createGameForm/CreateGameForm'
import SwitchGameList from './switchGameList/SwitchGameList'

interface AllGames {
  title: string
  description: string
  genres: string[]
}

const client = generateClient<Schema>()

function App() {
  const [games, setGames] = useState<Array<Schema['Game']['type']>>([])
  const [allGames, setAllGames] = useState<AllGames[]>([])

  useEffect(() => {
    const sub = client.models.Game.observeQuery().subscribe({
      next: ({ items }) => setGames([...items]),
      error: error => console.warn(error)
    })
    return () => sub.unsubscribe()
  }, [])

  // useEffect(() => {
  //   getGamesAmerica()
  //     .then(json => {
  //       setAllGames(json)
  //     })
  //     .catch(err => console.error(err))
  // }, [])

  async function createGame(newGame: SwitchGameTypeNew) {
    // ? not sure if this is needed -- probably a better way
    // turns comma separated strings into arrays, changes numbers that are technically strings into numbers
    const data: {
      name: string
      rating: number
      [key: string]: string | boolean | number | string[]
    } = {
      ...newGame,
      mood: newGame.mood ? newGame.mood.split(',').map(m => m.trim()) : [],
      tags: newGame.tags ? newGame.tags.split(',').map(m => m.trim()) : [],
      multiplayerType: newGame.multiplayerType
        ? newGame.multiplayerType.split(',').map(m => m.trim())
        : [],
      price: +newGame.price,
      multiplayerNumberOfPlayers: +newGame.multiplayerNumberOfPlayers,
      rating: +newGame.rating
    }

    // remove empty strings
    Object.keys(data).forEach((key: string) => {
      if (data[key] === '') delete data[key]
    })

    // const res = await client.models.Game.create(switchGamesOwnedMasterList[0])
  }

  async function deleteGame(id: string) {
    if (window.confirm('Are you sure you want to delete this game?')) {
      await client.models.Game.delete({ id })
    }
  }

  return (
    <main>
      <h1>Switch Games</h1>
      <CreateGameForm createGame={createGame} />
      <SwitchGameList deleteGame={deleteGame} games={games} />
    </main>
  )
}

export default App

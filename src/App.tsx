import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../amplify/data/resource'
import { SwitchGameTypeNew } from './interfaces'
import CreateGameForm from './createGameForm/CreateGameForm'
import SwitchGameList from './switchGameList/SwitchGameList'
// import { StorageImage } from '@aws-amplify/ui-react-storage'

const client = generateClient<Schema>()

function App() {
  const [games, setGames] = useState<Array<Schema['Game']['type']>>([])

  useEffect(() => {
    const sub = client.models.Game.observeQuery().subscribe({
      next: ({ items }) => setGames([...items]),
      error: error => console.warn(error)
    })

    return () => sub.unsubscribe()
  }, [])

  async function createGame(newGame: SwitchGameTypeNew) {
    // ? not sure if this is needed -- probably a better way
    const data = {
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

    delete newGame.genre
    delete newGame.mood
    delete newGame.tags
    delete newGame.multiplayerType

    // const dataTest = {
    //   name: newGame.name,
    //   rating: newGame.rating
    // }

    await client.models.Game.create(data)
  }

  async function deleteGame(id: string) {
    await client.models.Game.delete({ id })
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

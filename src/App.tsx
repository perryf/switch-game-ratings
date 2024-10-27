import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../amplify/data/resource'
import CreateGameForm from './createGameForm/CreateGameForm'
import SwitchGameList from './switchGameList/SwitchGameList'
// import { StorageImage } from '@aws-amplify/ui-react-storage'

const client = generateClient<Schema>()

function App() {
  const [games, setGames] = useState<Array<Schema['Game']['type']>>([])
  const [newGameName, setNewGameName] = useState<string>('')

  useEffect(() => {
    const sub = client.models.Game.observeQuery().subscribe({
      next: ({ items }) => setGames([...items]),
      error: error => console.warn(error)
    })

    return () => sub.unsubscribe()
  }, [])

  async function createGame() {
    await client.models.Game.create({ name: newGameName })
    setNewGameName('')
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

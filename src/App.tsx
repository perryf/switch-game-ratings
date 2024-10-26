import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../amplify/data/resource'

const client = generateClient<Schema>()

function App() {
  const [games, setGames] = useState<Array<Schema['Game']['type']>>([])
  const [newGameName, setNewGameName] = useState<string>('')

  useEffect(() => {
    // TODO -> error handling
    const fetchGames = async () => {
      const { data } = await client.models.Game.list()
      setGames(data)
    }

    fetchGames()
  }, [])

  function createGame() {
    client.models.Game.create({ name: newGameName })
    setNewGameName('')
  }

  function deleteGames(id: string) {
    client.models.Game.delete({ id })
  }

  return (
    <main>
      <h1>Switch Games</h1>
      <input
        value={newGameName}
        onChange={e => setNewGameName(e.target.value)}
      />
      <button onClick={createGame}>+ create</button>
      <ul>
        {games.map(game => (
          <li className="game-box" key={game.id}>
            <p>{game.name}</p>
            <button onClick={() => deleteGames(game.id)}>X</button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App

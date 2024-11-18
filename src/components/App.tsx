import { useEffect, useState } from 'react'
// import { StorageImage } from '@aws-amplify/ui-react-storage'
import type { Schema } from '../../amplify/data/resource'
// import { ownedGamesReviewable } from '../switch-games-owned'
// import switchGameListFull from '../switch-games-list-full.json'
// @ts-ignore
// import { filteredList } from '../../switch-games-owned-details'
import { sortGames } from '../helpers'
import { SwitchGameBasic } from '../interfaces'
import CreateGameForm from './createGameForm/CreateGameForm'
import SwitchGameList from './switchGameList/SwitchGameList'

interface AppProps {
  client: any
}

function App(props: AppProps) {
  const { client } = props
  const [games, setGames] = useState<Array<Schema['Game']['type']>>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editInfo, setEditInfo] = useState<null | SwitchGameBasic>(null)

  useEffect(() => {
    const sub = client.models.Game.observeQuery().subscribe({
      next: ({ items = [] }) => {
        const data = items.sort(sortGames)

        // * data from local json
        // setGames([...filteredList])
        setGames([...data])
      },
      error: (error: {}) => console.warn(error)
    })
    return () => sub.unsubscribe()
  }, [client])

  async function createGame(newGame: SwitchGameBasic) {
    console.log(newGame)
    // ? not sure if this is needed -- probably a better way
    // turns comma separated strings into arrays, changes numbers that are technically strings into numbers

    // remove empty strings
  }

  const startEdit = (game: SwitchGameBasic | null) => {
    setIsEditing(!isEditing)
    setEditInfo(game)
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
      <CreateGameForm
        createGame={createGame}
        isEditing={isEditing}
        editInfo={editInfo}
        startEdit={startEdit}
      />
      <SwitchGameList
        deleteGame={deleteGame}
        games={games.map(g => ({ ...g, startEdit }))}
      />
    </main>
  )
}

export default App

import { useEffect, useState } from 'react'
// import { StorageImage } from '@aws-amplify/ui-react-storage'
import type { Schema } from '../../amplify/data/resource'
// import { ownedGamesReviewable } from '../switch-games-owned'
// import switchGameListFull from '../switch-games-list-full.json'
// @ts-ignore
// import { filteredList } from '../../switch-games-owned-details'
import { sortGames } from '../helpers'
import { SwitchGameBasicType, SwitchGameEditType } from '../interfaces'
import CreateGameForm from './createGameForm/CreateGameForm'
import SwitchGameList from './switchGameList/SwitchGameList'

interface AppProps {
  client: any
}

function App(props: AppProps) {
  const { client } = props
  const [games, setGames] = useState<Array<Schema['Game']['type']>>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editInfo, setEditInfo] = useState<null | SwitchGameEditType>(null)

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

  const startEdit = (game: SwitchGameEditType | null) => {
    setIsEditing(true)
    setEditInfo(game)
  }

  const stopEdit: () => void = () => {
    setIsEditing(false)
    setEditInfo(null)
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

  async function submitEditGame(newGame: SwitchGameBasicType) {
    console.log(newGame, 'EDIT')

    // * Random stuff to get around typescript && graphql
    const data = {
      ...newGame,
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
        editInfo={editInfo}
        isEditing={isEditing}
        stopEdit={stopEdit}
        submitCreateGame={submitCreateGame}
        submitEditGame={submitEditGame}
      />
      <SwitchGameList
        deleteGame={deleteGame}
        games={games.map(g => ({ ...g, startEdit }))}
      />
    </main>
  )
}

export default App

import { useState } from 'react'

interface CreateGameFormProps {
  createGame: (a: string) => void
}

function CreateGameForm(props: CreateGameFormProps) {
  const { createGame } = props
  const [newGameName, setNewGameName] = useState<string>('')

  return (
    <div>
      <input
        value={newGameName}
        onChange={e => setNewGameName(e.target.value)}
      />
      <button onClick={() => createGame(newGameName)}>+ create</button>
    </div>
  )
}

export default CreateGameForm

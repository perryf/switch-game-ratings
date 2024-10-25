import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'
// import { useAuthenticator } from '@aws-amplify/ui-react'
import type { Schema } from '../amplify/data/resource'

const client = generateClient<Schema>()

function App() {
  // const { signOut } = useAuthenticator()

  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([])

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: data => setTodos([...data.items])
    })
  }, [])

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt('Todo content'),
      isDone: false
    })
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map(todo => (
          <li className="todo-box" key={todo.id}>
            <p>{todo.content}</p>
            <button onClick={() => deleteTodo(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App

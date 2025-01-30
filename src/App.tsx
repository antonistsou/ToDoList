import { useEffect, useState } from 'react'
import "tailwindcss"
import './App.css'
import AddToDo from './components/AddToDo'
import { Container, HStack } from '@chakra-ui/react'
import TodoList from './components/TodoList'
import axios from 'axios'
import ImportanceFilter from './components/ImportanceFilter'
import SortButton from './components/SortButton'

interface toDo {
  id: number;
  description: string;
  createdAt: string;
  importance: string;
}

function App() {

  const [toDo, setToDo] = useState<toDo[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [selectedImportance, setImportance] = useState("");
  const [sortOrder, setOrder] = useState<"newest" | "oldest">("newest");
  const [issorted, setissorted] = useState(false);

  const fetchTodos = () => {
    axios.get('http://localhost:3000/get-todo')
      .then(res => setToDo(res.data))
      .catch(err => console.error('Error fetching todos:', err));
  };

  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  const addToDoBtn = () => {
    setRefresh(prev => prev + 1)
    fetchTodos();
  };


  const updateToDo = (id: number, newDescription: string) => {
    setToDo(toDo.map(todo => todo.id === id ? { ...todo, description: newDescription } : todo))
  }

  const filteredToDo =
    selectedImportance === ""
      ? toDo
      : toDo.filter((t) => t.importance === selectedImportance);

  const SortedToDo = sortOrder === 'oldest' ? filteredToDo : [...filteredToDo].reverse();

  return (
    <>
      <Container>
        <AddToDo
          onSubmit={addToDoBtn}>
        </AddToDo>
        <HStack p='5'>
          <SortButton sortOrder={sortOrder} onToggleSort={() => {
            setOrder(sortOrder === 'newest' ? 'oldest' : 'newest')
            setissorted(prev => !prev)
          }}></SortButton>
          <ImportanceFilter
            selectedFilter={selectedImportance}
            onSelectImportance={setImportance}
          ></ImportanceFilter>
        </HStack>
        <TodoList toDo={SortedToDo}
          isSorted={issorted}
          handleEdit={updateToDo}
          onDelete={(id) => {
            setToDo(toDo.filter((t) => t.id !== id));
            axios.delete(`http://localhost:3000/delete/${id}`)
              .catch((error) => console.error('Deleting error', error));
          }
          }>
        </TodoList>
      </Container >
    </>
  )
}

export default App
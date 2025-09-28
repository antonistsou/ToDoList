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
  completed: number;
}

function App() {

  const [toDo, setToDo] = useState<toDo[]>([]);

  const [refresh, setRefresh] = useState(0);
  const [selectedImportance, setImportance] = useState("");
  const [sortOrder, setOrder] = useState<"newest" | "oldest">("newest");

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

  //sort todo based in time for consisten results
  const completedToDO = toDo
    .filter((t) => t.completed === 1)
    .sort((a, b) => b.id - a.id); // assuming higher id = newer task


  const filteredToDo =
    selectedImportance === ""
      ? toDo
      : toDo.filter((t) => t.importance === selectedImportance);

  const SortedToDo = sortOrder === 'oldest' ? filteredToDo : [...filteredToDo].reverse();
  const activeToDo = SortedToDo.filter((t) => t.completed === 0);

  return (
    <>
      <Container>
        <AddToDo
          onSubmit={addToDoBtn}>
        </AddToDo>
        <HStack p='5'>
          <SortButton sortOrder={sortOrder} onToggleSort={() => {
            setOrder(sortOrder === 'newest' ? 'oldest' : 'newest')
          }}></SortButton>
          <ImportanceFilter
            selectedFilter={selectedImportance}
            onSelectImportance={setImportance}
          ></ImportanceFilter>
        </HStack>
        <TodoList
          activeToDo={activeToDo}
          completedToDo={completedToDO}
          handleEdit={updateToDo}
          onChecked={(id) => {
            axios.put(`http://localhost:3000/setCompleted/${id}`)
              .then(() => setRefresh(prev => prev + 1))
              .catch((error) => console.error('Deleting error', error)
              );

          }
          }
          onDelete={(id) => {
            setToDo(completedToDO.filter((t) => t.id !== id));
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
import { Button, Text, HStack, Input } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import axios from 'axios'


interface Props {
    onSubmit: () => void;
}


const AddToDo = ({ onSubmit }: Props) => {
    const [text, setText] = useState("");
    const [imp, setImportance] = useState("High");
    const importance = ["HIGH", "MED", "LOW"];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (text.trim() !== "") {
            const todo = { description: text, createdAt: new Date().toISOString().slice(0, 10), importance: imp }
            axios.post('http://localhost:3000/add-todo', { todo })
            onSubmit();
            setText('');
        }
        else {
            alert('PLease Enter Description');
        }
    }

    return (
        <>
            <div>
                <Text textStyle="3xl" mb='5' >To Do</Text>
                <HStack>
                    <Input
                        placeholder='Add your to-do here ...'
                        maxLength={45}
                        type="text"
                        id="text"
                        aria-describedby="text-helper-text"
                        value={text}
                        onChange={(event) =>
                            setText(event.target.value)
                        }
                    />
                    <select name="importance" id="importance" onChange={(event) =>
                        setImportance(event.target.value)
                    }>
                        {importance.map(imp => {
                            return <option key={imp} value={imp} style={{ backgroundColor: 'black', color: 'white' }}>
                                {imp}
                            </option>
                        }
                        )}
                    </select>


                    <Button variant="surface" className='' type='submit' onClick={handleSubmit}>
                        Add
                    </Button>
                </HStack >
            </div >

        </>
    )
}


export default AddToDo
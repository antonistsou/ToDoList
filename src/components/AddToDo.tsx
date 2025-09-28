import { Text, HStack, Input } from '@chakra-ui/react'
import { FormEvent, useRef, useState } from 'react'
import axios from 'axios'


interface Props {
    onSubmit: () => void;
}


const AddToDo = ({ onSubmit }: Props) => {
    const [text, setText] = useState("");
    const importance = ["HIGH", "MED", "LOW"];

    const impo = useRef<HTMLSelectElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (text.trim() !== "") {
            const todo = { description: text, createdAt: new Date().toISOString().slice(0, 10), importance: impo.current?.value || "HIGH" }
            axios.post('https://to-do-list-two-liard-82.vercel.app/add-todo', { todo })
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
                <form onSubmit={handleSubmit}>
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
                        <select name="importance" id="importance"
                            //  onChange={(event) =>
                            //     setImportance(event.target.value)
                            // }
                            ref={impo}
                        >
                            {importance.map(imp => {
                                return <option key={imp} value={imp} style={{ backgroundColor: 'black', color: 'white' }}>
                                    {imp}
                                </option>
                            }
                            )}
                        </select>


                        <button>
                            {/* //  type='submit' */}
                            {/* //  onClick={handleSubmit}> */}
                            Add
                        </button>
                    </HStack >
                </form>
            </div >

        </>
    )
}


export default AddToDo


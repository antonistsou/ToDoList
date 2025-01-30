import { Button, Center, Input, Table } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

interface toDo {
    id: number;
    description: string;
    createdAt: string;
    importance: string;
}

interface Props {
    toDo: toDo[];
    isSorted: boolean;
    handleEdit: (id: number, description: string) => void;
    onDelete: (id: number) => void;
}

const TodoList = ({ toDo, isSorted, handleEdit, onDelete }: Props) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newDescription, setNewDescription] = useState('');

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDescription(e.target.value);
    };

    const saveNewDescription = (id: number) => {
        axios.put(`http://localhost:3000/update-todo/${id}`, { description: newDescription })
            .then(res => {
                handleEdit(id, newDescription);  // Immediately update the description in the UI
                setEditingId(null);  // Exit edit mode
            })
            .catch(error => console.error('Error saving description:', error));
    };

    const indexCount = () => {
        let sortedToDos = [...toDo.map((_, index) => index + 1)];
        if (isSorted) sortedToDos.reverse();

        return sortedToDos;
    }

    return (
        <Table.Root size="sm">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader textAlign={'start'}></Table.ColumnHeader>
                    <Table.ColumnHeader>Task number</Table.ColumnHeader>
                    <Table.ColumnHeader>Description</Table.ColumnHeader>
                    <Table.ColumnHeader>Created At</Table.ColumnHeader>
                    <Table.ColumnHeader>Importance</Table.ColumnHeader>
                    <Table.ColumnHeader> </Table.ColumnHeader>
                    <Table.ColumnHeader textAlign={'end'}>
                    </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {toDo.map((t, index) => (
                    <Table.Row key={t.id}>
                        <Table.Cell></Table.Cell>
                        <Table.Cell>{indexCount()[index]} .</Table.Cell>
                        <Table.Cell minWidth={'205px'} maxWidth={'205px'}>
                            {editingId === t.id ? (
                                <Input
                                    maxLength={45}
                                    type="text"
                                    value={newDescription}
                                    onChange={handleDescriptionChange}
                                    onBlur={() => saveNewDescription(t.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            saveNewDescription(t.id);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                t.description
                            )}
                        </Table.Cell>
                        <Table.Cell>{t.createdAt}</Table.Cell>
                        <Table.Cell>{t.importance}</Table.Cell>
                        <Table.Cell>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setEditingId(t.id);
                                    setNewDescription(t.description);
                                }}
                            >
                                Edit
                            </Button>
                        </Table.Cell>
                        <Table.Cell textAlign={'end'}>
                            <Button onClick={() => onDelete(t.id)}>Checked</Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
};

export default TodoList;

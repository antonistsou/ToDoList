import { Box, Button, Input, Table, Text } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

interface toDo {
    id: number;
    description: string;
    createdAt: string;
    importance: string;
    completed: number;
}

interface Props {
    activeToDo: toDo[];
    completedToDo: toDo[];
    handleEdit: (id: number, description: string) => void;
    onDelete: (id: number) => void;
}

const TodoList = ({ activeToDo, completedToDo, handleEdit, onDelete }: Props) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newDescription, setNewDescription] = useState('');

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDescription(e.target.value);
    };

    const saveNewDescription = (id: number) => {
        axios
            .put(`https://to-do-list-lo33p9xup-antonistsous-projects.vercel.app/${id}`, { description: newDescription })
            .then(() => {
                handleEdit(id, newDescription);
                setEditingId(null);
            })
            .catch((error) => console.error('Error saving description:', error));
    };

    const getIndex = (list: toDo[]) => list.map((_, index) => index + 1);

    return (
        <>
            <Text pt="10" pb="5" fontSize="xl" fontWeight="bold">
                Active Tasks
            </Text>
            {activeToDo.length < 1 ? "Start with adding tasks to be productive and efficient" :
                <Table.Root size="sm">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader></Table.ColumnHeader>
                            <Table.ColumnHeader>Task number</Table.ColumnHeader>
                            <Table.ColumnHeader>Description</Table.ColumnHeader>
                            <Table.ColumnHeader>Created At</Table.ColumnHeader>
                            <Table.ColumnHeader>Importance</Table.ColumnHeader>
                            <Table.ColumnHeader> </Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {activeToDo.map((t, index) => (
                            <Table.Row
                                key={t.id}
                                _hover={{ bg: 'rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'background 0.2s ease' }}
                            >
                                <Table.Cell></Table.Cell>
                                <Table.Cell>{getIndex(activeToDo)[index]}.</Table.Cell>
                                <Table.Cell minWidth="205px" maxWidth="205px">
                                    {editingId === t.id ? (
                                        <Input
                                            maxLength={45}
                                            type="text"
                                            value={newDescription}
                                            onChange={handleDescriptionChange}
                                            onBlur={() => saveNewDescription(t.id)}
                                            onKeyDown={(e) => e.key === 'Enter' && saveNewDescription(t.id)}
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
                                <Table.Cell textAlign="end">
                                    <Button onClick={() => onDelete(t.id)}>Checked</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            }
            {completedToDo.length > 0 && (
                <>
                    <Text pt="10" pb="5" fontSize="xl" fontWeight="bold">
                        Completed Tasks
                    </Text>
                    <Table.Root size="sm" variant={"outline"}>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader></Table.ColumnHeader>
                                <Table.ColumnHeader>Task number</Table.ColumnHeader>
                                <Table.ColumnHeader>Description</Table.ColumnHeader>
                                <Table.ColumnHeader>Created At</Table.ColumnHeader>
                                <Table.ColumnHeader>Importance</Table.ColumnHeader>
                                <Table.ColumnHeader></Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {completedToDo.map((t, index) => (
                                <Table.Row key={t.id} position="relative">
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell>{getIndex(completedToDo)[index]}</Table.Cell>
                                    <Table.Cell>{t.description}</Table.Cell>
                                    <Table.Cell>{t.createdAt}</Table.Cell>
                                    <Table.Cell>{t.importance}</Table.Cell>
                                    <Table.Cell>Completed</Table.Cell>

                                    {/* Line through completed row */}
                                    {t.completed === 1 && (
                                        <Box
                                            position="absolute"
                                            top="50%"
                                            left={0}
                                            width="100%"
                                            borderTop="1px solid gray"
                                            zIndex={1}
                                            opacity={0.5}
                                            pointerEvents="none"
                                        />
                                    )}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </>
            )}
        </>
    );
};

export default TodoList;

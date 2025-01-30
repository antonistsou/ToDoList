import { Button } from '@chakra-ui/react'
import React from 'react'

interface Props {
    sortOrder: 'newest' | 'oldest';
    onToggleSort: () => void;
}

const SortButton = ({ sortOrder, onToggleSort }: Props) => {
    return (
        <Button variant="plain"
            onClick={onToggleSort}
        >
            {sortOrder === 'newest' ? 'Sort By Newest ▲' : 'Sort By Oldest ▼'}
        </Button>
    )
}

export default SortButton
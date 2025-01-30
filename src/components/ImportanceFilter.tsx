interface Props {
    selectedFilter: string;
    onSelectImportance: (importance: string) => void;
}

const ImportanceFilter = ({ selectedFilter, onSelectImportance }: Props) => {
    return (
        <div>
            <select
                name="Filter by Importance"
                id="importance"
                value={selectedFilter}
                onChange={(event) => onSelectImportance(event.target.value)}
            >
                <option value="" style={{ backgroundColor: 'black', color: 'white' }} >Filter By Importance</option>
                <option value="HIGH" style={{ backgroundColor: 'black', color: 'white' }} >High</option>
                <option value="MED" style={{ backgroundColor: 'black', color: 'white' }} >Med</option>
                <option value="LOW" style={{ backgroundColor: 'black', color: 'white' }}>Low</option>
            </select>
        </div>
    )
}

export default ImportanceFilter
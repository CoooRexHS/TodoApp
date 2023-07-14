import { useState, useRef, KeyboardEvent } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTodosContext } from '../../Context/TodoContex';
import './style.css';
import { Checkbox, IconButton, TextField } from '@mui/material';

interface TodoItemProps {
  itemProp: {
    id: string;
    title: string;
    completed: boolean;
  };
}

const TodoItem = ({ itemProp }: TodoItemProps): JSX.Element => {
  const [editing, setEditing] = useState<boolean>(false);

  const { handleChange, delTodo, setUpdate } = useTodosContext();

  const editInputRef = useRef<HTMLInputElement>(null);

  const completedStyle: React.CSSProperties = {
    fontStyle: 'italic',
    color: '#595959',
    opacity: 0.4,
    textDecoration: 'line-through',
  };

  const handleEditing = (): void => {
    setEditing(true);
  };

  const viewMode: React.CSSProperties = {};
  const editMode: React.CSSProperties = {};
  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  const handleUpdatedDone = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      setUpdate(editInputRef.current!.value, itemProp.id);
      setEditing(false);
    }
  };

  return (
    <li className="todoItem">
      <div className="todoItemInside" style={viewMode}>
        <Checkbox
          checked={itemProp.completed}
          onChange={() => handleChange(itemProp.id)}
        />
        <span style={itemProp.completed ? completedStyle : undefined}>
          {itemProp.title}
        </span>
        <div className="todoItemButtons">
          <IconButton aria-label="edit" onClick={handleEditing}>
            <EditIcon style={{ color: '#5e5e5e', fontSize: '25px' }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => delTodo(itemProp.id)}>
            <DeleteIcon style={{ color: '#5e5e5e', fontSize: '25px' }} />
          </IconButton>
        </div>
      </div>
      <TextField
        type="text"
        id="outlined-basic"
        label="Edit Todo..."
        variant="outlined"
        inputRef={editInputRef}
        defaultValue={itemProp.title}
        className="todoItemEdit"
        style={editMode}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
};

export default TodoItem;

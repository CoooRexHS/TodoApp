import { useState, ChangeEvent, KeyboardEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useTodosContext } from '../../Context/TodoContex';
import './style.css';
import { Alert, IconButton, TextField } from '@mui/material';

const InputTodo = (): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<JSX.Element | null>(null);

  const { addTodoItem } = useTodosContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleSubmit = (): void => {
    if (title.trim()) {
      addTodoItem(title);
      setTitle('');
      setMessage(null);
    } else {
      setMessage(<Alert severity="error">Please, add some text!!!</Alert>);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <form className="formContainer">
        <TextField
          type="text"
          className="formInput"
          id="outlined-basic"
          label="Add Todo..."
          variant="outlined"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <IconButton aria-label="Send" onClick={handleSubmit}>
          <SendIcon />
        </IconButton>
      </form>
      {message && <div className="popup">{message}</div>}
    </>
  );
};

export default InputTodo;

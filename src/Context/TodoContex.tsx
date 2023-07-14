import { useState, useEffect, createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodosContextType {
  todos: Todo[];
  handleChange: (id: string) => void;
  delTodo: (id: string) => void;
  addTodoItem: (title: string) => void;
  setUpdate: (updatedTitle: string, id: string) => void;
}

const TodosContext = createContext<TodosContextType>({
  todos: [],
  handleChange: (id: string) => {},
  delTodo: (id: string) => {},
  addTodoItem: (title: string) => {},
  setUpdate: (updatedTitle: string, id: string) => {},
});

interface TodosProviderProps {
  children: React.ReactNode;
}

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos());

  function getInitialTodos(): Todo[] {
    try {
      const temp = localStorage.getItem('todos');
      return temp ? JSON.parse(temp) : [];
    } catch (error) {
      console.error('Error parsing todos from localStorage:', error);
      return [] as Todo[];
    }
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleChange = (id: string): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const delTodo = (id: string): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const addTodoItem = (title: string): void => {
    const newTodo: Todo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const setUpdate = (updatedTitle: string, id: string): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: updatedTitle } : todo
      )
    );
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        handleChange,
        delTodo,
        addTodoItem,
        setUpdate,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = (): TodosContextType => useContext(TodosContext);

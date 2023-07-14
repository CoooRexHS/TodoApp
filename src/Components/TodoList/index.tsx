import TodoItem from '../TodoItem';
import { useTodosContext } from '../../Context/TodoContex';
import './style.css';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const TodosList = (): JSX.Element => {
  const { todos }: { todos: Todo[] } = useTodosContext();
  return (
    <ul className="todoList">
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} itemProp={todo} />
      ))}
    </ul>
  );
};
export default TodosList;

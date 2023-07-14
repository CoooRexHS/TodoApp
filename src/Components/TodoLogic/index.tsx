import InputTodo from '../Input';
import TodosList from '../TodoList';

import { TodosProvider } from '../../Context/TodoContex';
import './style.css';

const TodosLogic = () => {
  return (
    <TodosProvider>
      <div className="todoLogic">
        <InputTodo />
        <TodosList />
      </div>
    </TodosProvider>
  );
};
export default TodosLogic;

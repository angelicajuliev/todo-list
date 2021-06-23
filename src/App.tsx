import './App.css';
import { TodoList } from './components/todo-list/TodoList'
import { Palette } from './components/palette/Palette'
import { Button } from './components/button/Button';
import { Input } from './components/input/Input';

function App() {
  return (
    <Palette>
      <TodoList />
      <Button text="Add TODO item" />
      <Input label="What you should do?" />
    </Palette>
  );
}

export default App;

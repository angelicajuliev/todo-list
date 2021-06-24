import { Palette } from "./components/atoms/palette/Palette";
import { Home } from "./components/templates/home/Home";
import { ToDoContext, ToDoReducer } from "./context/TodoContext";
import { TodoProvider } from "./context/TodoProvider";

function App() {
  return (
    <TodoProvider Context={ToDoContext} reducer={ToDoReducer}>
      <Palette>
        <Home />
      </Palette>
    </TodoProvider>
  );
}

export default App;

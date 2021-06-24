import { Palette } from "./components/atoms/palette/Palette";
import { ToDoContext, ToDoReducer } from "./context/TodoContext";
import { TodoProvider } from "./context/TodoProvider";
import { Home } from "./pages/Home";

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

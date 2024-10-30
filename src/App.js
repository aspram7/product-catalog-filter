import Filter from "./container/Filter";
import DataGrid from "./container/DataGrid";
import { FiltersContextProvider } from "./context/filters";

import "./App.css";

function App() {
  return (
    <div className="app">
      <FiltersContextProvider>
        <Filter />
        <DataGrid />
      </FiltersContextProvider>
    </div>
  );
}

export default App;

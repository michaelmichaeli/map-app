import './App.scss';
import { getData } from './api'
import SpatialList from './components/SpatialList';

function App() {
  return (
    <div className="App">
      
      <SpatialList data={getData()} />
      
    </div>
  );
}

export default App;

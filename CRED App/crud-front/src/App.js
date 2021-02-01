import "./App.css";
import { Addorupdate } from "./components/addOrUpdate";
import { Liststudents } from "./components/ListStudents";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
} from "react-router-dom";

function App() {
  const UpdateWithId = () => {
    let { id } = useParams();
      return <Addorupdate id={id}></Addorupdate>
  };

  return (
    <Router>
      <div className="App">
        <h1>React CRUD App</h1>
        <hr />
        <hr />
        <Switch>
          <Route path="/list">
            <Liststudents />
          </Route>
          <Route path="/add">
            <Addorupdate />
          </Route>
          <Route path="/update/:id">
            <UpdateWithId />
          </Route>
          <Route path="*" exact>
            <Redirect to='/list'></Redirect>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

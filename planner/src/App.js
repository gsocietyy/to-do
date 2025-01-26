import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Newtask from "./components/Newtask";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/Createtask">
            <Newtask />
          </Route>

        </Switch>
      </div>
      <ToastContainer />
    </div>
    </Router>
  );
}

export default App;

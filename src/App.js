import { Route, Switch } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <ToastContainer />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
    <div className="d-flex">
      <Register />
      <Login />
    </div>
  );
}

export default App;

import { Link } from "react-router-dom";

const App = () => (
  <div>
    this is app <br />{" "}
    <Link to={"/login"} className=" underline ">
      login here
    </Link>{" "}
    <br />{" "}
    <Link to={"register"} className=" underline">
      register here
    </Link>
  </div>
);

export default App;

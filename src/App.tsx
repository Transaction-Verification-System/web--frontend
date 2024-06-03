import NavBar from "@/components/molecules/navigation/NavBar";
import { Button } from "antd";
import { Link } from "react-router-dom";

const App = () => (
  <div className=" p-5 flex flex-col gap-16">
    <NavBar />
    <LandingActionSection />
  </div>
);

const LandingActionSection = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-center">
        Web-service to verify and validate online transactions in real
        time.
      </div>

      <div className=" h-1/2 p-10 flex gap-5 ">
        <Link to={"/register"}>
          <Button type={"primary"}>Register</Button>
        </Link>

        <Link to={"/login"}>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default App;

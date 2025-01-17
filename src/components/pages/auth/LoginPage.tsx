import LoginForm from "@/components/organisms/auth/LoginForm";
import AuthTemplate from "@/components/templates/auth/AuthTemplate";
import { Link } from "react-router-dom";


/**
 *-----------------------------------------------------------------------------
 * @returns LoginPage component
 *
 * @description
 * displays the login page
 * with the login form
 *-----------------------------------------------------------------------------
 */
export default function LoginPage() {
  return (
    <AuthTemplate>
      <p className=" text-2xl font-semibold">Login</p>
      <LoginForm />
      <div className="text-lg text-center text-blue-700">
        <span className="text-slate-700">Don't have an account? </span>
        <Link to={"/register"} className="underline">
          Register
        </Link>
      </div>
    </AuthTemplate>
  );
}

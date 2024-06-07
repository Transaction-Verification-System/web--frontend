import RegisterForm from "@/components/organisms/auth/RegisterForm";
import AuthTemplate from "@/components/templates/auth/AuthTemplate";
import { Link } from "react-router-dom";


/**
 *-----------------------------------------------------------------------------
 * @returns RegisterPage component
 *
 * @description
 * displays the register page
 * with the register form
 *-----------------------------------------------------------------------------
 */
export default function RegisterPage() {
  return (
    <AuthTemplate>
      <p className=" text-2xl font-semibold">Register</p>
      <RegisterForm />
      <div className="text-lg text-center text-blue-700">
        <span className="text-slate-700">Already have an account? </span>
        <Link to={"/login"} className="underline">
          Login
        </Link>
      </div>
    </AuthTemplate>
  );
}

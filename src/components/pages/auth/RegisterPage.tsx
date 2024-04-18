import RegisterForm from "@/components/organisms/auth/RegisterForm";
import AuthTemplate from "@/components/templates/auth/AuthTemplate";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <AuthTemplate>
      <div className="text-center text-4xl text-gray-900 font-semibold mt-10">
        Welcome 👋
      </div>
      <div className="mt-7 text-xl text-slate-700 leading-8">
        Today is a new day. It's your day. You shape it.
      </div>
      <RegisterForm />
      <div className="mt-12 text-lg text-center text-blue-700">
        <span className="text-slate-700">Already have an account? </span>
        <Link to={"/login"} className="underline">
          Login
        </Link>
      </div>
    </AuthTemplate>
  );
}

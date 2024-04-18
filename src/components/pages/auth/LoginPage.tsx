import LoginForm from "@/components/organisms/auth/LoginForm";
import AuthTemplate from "@/components/templates/auth/AuthTemplate";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <AuthTemplate>
      <p>login</p>
      <LoginForm />
      <div className="mt-12 text-lg text-center text-blue-700">
        <span className="text-slate-700">Don't have an account? </span>
        <Link to={"/register"} className="underline">
          Register
        </Link>
      </div>
    </AuthTemplate>
  );
}

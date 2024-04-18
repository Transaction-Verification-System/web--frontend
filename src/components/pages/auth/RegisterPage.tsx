import RegisterForm from "@/components/organisms/auth/RegisterForm";
import AuthTemplate from "@/components/templates/auth/AuthTemplate";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <AuthTemplate>
      <p>register</p>
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

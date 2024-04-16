import LoginForm from "@/components/organisms/auth/LoginForm";
import AuthTemplate from "@/components/templates/auth/AuthTemplate";

export default function LoginPage() {
  return (
    <AuthTemplate>
        <LoginForm/>
    </AuthTemplate>
  );
}
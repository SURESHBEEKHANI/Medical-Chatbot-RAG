import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/chat");
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your health journey"
    >
      <LoginForm onSuccess={handleSuccess} />
    </AuthLayout>
  );
}

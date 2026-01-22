import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export default function Signup() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/chat");
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join MediChat for personalized health guidance"
    >
      <SignupForm onSuccess={handleSuccess} />
    </AuthLayout>
  );
}

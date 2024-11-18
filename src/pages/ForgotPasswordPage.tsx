import logo from "../assets/logo-1.png";
import ResetPasswordForm from "../components/ResetPasswordForm";

function ResetPasswordPage() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-2/3">
        <ResetPasswordForm />
      </div>
      <div className="hidden shadow-sm relative lg:flex h-full w-1/3 items-center justify-center bg-white">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
